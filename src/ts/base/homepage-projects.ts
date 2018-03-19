import * as Swiper from 'swiper/dist/js/swiper';

export class HomepageProjects {
    private HomepageProjectsSwiper;

    constructor() {
        this.init();
    }

    public init() {
        const slider = document.getElementById('homepage-projects');

        if(slider) {
            this.HomepageProjectsSwiper = new Swiper(slider)
        }
    }
}
