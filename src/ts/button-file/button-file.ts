export class ButtonFile {
    
    constructor() {
        this.listenEvents();
    }

    private listenEvents() {
        document.querySelectorAll('.button--file .form-control').forEach((input: HTMLInputElement) => {
            input.addEventListener('change', () => this.onInputChange(input));
        });
    }

    private onInputChange(input: HTMLInputElement) {
        this.onFileSelected(input);
    }

    private onFileSelected(input: HTMLInputElement) {
        const filename: string = input.value.replace(/\\/g, '/').replace(/.*\//, '');
        
        input
            .closest('.form-group')
            .querySelector('.button__filename').innerHTML = filename;
    }

}