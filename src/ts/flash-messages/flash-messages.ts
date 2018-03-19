import swal, { SweetAlertType } from 'sweetalert2';

export interface FlashMessage {
    type: string;
    title: string;
    text: string;
}

export class FlashMessages {

    constructor() {
        this.listenEvents();
    }

    private listenEvents() {
        // When we need to show flash message on global `wedes` variable will be defined `flashMessage` property
        // @see WedesFrontendBundle:default:flash_messages.html.twig
        if (window['wedes'] && window['wedes']['flashMessage']) {
            this.showFlashMessage(<FlashMessage> window['wedes']['flashMessage']);
        }
    }

    public showFlashMessage(flashMessage: FlashMessage) {
        // Show alert
        swal({
            type: this.generateFlashMessageType(flashMessage.type),
            title: flashMessage.title,
            html: flashMessage.text,
            showCloseButton: true,
            confirmButtonClass: 'button button--primary',
            buttonsStyling: false,
            background: '#070707',
        }).then((result) => {
            delete window['wedes']['flashMessage'];
        });

        // Change `background-color` of shown overlay
        (document.querySelector('.swal2-container') as HTMLElement).style.backgroundColor = 'rgba(0, 0, 0, .9)';

        // Change styling of the titles
        document.querySelectorAll('.swal2-popup .swal2-content, .swal2-popup .swal2-title').forEach((element: HTMLElement) => {
            element.style.color = '#c4c4c4';
        });

        // Change styling of ring
        const swal2PopupSuccessRing: HTMLElement = <HTMLElement> document.querySelector('.swal2-icon.swal2-success .swal2-success-ring');
        if (swal2PopupSuccessRing) {
            Object.assign(swal2PopupSuccessRing.style, {
                borderColor: 'rgba(255, 233, 74, .5)',
            });
        }

        // Change styling of lines in ring
        document.querySelectorAll('.swal2-icon.swal2-success [class^="swal2-success-line"]').forEach((element: HTMLElement) => {
            Object.assign(element.style, {
                backgroundColor: '#ffe94a',
            });
        });

    }

    private generateFlashMessageType(type: string): SweetAlertType {
        if (type === 'success') {
            return type;
        } else {
            return 'info';
        }
    }

}
