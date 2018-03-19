import * as LazyLoad from 'vanilla-lazyload';

export class LazyLoadProxy {
    public lazyLoad;

    constructor() {
        this.init();
    }

    public init() {
        this.lazyLoad = new LazyLoad({
            elements_selector: 'img[data-src]',
            threshold: 150,
            callback_load: (element) => {
                element.parentNode.classList.add('loaded')
            }
        });
    }

    public update() {
        this.lazyLoad.update();
    }
}
