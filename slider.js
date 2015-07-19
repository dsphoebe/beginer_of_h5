var slider = {
    myKeyDown: function(code) {
        switch (code) {
            case 37:
            case 38:
                this.sliderToLeft();
                break;

            case 39:
            case 40:
                this.sliderToRight();
                break;

            default:
                break;
        }
    },
    sliderToLeft: function() {
        var slide = this.getPrevSlide()
        this.setCurrentSlide(slide)
    },
    sliderToRight: function() {
        var slide = this.getNextSlide();
        this.setCurrentSlide(slide);
    },
    getPrevSlide: function() {
        var currentSlide = this.getCurrentSlide(),
            previousSibling = currentSlide.previousSibling;

        while (previousSibling && previousSibling.nodeType != 1) {
            previousSibling = previousSibling.previousSibling;
        }

        return previousSibling;
    },
    getNextSlide: function() {
        var currentSlide = this.getCurrentSlide(),
            nextSibling = currentSlide.nextSibling;

        while (nextSibling && nextSibling.nodeType != 1) {
            nextSibling = nextSibling.nextSibling;
        }

        return nextSibling;
    },
    getCurrentSlide: function() {
        return document.querySelector('.current');
    },
    setCurrentSlide: function(slide) {
        if (!slide || !slide.classList.contains('page')) {
            return;
        }

        var currentSlide = this.getCurrentSlide();
        currentSlide.classList.remove('current');
        slide.classList.add('current');

        this.setProgressVal();
    },
    setProgressVal: function() {
        var slides = document.querySelectorAll('.page'),
            currentSlide = document.querySelector('.current'),
            progress = document.querySelector('progress'),
            idx = 1;
        [].forEach.call(slides, function(el) {
            if (el == currentSlide) {
                progress.setAttribute('value', idx);
            }
            idx++;
        });
    },
    initProgress: function() {
        var slides = document.querySelectorAll('.page'),
            progress = document.querySelector('progress'),
            n = slides.length;
        progress.setAttribute('max', n);
        progress.setAttribute('value', 1);
    },
    bindEvent: function() {
        var self = this;
        window.addEventListener('keydown', function(e) {
            self.myKeyDown(e.keyCode)
        }, false);
    },
    init: function() {
        this.bindEvent();
        this.initProgress();
    }
};