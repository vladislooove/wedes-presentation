export class PortfolioCardHover {
    private options = {
        porftolioCardSelector: '[data-el="touch-hover"]',
        touchClass: 'touch',
    }
    constructor() {
        this.init();
    }

    public init(){
        if('ontouchstart' in document) {
            this.addTouchClass();
        }
    }

    private addTouchClass() {
        (document.querySelectorAll(this.options.porftolioCardSelector) as any).forEach((element: HTMLElement) => {
            element.classList.add(this.options.touchClass);
        });
    }
}
