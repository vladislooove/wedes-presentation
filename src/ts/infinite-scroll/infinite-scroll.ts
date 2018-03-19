import { LazyLoadProxy } from './../lazyload/lazyload.proxy';
import * as infiniteScroll from  'infinite-scroll';

export class InfiniteScroll {

    private options = {
        nextPageSelector: '.pagination__link--next',
    }

    public infiniteScroll;

    constructor(private lazyLoadProxy: LazyLoadProxy) {
        if (this.isPagination()) {
            this.initializeInfiniteScroll();
        }
    }

    public update() {
        if(this.infiniteScroll) {
            this.infiniteScroll.destroy();
        }

        if (this.isPagination()) {
            this.initializeInfiniteScroll();
        }
    }

    private isPagination(): boolean {
        return !!document.querySelector(this.options.nextPageSelector);
    }

    private initializeInfiniteScroll() {
        this.infiniteScroll = new infiniteScroll('[data-infinite-scroll-container]', {
            path: this.options.nextPageSelector,
            debug: true,
            append: '[data-infinite-scroll-item]',
            onInit: (instance) => {
                instance.on('request', () => {
                    document.documentElement.classList.add('infinite-scroll-loading');
                }).on('append', () => {
                    document.documentElement.classList.remove('infinite-scroll-loading');
                    this.lazyLoadProxy.update();
                });
            }
        });
    }
}
