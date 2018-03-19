import * as Swiper from 'swiper/dist/js/swiper';
import { LazyLoadProxy } from './../lazyload/lazyload.proxy';

export class HomepageProjects {
    private homepageProjectsSwiper;

    constructor(private lazyLoadProxy: LazyLoadProxy) {
        this.init();
    }

    public init() {
        const slider = document.getElementById('homepage-projects');

        if(slider) {
            this.homepageProjectsSwiper = new Swiper(slider, {
                slidesPerView: 1,
                speed: 1000,
                keyboard: true,
            });

            this.homepageProjectsSwiper.on('slideChangeTransitionEnd', (event: Event) => {
                this.lazyLoadProxy.lazyLoad._boundHandleScroll();
            })
        }
    }
}
