import * as Vimeo from '@vimeo/player';
import isInsideViewport from "vanilla-lazyload/src/lazyload.viewport";

export class ProjectVideo{

    constructor() {
        this.init();
    }

    private isPlaying = false;

    public init() {
        const video = document.getElementById('project-video');

        if(video) {
            this.setVideoSizes(video);

            if(!('ontouchstart' in document)) {
                this.initVimeoPlayer(video);
            }

            window.addEventListener('resize', (event: Event) => {
                this.setVideoSizes(video);
            });
        }
    }

    private initVimeoPlayer(iframe) {
        const player = new Vimeo(iframe);

        if(isInsideViewport(iframe, window, 50)) {
            if(!this.isPlaying) {
                player.play();
                this.isPlaying = true;
            }
        } else {
            if(this.isPlaying) {
                player.pause();
                this.isPlaying = false;
            }
        }

        window.addEventListener('scroll', (event: Event) => {

            if(isInsideViewport(iframe, window, 50)) {
                if(!this.isPlaying) {
                    player.play();
                    this.isPlaying = true;
                }
            } else {
                if(this.isPlaying) {
                    player.pause();
                    this.isPlaying = false;
                }
            }
        });
    }

    private setVideoSizes(iframeNode) {
        const videoWidth: number = parseInt(iframeNode.getAttribute('width'));
        const videoHeight: number = parseInt(iframeNode.getAttribute('height'));
        const videoRatio = videoHeight/videoWidth;

        const newVideoWidth: number = Math.floor(parseInt((iframeNode.parentNode as any).offsetWidth));
        const newVideoHeight: number = Math.floor(newVideoWidth * videoRatio);

        iframeNode.setAttribute('width',  newVideoWidth.toString());
        iframeNode.setAttribute('height',  newVideoHeight.toString());

    }
}
