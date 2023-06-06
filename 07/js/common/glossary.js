/**
 * @author Shigil.Gangadharan
 */
var model1;
model1 = new Model();
var firstActive = true;
var Glossary = {
    data: xmlParser.getXml(model1.dataPath + "glossary.xml"),
    deviceType: "",

    myConfig: {
        useCaching: true,
        language: "en"
    },

    createGlossary: function() {
        $("#closeglossPopup").css("cursor", "pointer")
        var android = navigator.userAgent.match(/Android/i) ? true : false;
        //var iPhone = navigator.userAgent.match(/iPhone|iPad|iPod/i) ? true : false;
        var iPhone = navigator.userAgent.match(/iPhone/i) ? true : false;
        Glossary.deviceType = iPhone || android ? "mobile" : "noMobile";
        var numAlphabets = Glossary.data.getElementsByTagName("alphabet").length;
        for (var i = 0; i < numAlphabets; i++) {
            var currAlp = Glossary.data.getElementsByTagName("alphabet")[i].getAttribute("letter");

            if (Glossary.data.getElementsByTagName("alphabet")[i].getElementsByTagName("word").length == 0) {
                $("#shell_GlossaryAlphabets").append("<div class='shell_g_letter_disable' id  ='" + "shell_alph_" + i + "'>" + currAlp + "</div>");
            } else {
                $("#shell_GlossaryAlphabets").append("<div class='shell_g_letter' id  ='" + "shell_alph_" + i + "'>" + currAlp + "</div>");
            }

        }

        $('#shell_GlossaryAlphabets').off('click').on('click', '.shell_g_letter', Glossary.generateWords);

        $('#shell_alph_0').trigger("click", Glossary.generateWords)
        $('#shell_alph_0').addClass("shell_g_letterSelected");


    },

    generateWords: function() {
        $("#shell_GlossaryWords").mCustomScrollbar("destroy")
        var currNode = parseInt(this.id.split("shell_alph_")[1]);
        var numWords = Glossary.data.getElementsByTagName("alphabet")[currNode].getElementsByTagName("word").length;
        $('#shell_GlossaryWords').html('');
        $('#shell_GlossaryDescription').html("");
        if (Glossary.deviceType != "mobile") {
            $('#shell_g_popup_content').scrollTop(0)
        }
        for (var i = 0; i < numWords; i++) {
            var currWord = Glossary.data.getElementsByTagName("alphabet")[currNode].getElementsByTagName("word")[i].childNodes[0].nodeValue;
            $("#shell_GlossaryWords").append("<div class='shell_g_name' id  ='" + "shell_word_" + currNode + "_" + i + "'>" + currWord + "</div>");
            $("#shell_GlossaryAlphabets div").removeClass("shell_g_letterSelected");
            if (Glossary.deviceType == "mobile") {
                var description = Glossary.data.getElementsByTagName("alphabet")[currNode].getElementsByTagName("description")[0].childNodes[0].nodeValue;
                $("#shell_GlossaryWords").append("<div class='shell_d_name'>" + description + "</div>");
            }
        }
        $(this).addClass("shell_g_letterSelected");
        $(".shell_g_name").removeClass("shell_g_wordSelected");
        $("#shell_GlossaryWords").mCustomScrollbar();
        if (Glossary.deviceType == "mobile") {
            $("#shell_GlossaryWords").accordion({ heightStyle: "content" });
            return;
        }
        $("#shell_word_" + currNode + "_0").addClass("shell_g_wordSelected");
        $("#shell_GlossaryWords").mCustomScrollbar("scrollTo", ".shell_g_wordSelected")
        $('#shell_GlossaryWords').off('click').on('click', '.shell_g_name', Glossary.generateDescription);
        var description = Glossary.data.getElementsByTagName("alphabet")[currNode].getElementsByTagName("description")[0].childNodes[0].nodeValue;
        var currentWord = Glossary.data.getElementsByTagName("alphabet")[currNode].getElementsByTagName("word")[0].childNodes[0].nodeValue;
        $('#shell_GlossaryDescription').html("<b>" + currentWord + "</b>" + "<br/>" + description);
    },

    generateDescription: function() {
        var currAlpNode = parseInt(this.id.split("_")[2]);
        var currWordNode = parseInt(this.id.split("_")[3]);
        var description = Glossary.data.getElementsByTagName("alphabet")[currAlpNode].getElementsByTagName("description")[currWordNode].childNodes[0].nodeValue;
        var currentWord = Glossary.data.getElementsByTagName("alphabet")[currAlpNode].getElementsByTagName("word")[currWordNode].childNodes[0].nodeValue;
        $('#shell_GlossaryDescription').html("<b>" + currentWord + "</b>" + "<br/>" + description);
        $("#shell_GlossaryWords div").removeClass("shell_g_wordSelected");
        $(this).addClass("shell_g_wordSelected");
        $("#shell_GlossaryWords").mCustomScrollbar("scrollTo", ".shell_g_wordSelected")
    }
};

$(function() {
    Glossary.createGlossary();
});