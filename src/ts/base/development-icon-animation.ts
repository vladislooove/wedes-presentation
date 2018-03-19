export class DevelopmentIconAnimation{
    private intervalId;
    private timeoutIds;

    constructor(){
        this.init();
    }

    public init(){
        const icon = document.querySelector('.development-icon');

        if(icon) {
            this.animateDevelopmentIcon();
            this.intervalId = setInterval(() => {
                this.animateDevelopmentIcon()
            }, 8000)
        }
    }


    public stopAnimation(): void {
        if(this.intervalId) {
            clearInterval(this.intervalId);
        }

        if(this.timeoutIds) {
            for (let i = 0; i < this.timeoutIds.length; i++) {
                clearTimeout(this.timeoutIds[i]);
            }
        }
    }

    private animateDevelopmentIcon(): void {

        //destructing arr of icon parts
        const [ monitorStand, monitorBorder, border, leftBracket, slash, iphoneBtn, rightBracket  ] = this.getAllIconParts();

        for(let i = 0; i <= 20; i++){
            let opacity = `opacity: ${(100 - 100* (i/20))/100}`;
            let opacityNegative = `opacity: ${(0 + 100* (i/20))/100}`;
            let monitorBorderWidth = 65 - i*1.5 + '';
            let monitorBorderHeight = 50 + i*0.7 + '';
            let monitorBorderPosition = 264.5 + i*0.75 + '';
            let borderWidth = 53 - i*1.5 + '';
            let borderHeight = 37 + i*0.575 + '';
            let borderPosition = 270.5 + i*0.75 + '';

            //first step of animation - from desktop to tablet
            const _id1 = this.animateAttribute(monitorStand, 'style', opacity, 15 * i);
            const _id2 = this.animateAttribute(leftBracket, 'style', opacity, 15 * i);
            const _id3 = this.animateAttribute(slash, 'style', opacity, 15 * i);
            const _id4 = this.animateAttribute(rightBracket, 'style', opacity, 15 * i);
            const _id5 = this.animateAttribute(iphoneBtn, 'style', opacityNegative, 15 * i);
            const _id6 = this.animateAttribute(monitorBorder, 'height', monitorBorderHeight, 15 * i);
            const _id7 = this.animateAttribute(border, 'height', borderHeight, 15 * i);

            //second step - from tablet to mobile
            const _id8 = this.animateAttribute(monitorBorder, 'width', monitorBorderWidth, 2000 + (15 * i));
            const _id9 = this.animateAttribute(monitorBorder, 'x', monitorBorderPosition, 2000 + (15 * i));
            const _id10 = this.animateAttribute(border, 'width', borderWidth, 2000 + (15 * i));
            const _id11 = this.animateAttribute(border, 'x', borderPosition, 2000 + (15 * i));

            //redefining variables for reverse animation
            opacity = `opacity: ${((100 + 100* (i/20))/100) - 1}`;
            opacityNegative = `opacity: ${(100 - 100* (i/20))/100}`;
            monitorBorderWidth = 35 + i*1.5 + '';
            monitorBorderHeight = 61.5 - i*0.575 + '';
            monitorBorderPosition = 279.5 - i*0.75 + '';
            borderWidth = 23 + i*1.5 + '';
            borderHeight = 48.5 - i*0.575 + '';
            borderPosition = 285.5 - i*0.75 + '';

            //third step - from mobile to tablet
            const _id12 = this.animateAttribute(monitorBorder, 'width', monitorBorderWidth, 4000 + (15 * i));
            const _id13 = this.animateAttribute(monitorBorder, 'x', monitorBorderPosition, 4000 + (15 * i));
            const _id14 = this.animateAttribute(border, 'width', borderWidth, 4000 + (15 * i));
            const _id15 = this.animateAttribute(border, 'x', borderPosition, 4000 + (15 * i));

            //fourth step - from tablet to desktop
            const _id16 = this.animateAttribute(monitorStand, 'style', opacity, 6000 + (15 * i));
            const _id17 = this.animateAttribute(leftBracket, 'style', opacity, 6000 + (15 * i));
            const _id18 = this.animateAttribute(slash, 'style', opacity, 6000 + (15 * i));
            const _id19 = this.animateAttribute(rightBracket, 'style', opacity, 6000 + (15 * i));
            const _id20 = this.animateAttribute(iphoneBtn, 'style', opacityNegative, 6000 + (15 * i));
            const _id21 = this.animateAttribute(monitorBorder, 'height', monitorBorderHeight, 6000 + (15 * i));
            const _id22 = this.animateAttribute(border, 'height', borderHeight, 6000 + (15 * i));

            this.timeoutIds =  [_id1, _id2, _id3, _id4, _id5, _id6, _id7, _id8, _id9, _id10, _id11, _id12, _id13, _id14, _id15, _id16, _id17, _id18, _id19, _id20, _id21, _id22];
        }
    }

    //change some attribute of element with seted timeout
    private animateAttribute(element: Element, attribute: string, value: string, stepTime: number): number {
        return setTimeout(function(){
            element.setAttribute(attribute, value);
        }, stepTime);
    }

    //collesct all needed parts of icon and return with array
    private getAllIconParts(): Array<Element> {
        const monitorStand = document.querySelector('.development-icon__monitor-stand');
        const monitorBorder = document.querySelector('.development-icon__monitor-border');
        const border = document.querySelector('.development-icon__border');
        const leftBracket = document.querySelector('.development-icon__left-bracket');
        const slash = document.querySelector('.development-icon__slash');
        const iphoneBtn = document.querySelector('.development-icon__iphone-btn');
        const rightBracket = document.querySelector('.development-icon__right-bracket');

        return [monitorStand, monitorBorder, border, leftBracket, slash, iphoneBtn, rightBracket];
    }
}
