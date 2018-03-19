import { slideToggle } from 'dom-slider';

export class NavigationDropdown {
    constructor() {
        this.listenEvents();
    }

    private listenEvents() {
        document.querySelectorAll('.navigation__item--branch > .navigation__link').forEach((element: Element) => {
            element.addEventListener('click', () => this.openDropdown(element));
        });
    }

    private openDropdown(element: Element) {
        const currentAriaExpandedValue = element.getAttribute('aria-expanded');
        const navigationItem = element.parentElement;

        element.classList.toggle('navigation__link--opened');
        element.setAttribute('aria-expanded', currentAriaExpandedValue === 'true' ? 'false' : 'true');

        slideToggle(navigationItem.querySelector('.navigation') as any);

        event.preventDefault();
    }
}
