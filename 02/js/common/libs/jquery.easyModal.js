/**
 * easyModal.js v1.3.0
 * A minimal jQuery modal that works with your CSS.
 * Author: Flavius Matis - http://flaviusmatis.github.com/
 * URL: https://github.com/flaviusmatis/easyModal.js
 */

/*jslint browser: true*/
/*global jQuery*/

( function($) {"use strict";
		var methods = {
			init : function(options) {

				var defaults = {
					top : 'auto',
					autoOpen : false,
					overlayOpacity : 0.5,
					overlayColor : '#000',
					overlayClose : true,
					overlayParent : 'body',
					closeOnEscape : true,
					closeButtonClass : '.close',
					onOpen : false,
					onClose : false,
					zIndexAuto : true,
					zIndex : function() {
						return 1 + Math.max.apply(Math, $.makeArray($('*').map(function() {
							return $(this).css('z-index');
						}).filter(function() {
							return $.isNumeric(this);
						}).map(function() {
							return parseInt(this, 10);
						})));
					},
					updateZIndexOnOpen : true
				};

				options = $.extend(defaults, options);

				return this.each(function() {

					var o = options, $overlay = $('<div class="lean-overlay"></div>'), $modal = $(this);

					$overlay.css({
						'display' : 'none',
						'position' : 'fixed',
						// When updateZIndexOnOpen is set to true, we avoid computing the z-index on initialization,
						// because the value would be replaced when opening the modal.
						///'z-index' : (o.updateZIndexOnOpen ? 0 : o.zIndex()),
						'z-index' : 1000,
						'top' : 0,
						'left' : 0,
						'height' : '100%',
						'width' : '100%',
						'background' : o.overlayColor,
						'opacity' : o.overlayOpacity,
						'overflow' : 'auto'
					}).appendTo(o.overlayParent);

					$modal.css({
						'display' : 'none',
						'position' : 'fixed',
						// When updateZIndexOnOpen is set to true, we avoid computing the z-index on initialization,
						// because the value would be replaced when opening the modal.
						'z-index' : (o.updateZIndexOnOpen ? 0 : o.zIndex() + 1),
						'left' : 50 + '%',
						'top' : parseInt(o.top, 10) > -1 ? o.top + 'px' : 50 + '%'
					});

					$modal.bind('openModal', function() {
						var overlayZ = o.updateZIndexOnOpen ? o.zIndex() : parseInt($overlay.css('z-index'), 10), modalZ = overlayZ + 1;

						if (!o.zIndexAuto) {
							overlayZ = $overlay.css('z-index');
						}
						// console.log(o.zIndexAuto + ' : ' + overlayZ);

						$modal.css({
							'display' : 'block',
							'margin-left' : -($modal.outerWidth() / 2) + 'px',
							'margin-top' : (parseInt(o.top, 10) > -1 ? 0 : -($modal.outerHeight() / 2)) + 'px',
							'z-index' : modalZ
						});

						$overlay.css({
							'z-index' : overlayZ,
							'display' : 'block'
						});

						if (o.onOpen && typeof (o.onOpen) === 'function') {
							// onOpen callback receives as argument the modal window
							o.onOpen($modal[0]);
						}
					});

					$modal.bind('closeModal', function() {
						$modal.css('display', 'none');
						$overlay.css('display', 'none');
						if (o.onClose && typeof (o.onClose) === 'function') {
							// onClose callback receives as argument the modal window
							o.onClose($modal[0]);
						}
					});

					// Close on overlay click
					$overlay.click(function() {
						if (o.overlayClose) {
							$modal.trigger('closeModal');
						}
					});

					$(document).keydown(function(e) {
						// ESCAPE key pressed
						if (o.closeOnEscape && e.keyCode === 27) {
							$modal.trigger('closeModal');
						}
					});

					// Close when button pressed
					$modal.on('click', o.closeButtonClass, function(e) {
						$modal.trigger('closeModal');
						e.preventDefault();
					});

					// Automatically open modal if option set
					if (o.autoOpen)
						$modal.trigger('openModal');

				});

			}
		};

		$.fn.easyModal = function(method) {

			// Method calling logic
			if (methods[method]) {
				return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
			}

			if ( typeof method === 'object' || !method) {
				return methods.init.apply(this, arguments);
			}

			$.error('Method ' + method + ' does not exist on jQuery.easyModal');

		};

	}(jQuery));
