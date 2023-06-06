(function($) {
    $.fn.getAttributes = function() {
        var attributes = {};
        if (this.length) {
            $.each(this[0].attributes, function(index, attr) {
                attributes[attr.name] = attr.value;
            });
        }
        return attributes;
    };
})(jQuery);


var VideoPrecache = function() {

    var _self = this;

    var video = null;
    var vPages = []

    var cNo = 0;
    var tNo = 1


    this.init = function(list) {

        vPages = getAllPages(list) || [];

        if (vPages.length > 0) {
            log("VideoPrecache: INIT")
            cNo = 0;
            tNo = vPages.length;
            addEvents();
            loadVideo();
        }
    }

    var checkAndLoadNextVideo = function() {
        if (cNo < tNo) {
            cNo++;
            loadVideo();
        }
    }
    var loadVideo = function() {

       // console.clear();

        if (cNo >= tNo) return;

        try {
            var _vPage = vPages[cNo]
            var _scripts = String(_vPage["scripts"]).split("/")
            if (_scripts[2] == "videopage.js") {
                var _path = String(_vPage["path"]).split(".")[0]
                var _url = model.videoPath + _path + ".mp4";
                update(_url)
            } else {
                checkAndLoadNextVideo();
            }

        } catch (err) {
            error(err)
        }
    }

    var log = function() {
       // console.log(...arguments)
    }

    var error = function() {
        //console.error(...arguments)
    }

    var update = function(url) {

       // log('update:    ', url)

        $.get(url)
            .done(function() {
                // exists code 
                try {
                    video.attr("src", url);
                    video.load();
                    video.volume = 0.0;
                } catch (err) {
                    error(err)
                }
                //console.clear();
            }).fail(function() {
                // not exists code
                checkAndLoadNextVideo();
            })
    }

    var addEvents = function() {
        //log('addEvent')
        video = $("#preVideo");
        try {
            video.on('canplaythrough', function() {
              //  console.log("Loaded......");
                checkAndLoadNextVideo();
            });
        } catch (err) {
            error(err)
        }

    }


    var getAllPages = function(menuData) {

        try {

            var _all_data = menuData['all']
            var __pages = $(_all_data[0]).find("page")
            var _pages = []

            $.each(__pages, function(i, _page) {
                    var _attrs = $(_page).getAttributes()
                    var __page = {
                        'id': i,
                        'page': _page,
                    }
                    var ___page = Object.assign(__page, _attrs);
                    _pages.push(___page);
                })
                // console.log(_pages)
            return _pages;

        } catch (err) {
            console.error(err)
        }

    }


    return this;
}