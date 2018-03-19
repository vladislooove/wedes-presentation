// Polyfills
import 'element-closest';
import 'nodelist-foreach-polyfill';
import Promise from 'promise-polyfill';

if (!window['Promise']) {
  window['Promise'] = Promise;
}


// Libs
import 'simplebar';

// Project classes
// import { Overlay } from './overlay/overlay';
import { LazyLoadProxy } from './lazyload/lazyload.proxy';
// import { FacebookSharing } from './base/facebook-sharing';
// import { FormGroupFloating } from './form-group-floating/form-group-floating';
// import { DesignMedia } from './design-media/design-media';
// import { NavigationDropdown } from './navigation-dropdown/navigation-dropdown';
// import { FlashMessages } from './flash-messages/flash-messages';
// import { InfiniteScroll } from './infinite-scroll/infinite-scroll';
// import { ButtonFile } from './button-file/button-file';
import { HomepageScenes } from './homepage-scenes/homepage-scenes';
import { PjaxPageLoading } from './base/pjax-page-loading';
import { ProjectVideo } from './base/project-video';
// import { Captcha } from './base/captcha';
// import { PortfolioCardHover } from './base/portfolio-card-hover';
import { DevelopmentIconAnimation } from './base/development-icon-animation';
import { HomepageProjects } from './base/homepage-projects';

// Initializations

new PjaxPageLoading();
const lazyLoadProxy = new LazyLoadProxy();
// const infiniteScroll =  new InfiniteScroll(lazyLoadProxy);
//
// new Overlay();
// new FacebookSharing();
// new FormGroupFloating({
//     rootElementSelector: '.form-group--floating',
//     childElementSelector: '.form-control',
//     animatedClassName: 'form-group--floated'
// });
// new DesignMedia();
// new NavigationDropdown();
// new FlashMessages();
// new ButtonFile();
new HomepageScenes(lazyLoadProxy);
new ProjectVideo();
new HomepageProjects();
// new Captcha();
// new PortfolioCardHover();
const developmentIconAnimation = new DevelopmentIconAnimation();

document.addEventListener('pjax_load_requested', (e) => {
    developmentIconAnimation.stopAnimation();
});

document.addEventListener('pjax_load_success', (e) => {
    // infiniteScroll.update();
    lazyLoadProxy.update();
    // new Overlay();
    // new FacebookSharing();
    // new FormGroupFloating({
    //     rootElementSelector: '.form-group--floating',
    //     childElementSelector: '.form-control',
    //     animatedClassName: 'form-group--floated'
    // });
    // new DesignMedia();
    // new NavigationDropdown();
    // new FlashMessages();
    // new ButtonFile();
    new HomepageScenes(lazyLoadProxy);
    new ProjectVideo();
    new HomepageProjects();
    // new Captcha();
    // new PortfolioCardHover();
    developmentIconAnimation.init();
})
