import * as Swiper from 'swiper/dist/js/swiper';
import axios from 'axios';
import * as bodyScroll from 'body-scroll-toggle';

export class DesignMedia{

    constructor() {
        this.init();
    }

    private rootSwiper;
    private mediaSwipers = [];
    private options = {
        mediaContainerSelector: '[data-attr="design-media-container"]',
        designCardSelector: '[data-attr="design-media-item"]',
        rootSliderSelector: '[data-attr="design-root-swiper"]',
        loadingSliderClass: 'swiper-container-loading',
        mediaSliderSelector: '[data-attr="design-media-swiper"]',
        rootSliderOptions: {
            slidesPerView: 1,
            speed: 900,
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
            spaceBetween: 25,
            keyboard: true,
        },
        mediaSliderOptions: {
            direction: 'vertical',
            slidesPerView: 1,
            speed: 900,
            mousewheel: true,
            navigation: {
                nextEl: '.media-swiper-button-next',
            },
            spaceBetween: 25,
            keyboard: true,
        }
    };

    public init() {
        this.initSliders();
        this.onCardClick();
        this.onCloseClick();
        this.onSlideChange();
        this.initHashNavigation();
    }

    private initSliders(): void {

        // init all swipers
        // store rootSwiper ref to this.rootSwiper and all media sub swipers to this.mediaSwipers array

        this.rootSwiper = new Swiper(this.options.rootSliderSelector, this.options.rootSliderOptions);

        (document.querySelectorAll(this.options.mediaSliderSelector) as any).forEach((element: HTMLElement) => {
            const id = element.getAttribute('data-swiper-id');
            const currentSwiper = new Swiper(`[data-swiper-id="${id}"]`, this.options.mediaSliderOptions)

            this.mediaSwipers.push({
                id: id,
                swiper: currentSwiper
            });
        });
    }

    private onCardClick(): void {

        // init click event on design card, after open swiper that associated with current card

        (document.querySelectorAll(this.options.designCardSelector) as any).forEach((element: HTMLElement) => {
            element.addEventListener('click', (event: Event) => {
                const designCardIndex = parseInt(element.getAttribute('data-index'));
                const designCardId = parseInt(element.getAttribute('data-id'));
                const designCardSlug = element.getAttribute('data-slug');

                if(designCardIndex !== this.rootSwiper.realIndex) {
                    this.navigateToSlide(designCardIndex);
                } else {
                    window.location.hash = designCardSlug;
                    this.updateMediaSwiper(designCardId);
                }

                this.showMediaContainer();
            });
        });
    }

    private onCloseClick():void {

        // init click event on close media gallery button

        (document.querySelectorAll('.swiper-button-close') as any).forEach((element: HTMLElement) => {
            element.addEventListener('click', (event: Event) => {
                this.hideMediaContainer();
                window.location.hash = '';
            });
        });
    }

    private showMediaContainer():void {
        // shows media gallery container and disable scroll at document

        document.querySelector('html').classList.add('overlay-opened');
        bodyScroll.disable();
        document.querySelector(this.options.mediaContainerSelector).classList.add('visible');
    }

    private hideMediaContainer():void {

        // hides media gallery container and enable scroll at document

        document.querySelector(this.options.mediaContainerSelector).classList.remove('visible');

        // custom bodyScroll.disable(), cuz bodyscroll takes styles with already disabled scroll
        document.body.style.cssText = '';
        document.querySelector('html').classList.remove('overlay-opened');
    }

    private navigateToSlide(index: Number):void {

        // navigate root swiper to media swiper that associated with slide index

        this.rootSwiper.slideTo(index, 0);
    }

    private getProjectMedia(id: Number):any {

        // get media by id of project, returns axios promise object

        return axios.get(`/api/portfolio/projects/${id}/media.json`);
    }

    private onSlideChange() {

        // init event on every slide change of root swiper to update media swiper and update location hash to
        // navigate via address bar

        this.rootSwiper.on('slideChange', (event: Event) => {
            const currentMediaSwiperId = (this.rootSwiper.slides[(this.rootSwiper.realIndex)])
                .querySelector(this.options.mediaSliderSelector)
                .getAttribute('data-swiper-id');

            const currentMediaSwiperSlug = (this.rootSwiper.slides[(this.rootSwiper.realIndex)])
                .querySelector(this.options.mediaSliderSelector)
                .getAttribute('data-swiper-slug');

            window.location.hash = currentMediaSwiperSlug;
            this.updateMediaSwiper(currentMediaSwiperId);
        });
    }

    private getSwiperById(id: Number): Swiper {

        // get mediaSwiper ref by id number, returns Swiper interface

        let mediaSwiper;

        this.mediaSwipers.map((item) => {

            if(item.id == id){
                mediaSwiper = item.swiper;
            }

        })

        return mediaSwiper;
    }

    private generateSlidesFromArray(mediaItems: Array<{ id, name, provider_name, urls}>): Array<String> {

        // generates array of slider templates from media items array

        let slides = [];

        mediaItems.map((mediaItem) => {
            const slideTemplate = `<div class="swiper-slide"><img src="${mediaItem.urls.design_media_detailed}" srcset="${mediaItem.urls.design_media_detailed_2x} 2x" alt="${mediaItem.name}" class="design-swiper-img"></div>`;
            slides.push(slideTemplate);
        });

        return slides;
    }

    private appEndSlidesToSwiper(swiper: Swiper, slides: Array<String>):void {

        // insert array of slides to swiper object

        swiper.appendSlide(slides);
    }

    private mediaSwiperLoadingStart(swiperDomNode: Element) {

        // add loading class to indicate loading process started

        swiperDomNode.classList.add(this.options.loadingSliderClass);
    }

    private mediaSwiperLoadingEnd(swiperDomNode: Element) {

        // remove loading class to indicate loading process ended

        swiperDomNode.classList.remove(this.options.loadingSliderClass);
    }

    private initHashNavigation(): void{

        // if we have link to specific project - navigate to it

        // detect if address link has '3d' string
        if(window.location.pathname.indexOf('3d') !== -1) {


            // detect if address link has hash and trigger click event at design-card  with equal slug
            if(window.location.hash.length) {
                const projectSlug = window.location.hash.substring(1);
                document.querySelector(`[data-slug="${projectSlug}"]`).dispatchEvent(new Event('click'));
            }

        }

    }

    private updateMediaSwiper(id: Number):void {

        // load specific project images if they not loaded, or ignore if they did

        const swiper = this.getSwiperById(id);

        const swiperDomNode = document.querySelector(`[data-swiper-id="${id}"]`);

        // detect if current media swiper was updated before and load images if it didnt
        if (swiperDomNode.getAttribute('data-swiper-loaded') === 'false') {
            this.mediaSwiperLoadingStart(swiperDomNode);
            this.getProjectMedia(id)
                .then((response) => {
                    let mediaItems = [];

                    response.data.item.albums.map((album) => {
                        album.items.map((item) => {
                            mediaItems.push(item);
                        })
                    })

                    this.appEndSlidesToSwiper(swiper, this.generateSlidesFromArray(mediaItems));
                    swiperDomNode.setAttribute('data-swiper-loaded', 'true');
                    this.mediaSwiperLoadingEnd(swiperDomNode);
                })
                .catch((error) => {
                    console.log(error);
                    this.mediaSwiperLoadingEnd(swiperDomNode);
                });
        }
    }
}
