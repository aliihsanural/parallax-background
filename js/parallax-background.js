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
    
    $.fn.parallaxBackground = function (options) {
        
        return this.each(function () {
            
            var a = $(this);
            var b = $(window);
            var c, d, e, w, h, p, s, t, diff;
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
                
                if (settings.parallaxDirection === 'left' || settings.parallaxDirection === 'right') {
                    w += (w * Math.abs(parseFloat(settings.parallaxSpeed)));
                }
                
                if (settings.parallaxDirection === 'up' || settings.parallaxDirection === 'down') {
                    h += (h * Math.abs(parseFloat(settings.parallaxSpeed)));
                }
                
                return [w, h];
            }
            
            function repositionBackground(a, d) {
                
                if (a.offset().top === 0) {
                    diff = 5
                } else {
                    diff = 10;
                }
                
                switch (settings.parallaxDirection) {
                    case 'up':
                        x = 0;
                        y = -((b.scrollTop() / diff));
                        z = 0;
                        break;
                    case 'down':
                        x = 0;
                        y = (b.scrollTop() / diff) + (a.outerHeight() - d[1]);
                        z = 0;
                        break;
                    case 'left':
                        x = (b.scrollTop() / diff) + (a.outerWidth() - d[0]);
                        y = 0;
                        z = 0;
                        break;
                    case 'right':
                        x = -(b.scrollTop() / diff);
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
