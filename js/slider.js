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
        this.setProgressVal();
    },
    sliderToRight: function() {
        var slide = this.getNextSlide();
        this.setCurrentSlide(slide);
        this.setProgressVal();
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
    },
    setProgressVal: function() {
        var slideWrap = document.querySelector('.pages'),
            slides = document.querySelectorAll('.page'),
            currentSlide = document.querySelector('.current'),
            progress = document.querySelector('progress'),
            wWid = window.innerWidth,
            idx = 1,
            self = this;
        [].forEach.call(slides, function(el) {
            if (el == currentSlide) {
                progress.setAttribute('value', idx);
                window.history.replaceState({
                    page: idx
                }, document.title, 'index.html?page=' + idx);
                (function(i) {
                    self.setSlidesWid(i);
                })(idx - 1);
            }
            idx++;
        });
    },
    initProgress: function() {
        var slides = document.querySelectorAll('.page'),
            progress = document.querySelector('progress'),
            n = slides.length,
            page = window.location.search ? window.location.search.split('page=')[1] : 1;
        progress.setAttribute('max', n);
        progress.setAttribute('value', page);
    },
    initSlide: function() {
        var slides = document.querySelectorAll('.page'),
            page = window.location.search ? window.location.search.split('page=')[1] : 1,
            slide = slides[page - 1];
        this.setCurrentSlide(slide);
        this.setSlideWid();
        this.setSlidesWid(page - 1);
    },
    setSlideWid: function() {
        var slides = document.querySelectorAll('.page'),
            wid = window.innerWidth;
        [].forEach.call(slides, function(el) {
            el.style.width = wid + 'px';
        });
    },
    setSlidesWid: function(i) {
        var wid = window.innerWidth,
            slides = document.querySelectorAll('.page'),
            allWid = wid * slides.length,
            slideWrap = document.querySelector('.pages');
        slideWrap.style.cssText = 'width: ' + allWid + 'px; left: -' + wid * i + 'px';
    },
    bindEvent: function() {
        var self = this;
        window.addEventListener('keydown', function(e) {
            self.myKeyDown(e.keyCode)
        }, false);
        window.addEventListener('resize', function() {
            self.setSlideWid();
        }, false);
    },
    init: function() {
        this.bindEvent();
        this.initProgress();
        this.initSlide();
    }
};