export class Captcha{

    constructor() {
        this.init();
    }

    private options = {
        buttonSelector: '[data-attr="captcha-reload"]',
        captchaImageSelector: '[data-attr="captcha-image"]'
    }

    public init() {
        const button = document.querySelector(this.options.buttonSelector);

        if(button) {
            button.addEventListener('click', (event: Event) => {
                event.preventDefault();

                const image = document.querySelector(this.options.captchaImageSelector);
                const captchaCode = image.getAttribute('src');

                image.setAttribute('src', `${captchaCode}?n=${+new Date()}`);
            });
        }
    }
}
