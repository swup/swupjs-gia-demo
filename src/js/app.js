import Swupjs from 'swupjs';
import { TweenMax } from 'gsap/TweenMax';
import loadComponents from 'gia/loadComponents';
import components from './components';

// enable components
loadComponents(components);

// enable swup
const swup = new Swupjs({
    debugMode: true,
    LINK_SELECTOR: 'a[href^="' + window.location.origin + '"]:not([data-no-swup]), a[href^="/"]:not([data-no-swup]), a[href^="./"]:not([data-no-swup]), a[href^="#"]:not([data-no-swup])',
    animations: {
        '*': {
            in: function(next){
                document.querySelector('#swup').style.opacity = 0;
                TweenMax.to(document.querySelector('#swup'), .5, {
                    opacity: 1,
                    onComplete: next
                });
            },
            out: function(next){
                document.querySelector('#swup').style.opacity = 1;
                TweenMax.to(document.querySelector('#swup'), .5, {
                    opacity: 0,
                    onComplete: next
                });
            }
        },
    }
});

// reload components for each container after transition
swup.on('contentReplaced', function () {
    document.querySelectorAll('[data-swup]').forEach(function (container) {
        loadComponents(components, container);
    });
});