export class FacebookSharing {
    public FacebookSharing;

    private options = {
        projectTitleSelector: '[data-attr="project-title"]',
        projectImageSelector: '[data-attr="project-image"]',
        shareBtnSelector: '[data-attr="facebook-share"]',
        modalOptions: {
            scrollbars: 0,
            resizable: 1,
            menubar: 'no',
            width: 650,
            height: 550,
            toolbar: 0,
            status: 0
        }
    };

    constructor() {
        this.init();
    }

    public init() {
        (document.querySelectorAll(this.options.shareBtnSelector) as any).forEach((element: HTMLElement) => {
            element.addEventListener('click', (event: Event) => {
                event.preventDefault();
                this.openSharingModal();
            });
        });
    }

    private getProjectUrl() {
        return window.location.href;
    }

    private generateSharingUrl() {
        const link = encodeURIComponent(this.getProjectUrl());
        const sharingUrl = `https://www.facebook.com/sharer.php?u=${link}`;

        return sharingUrl;
    }

    private openSharingModal() {
        const _modalOptions = this.options.modalOptions;
        const modalTopPosition = (window.innerHeight/2) - (_modalOptions.height/2);
        const modalLeftPosition = (window.innerWidth/2) - (_modalOptions.width/2);
        const modalConfiguration = `scrollbars=${_modalOptions.scrollbars},resizable=${_modalOptions.resizable},menubar=${_modalOptions.menubar},left=${modalLeftPosition},top=${modalTopPosition},width=${_modalOptions.width},height=${_modalOptions.height},toolbar=${_modalOptions.toolbar},status=${_modalOptions.status}`

        window.open(this.generateSharingUrl(), 'share', modalConfiguration);
    }
}
