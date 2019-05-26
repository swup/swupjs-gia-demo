import Swup from 'swup';
import JsPlugin from '@swup/js-plugin';
import DebugPlugin from '@swup/debug-plugin';
import { TweenMax } from 'gsap/TweenMax';
import loadComponents from 'gia/loadComponents';
import components from './components';

// enable components
loadComponents(components);

// enable swup
const swup = new Swup({
    linkSelector: 'a[href^="' + window.location.origin + '"]:not([data-no-swup]), a[href^="/"]:not([data-no-swup]), a[href^="./"]:not([data-no-swup]), a[href^="#"]:not([data-no-swup])',
    plugins: [
        new JsPlugin([
            {
                from: '(.*)',
                to: '(.*)',
                in: (next) => {
                    document.querySelector('#swup').style.opacity = 0;
                    TweenMax.to(document.querySelector('#swup'), .5, {
                        opacity: 1,
                        onComplete: next
                    });
                },
                out: (next) => {
                    document.querySelector('#swup').style.opacity = 1;
                    TweenMax.to(document.querySelector('#swup'), .5, {
                        opacity: 0,
                        onComplete: next
                    });
                }
            },
        ]),
        new DebugPlugin()
    ]
});

// reload components for each container after transition
swup.on('contentReplaced', function () {
    document.querySelectorAll('[data-swup]').forEach(function (container) {
        loadComponents(components, container);
    });
});
