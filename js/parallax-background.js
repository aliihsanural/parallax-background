/**
 * Parallax Background
 * version 1.0
 * by Eren Süleymanoğlu
 */
(function ($) {
	
	'use strict';
	
	/**
	 * Polyfill for requestAnimationFrame
	 * via https://gist.github.com/paulirish/1579671
	 */
	(function () {
		var lastTime = 0;
		var vendors  = ['ms', 'moz', 'webkit', 'o'];
		
		for (var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
			window.requestAnimationFrame = window[vendors[x] + 'RequestAnimationFrame'];
			window.cancelAnimationFrame  = window[vendors[x] + 'CancelAnimationFrame'] || window[vendors[x] + 'CancelRequestAnimationFrame'];
		}
		
		if (!window.requestAnimationFrame) {
			window.requestAnimationFrame = function (callback) {
				var currTime   = new Date().getTime();
				var timeToCall = Math.max(0, 16 - (currTime - lastTime));
				var id         = window.setTimeout(function () {
					callback(currTime + timeToCall);
				}, timeToCall);
				lastTime       = currTime + timeToCall;
				return id;
			};
		}
		
		if (!window.cancelAnimationFrame) {
			window.cancelAnimationFrame = function (id) {
				clearTimeout(id);
			};
		}
	}());
	
	function isMobile() {
		if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(navigator.userAgent)
			|| /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(navigator.userAgent.substr(0, 4))) {
			return true;
		} else {
			return false;
		}
	}
	
	$.fn.parallaxBackground = function (options) {
		
		return this.each(function () {
			
			var a = $(this);
			var b = $(window);
			var c, d, e, f, g, w, h, p, s, t;
			var x = 0, y = 0, z = 0;
			
			var defaults = {
				parallaxBgImage    : '',
				parallaxBgPosition : 'center center',
				parallaxBgRepeat   : 'no-repeat',
				parallaxBgSize     : 'cover',
				parallaxSpeed      : 0.5,
				parallaxDirection  : 'up'
			};
			
			var data = a.data();
			
			var settings = $.extend({}, defaults, options, data);
			
			if (settings.parallaxSpeed > 1) {
				settings.parallaxSpeed = 1;
			} else if (settings.parallaxSpeed < 0) {
				settings.parallaxSpeed = 0;
			}
			
			if (a.find('.parallax-inner').length < 1) {
				a.prepend('<div class="parallax-inner"></div>');
			}
			
			c = a.find('.parallax-inner');
			
			function resizeBackground(a) {
				w = a.outerWidth();
				h = a.outerHeight();
				
				if (isMobile()) {
					f = 2;
				} else {
					f = 1;
				}
				
				if (settings.parallaxDirection === 'left' || settings.parallaxDirection === 'right') {
					w += ((w * Math.abs(parseFloat(settings.parallaxSpeed))) * f);
				}
				
				if (settings.parallaxDirection === 'up' || settings.parallaxDirection === 'down') {
					h += ((h * Math.abs(parseFloat(settings.parallaxSpeed))) * f);
				}
				
				return [w, h];
			}
			
			function repositionBackground(a, d) {
				
				if (a.offset().top === 0) {
					g = 5
				} else {
					g = 10;
				}
				
				switch (settings.parallaxDirection) {
					case 'up':
						x = 0;
						y = -((b.scrollTop() / g));
						z = 0;
						break;
					case 'down':
						x = 0;
						y = (b.scrollTop() / g) + (a.outerHeight() - d[1]);
						z = 0;
						break;
					case 'left':
						x = (b.scrollTop() / g) + (a.outerWidth() - d[0]);
						y = 0;
						z = 0;
						break;
					case 'right':
						x = -(b.scrollTop() / g);
						y = 0;
						z = 0;
						break;
				}
				
				return [x, y, z];
			}
			
			d = resizeBackground(a);
			e = repositionBackground(a, d);
			
			a.css({
				'position'   : 'relative',
				'background' : 'transparent',
				'overflow'   : 'hidden',
				'z-index'    : '1'
			});
			
			c.css({
				'position'            : 'absolute',
				'background-image'    : 'url(' + settings.parallaxBgImage + ')',
				'background-position' : settings.parallaxBgPosition,
				'background-repeat'   : settings.parallaxBgRepeat,
				'background-size'     : settings.parallaxBgSize,
				'width'               : d[0],
				'height'              : d[1],
				'transform'           : 'translate3d(' + e[0] + 'px, ' + e[1] + 'px, ' + e[2] + 'px)',
				'z-index'             : '-1'
			});
			
			b.resize(function () {
				d = resizeBackground(a);
				e = repositionBackground(a, d);
				
				c.css({
					'width'     : d[0],
					'height'    : d[1],
					'transform' : 'translate3d(' + e[0] + 'px, ' + e[1] + 'px, ' + e[2] + 'px)'
				});
			});
			
			if (settings.parallaxDirection === 'left' || settings.parallaxDirection === 'right') {
				p = 0;
				s = e[0];
			}
			
			if (settings.parallaxDirection === 'up' || settings.parallaxDirection === 'down') {
				p = 0;
				s = e[1];
			}
			
			var first = b.scrollTop();
			
			b.on('scroll', function (event) {
				
				var delta = b.scrollTop() - first;
				first     = b.scrollTop();
				
				p = delta * (parseFloat(settings.parallaxSpeed) / 5);
				
				if (settings.parallaxDirection === 'up') {
					s += -p;
					t = 'translate3d(' + e[0] + 'px, ' + s + 'px, ' + e[2] + 'px)';
				}
				
				if (settings.parallaxDirection === 'down') {
					s += p;
					t = 'translate3d(' + e[0] + 'px, ' + s + 'px, ' + e[2] + 'px)';
				}
				
				if (settings.parallaxDirection === 'left') {
					s += p;
					t = 'translate3d(' + s + 'px, ' + e[1] + 'px, ' + e[2] + 'px)';
				}
				
				if (settings.parallaxDirection === 'right') {
					s += -p;
					t = 'translate3d(' + s + 'px, ' + e[1] + 'px, ' + e[2] + 'px)';
				}
				
				c.css({
					'width'     : d[0],
					'height'    : d[1],
					'transform' : t
				});
				
			});
			
		});
		
	}
	
})(jQuery);
