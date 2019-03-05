(function( $ ){

    function LazySlider($box, opt){
        var self = this;
        this.$box = $("<div class='lazy-slider'>").appendTo($box);
        this.$itemsBox = $("<div class='lazy-slider__items'>").appendTo(self.$box);
        this.opt = opt;
        this.index = 0;
        this.length = self.opt.items.length;
        this.$leftBtn = $("<div class='lazy-slider__button _left'>").prependTo(self.$box).on("click", function(){ self.before() });
        this.$rightBtn = $("<div class='lazy-slider__button _right'>").appendTo(self.$box).on("click", function(){ self.next() } );
        this.$btns = self.$leftBtn.add(self.$rightBtn);
        this.init();
    }

    LazySlider.prototype.init = function() {
        var self = this,
            opt = self.opt;
        $(opt.items).each(function(i, item) {
            var $item = $(item).appendTo(self.$itemsBox),
                proceed = (i + 1) < opt.count,
                top;
            top = $item.position().top;
            if( top > 50 ) {
                proceed = false;
                $item.remove();
                opt.count = i;
            }
            return proceed;
        });
        self.disableButtons();
    };

    LazySlider.prototype.append = function(items = []) {
        var self = this,
            html = items.join('');
        self.$itemsBox.html(html);
    };

    LazySlider.prototype.disableButtons = function() {
        var self = this,
            disClass = "_disable";
        self.$btns.removeClass(disClass);
        if(self.index == 0){
            this.$leftBtn.addClass(disClass);
        } else if( (self.index + self.opt.count) == self.length) {
            this.$rightBtn.addClass(disClass);
        }
    };

    LazySlider.prototype.before = function() {
        var self = this,
            start = self.index - self.opt.count;
            items = self.opt.items.slice(start, self.index );
        if(start >= 0) {
            self.append(items);
            self.index = start;
        }
        self.disableButtons();
    };

    LazySlider.prototype.next = function() {
        var self = this,
            start = self.index + self.opt.count,
            end = start + self.opt.count;
            items = self.opt.items.slice(start, end );
        if(end <= self.length) {
            self.append(items);
            self.index = start;
        }
        self.disableButtons();
    };

    $.fn.lazySlider = function( options ) {
        var settings = $.extend({
                items: [],
                count: 10
            }, options);

        return this.each(function() {
            var lazySlider = new LazySlider($(this), settings);
            $(this).data("lazySlider", lazySlider);
        });
    };

})( jQuery );