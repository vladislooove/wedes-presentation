import * as Pjax from '../libs/pjax-standarlone';

export class PjaxPageLoading{
    constructor() {
        this.init();
    }

    public init() {
        Pjax.connect({
            'container': 'pjax-container',
            'pjax_load_requested': this.pjaxLoadRequested,
            'pjax_load_ended': function(event) {},
            'pjax_load_success': this.pjaxLoadSuccess,
            'pjax_load_blocked': this.pjaxLoadBlocked,
            'excludeClass': 'pjax-exclude'
        })
    }

    private pjaxLoadRequested() {
        // clean template from prev state(s)

        document.querySelector('html').classList.remove('overlay-opened');
        document.querySelector('body').style.cssText = '';

        (this as any).classList.add('navigation-transition');
    }

    private pjaxLoadSuccess() {
        (this as any).classList.remove('navigation-transition');
    }

    private pjaxLoadBlocked() {
        // clean template from prev state(s)

        document.querySelector('html').classList.remove('overlay-opened');
        document.querySelector('body').style.cssText = '';
        document.querySelector('#overlay-main-menu').classList.remove('overlay--active');
    }
}
