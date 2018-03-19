/*
    NEED REFACTOR!
    Originally class was written for vidlunya
*/

export class FormGroupFloating {
    constructor(private options) {
        this.initFormGroups();
        this.bindEvents();
    }

    private initFormGroups() {
        //If input has value it will be animated
        document.querySelectorAll(`${this.options.rootElementSelector} ${this.options.childElementSelector}`)
            .forEach((inputElement: HTMLInputElement) => {
                if (inputElement.value.length) {
                    this.floatFormGroup(inputElement);
                }
            });
    }

    private bindEvents() {
        const allInputs: NodeListOf<Element> = document.querySelectorAll(`${this.options.rootElementSelector} ${this.options.childElementSelector}`);

        allInputs.forEach((input: HTMLInputElement) => {
            switch(input.type) {
                case 'file':
                    input.addEventListener('change', (event: Event) => this.onInputFileChange(event, input));
                    break;
                default:
                    input.addEventListener('focus', (event: Event) => this.onInputFocus(event, input));
                    input.addEventListener('blur', (event: Event) => this.onInputBlur(event, input));
                    break;
            }
        });
    }

    private onInputFocus(event: Event, input: HTMLInputElement) {
        this.floatFormGroup(input);
    }

    private onInputBlur(event: Event, input: HTMLInputElement) {
        if (!input.value.length) {
            this.unFloatFormGroup(input);
        }
    }

    private onInputFileChange(event: Event, input: HTMLInputElement) {
        if (input.value) {
            this.floatFormGroup(input);
        } else {
            this.unFloatFormGroup(input);
        }
    }

    private floatFormGroup(input: HTMLInputElement) {
        input
            .closest(this.options.rootElementSelector)
            .classList
                .add(this.options.animatedClassName)
    }

    private unFloatFormGroup(input: HTMLInputElement) {
        input
            .closest(this.options.rootElementSelector)
            .classList
                .remove(this.options.animatedClassName)
    }
}
