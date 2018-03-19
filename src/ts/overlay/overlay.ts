import * as bodyScroll from 'body-scroll-toggle';

export class Overlay {

    private options = {
        toggleSelector: '[data-toggle="overlay"]',
        classNameActiveOverlay: 'overlay--active',
        classNameActiveOverlayToggle: 'navigation-toggle--active',
        classNameActiveHTML: 'overlay-opened',
    };

    constructor(userOptions?) {
        if (userOptions) {
            // If we pass options during object initialization
            // we have to rewrite default options
            this.options = Object.assign(this.options, userOptions);
        }


        this.listenEvents();
    }

    private listenEvents() {
        this.listenOverlayToggle();
    }

    private listenOverlayToggle() {
        // Listen for click on elements that are responsible for overlay toggling
        (document.querySelectorAll(this.options.toggleSelector) as any).forEach((element: HTMLElement) => {
            element.addEventListener('click', (event: Event) => {
                const currentToggle = <HTMLElement> event.currentTarget;
                this.toggleOverlay(currentToggle);
            });
        });
    }

    private toggleOverlay(toggle: HTMLElement) {
        const targetOverlaySelector = this.getOverlaySelectorFromOverlayToggle(toggle);
        const targetOverlay = <HTMLElement> this.getOverlayBySelector(targetOverlaySelector);

        this.toggleBodyScroll(targetOverlay);
        this.toggleActive(document.documentElement, this.options.classNameActiveHTML);
        this.toggleActive(targetOverlay, this.options.classNameActiveOverlay);
    }

    private toggleBodyScroll(targetOverlay: HTMLElement) {
        if (targetOverlay.classList.contains(this.options.classNameActiveOverlay)) {
            bodyScroll.enable();
        } else {
            bodyScroll.disable();
        }
    }

    private toggleActive(htmlElement: HTMLElement, className: string) {
        htmlElement.classList.toggle(className);
    }

    private getOverlaySelectorFromOverlayToggle(overlayToggle: HTMLElement) {
        return overlayToggle.dataset.target;
    }

    private getOverlayBySelector(overlaySelector: string) {
        return document.querySelector(overlaySelector);
    }
}
