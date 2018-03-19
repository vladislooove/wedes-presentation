import { LazyLoadProxy } from './../lazyload/lazyload.proxy';
import * as Swiper from 'swiper/dist/js/swiper';

export class HomepageScenes{

    private homepageScenesSwiper;

    private isInited = false;

    private isTransitionActive = false;

    private touchPositions = {
        yTouchStart: 0,
        yTouchEnd: 0,
    }

    private isVideoPlaying = true;

    private options = {
        containerSelector: '#homepage-scenes',
        projectSceneSelector: '#scene-homepage-portfolio-cards',
        scrollDownBtnSelector: '[data-el="scroll-scene-btn"]',
        introVideoClass: 'scene__background-video',
        swiperOptions: {
            direction: 'vertical',
            slidesPerView: 1,
            speed: 1000,
            mousewheel: true,
            keyboard: true,
            simulateTouch: false,
            followFinger: false
        }
    };

    constructor(private lazyLoadProxy: LazyLoadProxy) {
        this.init();
    }

    public init() {
        this.initResizeHandler();
        this.initSwiper();
    }

    private initSwiper() {
        const isIpad = window.navigator.userAgent.indexOf('iPad');
        const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);

        //detect devices width height > 550, width > 767 and no safari at ipad to init slider

        if(window.innerHeight > 550 && window.innerWidth > 767 && (isIpad == -1 && !isSafari) ) {

            this.homepageScenesSwiper = new Swiper(this.options.containerSelector, this.options.swiperOptions);

            if(this.homepageScenesSwiper.$el) {
                this.initScrollButtons();

                if('ontouchstart' in window) {
                    this.enablePortfolioSwipe();
                } else {
                    this.enablePortfolioScroll();
                }

                this.goToSceneFromUrl();
                this.onSlideChangeNav();
                this.onTransitionHandler();
                this.toggleVideo();
                this.homepageScenesSwiper.$el[0]
                    .classList.add('swiper-loaded');

                this.isInited = true;
            }
        } else {
            const sliderContainer = document.querySelector(this.options.containerSelector);

            if(sliderContainer) {
                sliderContainer.classList.add('swiper-freescroll');

                this.isInited = false;
            }
        }
    }

    private initResizeHandler() {
        const sliderContainer = document.querySelector(this.options.containerSelector);

        if(sliderContainer) {
            //store previous window width to detect horizontal resize
            let prevViewportWidth = window.innerWidth;

            window.addEventListener('resize', (event: Event) => {

                //reinit slider only if resize was horizontal, to explude resizing by browser address bar at mobiles
                if(window.innerWidth !== prevViewportWidth) {

                    //update viewportWidth
                    prevViewportWidth = window.innerWidth;

                    if(this.homepageScenesSwiper) {

                        if( this.isInited ) {
                            this.homepageScenesSwiper.$el[0]
                                .classList.remove('swiper-loaded');

                            this.homepageScenesSwiper.destroy();
                            this.removeScrollButtonsHandler();
                            this.isInited = false;
                        } else {

                            sliderContainer
                                .classList.remove('swiper-freescroll');
                            this.isInited = false;
                        }
                    } else {
                        const sliderContainer = document.querySelector(this.options.containerSelector);

                        sliderContainer
                            .classList.remove('swiper-freescroll');

                        this.isInited = false;

                    }

                    this.initSwiper();
                }
            })
        }
    }

    private goToSceneFromUrl() {

        // navigate to specific slide if hash exist

        const hash = window.location.hash;
        const hashSlideIndex = this.getSlideByHash(hash);

        this.homepageScenesSwiper.slideTo(hashSlideIndex, 0);

        this.lazyLoadProxy.lazyLoad._boundHandleScroll();
    }

    private getSlideByHash(hash: String){

        //helper func to get slide index by hash string

        let slideIndex;
        const slides = this.homepageScenesSwiper.slides;

        for(let i = 0; i < slides.length; i++) {

            if(slides[i].getAttribute('data-hash') == hash.substr(1)) {
                slideIndex = i;
            }
        }

        return slideIndex;
    }

    private onTransitionHandler(){

        //helper function to change global class state to detect if transition is still running

        this.homepageScenesSwiper.on('slideChangeTransitionStart', (event: Event) => {
            this.isTransitionActive = true;
        });

        this.homepageScenesSwiper.on('slideChangeTransitionEnd', (event: Event) => {
            this.isTransitionActive = false;

            //update lazy images every scene change
            this.lazyLoadProxy.lazyLoad._boundHandleScroll();

        })
    }

    private onSlideChangeNav() {

        //get specific hashes from slides and add to browser location

        this.homepageScenesSwiper.on('slideChange', (event: Event) => {
            const currentMediaSwipeHash = (this.homepageScenesSwiper.slides[(this.homepageScenesSwiper.realIndex)])
                .getAttribute('data-hash');

            window.location.hash = currentMediaSwipeHash;

            this.toggleVideo();
        });
    }

    private initScrollButtons() {

        //adding event listeners to navigate between slides with scroll button

        (document.querySelectorAll(this.options.scrollDownBtnSelector) as any).forEach((element: HTMLElement) => {
            element.addEventListener('click', (event: Event) => {
                this.homepageScenesSwiper.slideNext();
            });
        });

    }

    private toggleVideo() {
        const video = document.getElementsByClassName(this.options.introVideoClass)[0];

        if(this.homepageScenesSwiper.realIndex === 0) {
            //if first slide is active and player state is not active - play video

            if(!this.isVideoPlaying) {
                (video as any).play();
                this.isVideoPlaying = true;
            }
        } else {
            //else if first slide is not active and player state is active - pause video

            if(this.isVideoPlaying) {
                (video as any).pause();
                this.isVideoPlaying = false;
            }
        }
    }

    private removeScrollButtonsHandler() {
        //clone buttons and replace original by clone with no click listeners

        (document.querySelectorAll(this.options.scrollDownBtnSelector) as any).forEach((element: HTMLElement) => {
            const newElement = element.cloneNode(true);
            element.parentNode.replaceChild(newElement, element);
        });
    }

    private allowProjectsScrollTop(scrollBarTopPosition: any, event: Event) {
        //allow scrolling to top scene if project custom scroll is at top edge

        if(scrollBarTopPosition != 2) {
            event.stopPropagation();
            this.lazyLoadProxy.lazyLoad._boundHandleScroll();
        }
    }

    private allowProjectsScrollBottom(windowHeight: any, scrollBarHeight: any, scrollBarTopPosition: any, event: Event) {
        //allow scrolling to top scene if project custom scroll is at bottom edge

        if((windowHeight - scrollBarHeight - scrollBarTopPosition) != 2) {
            event.stopPropagation();
            this.lazyLoadProxy.lazyLoad._boundHandleScroll();
        }
    }

    private enablePortfolioSwipe(){
        //init swipe inside portfolio slide if touch device

        const projectsScene = document.querySelector(this.options.projectSceneSelector);

        if(projectsScene) {
            projectsScene.addEventListener('touchstart', (event: any) => {
                this.touchPositions.yTouchStart = event.changedTouches[0].screenY;
            });

            projectsScene.addEventListener('touchmove', (event: any) => {
                this.touchPositions.yTouchEnd = event.changedTouches[0].screenY;

                if(!(this.isTransitionActive)) {
                    const currentSlide = event.target.closest('.swiper-slide');
                    const scrollBar = (currentSlide.querySelector('.simplebar-scrollbar') as any);
                    const scrollBarTopPosition = scrollBar.offsetTop;
                    const scrollBarHeight = scrollBar.offsetHeight;
                    const windowHeight = window.innerHeight;

                    if(scrollBar.offsetTop) {

                        if(this.touchPositions.yTouchStart > this.touchPositions.yTouchEnd) {
                            this.allowProjectsScrollBottom(windowHeight, scrollBarHeight, scrollBarTopPosition, event);
                        } else if(this.touchPositions.yTouchStart < this.touchPositions.yTouchEnd) {
                            this.allowProjectsScrollTop(scrollBarTopPosition, event)
                        }
                    }
                }
            });
        }
    }

    private enablePortfolioScroll() {
        //init scroll inside portfolio slide if non touch device

        const projectsScene = document.querySelector(this.options.projectSceneSelector);

        if(projectsScene) {
            projectsScene.addEventListener('wheel', (event: any) => {
                if(!(this.isTransitionActive)) {
                    const currentSlide = event.target.closest('.swiper-slide');

                    const scrollBar = (currentSlide.querySelector('.simplebar-scrollbar') as any);
                    const scrollBarTopPosition = scrollBar.offsetTop;
                    const scrollBarHeight = scrollBar.offsetHeight;
                    const windowHeight = window.innerHeight;

                    if(scrollBar.offsetTop) {

                        if(event.deltaY > 0) {
                            this.allowProjectsScrollBottom(windowHeight, scrollBarHeight, scrollBarTopPosition, event);
                        } else {
                            this.allowProjectsScrollTop(scrollBarTopPosition, event)
                        }
                    }
                }
            });
        }
    }
}
