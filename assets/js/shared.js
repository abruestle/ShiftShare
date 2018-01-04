$('#carouselExample').on('slide.bs.carousel', function (e) {

    var $e = $(e.relatedTarget);
    var idx = $e.index();
    var itemsPerSlide = 4;
    var totalItems = $('.carousel-item').length;
    
    if (idx >= totalItems-(itemsPerSlide-1)) {
        var it = itemsPerSlide - (totalItems - idx);
        for (var i=0; i<it; i++) {
            // append slides to end
            if (e.direction=="left") {
                $('.carousel-item').eq(i).appendTo('.carousel-inner');
            }
            else {
                $('.carousel-item').eq(0).appendTo('.carousel-inner');
            }
        }
    }
});

// var $gridShared = $('#sharedImages').masonry({
//     itemSelector: '.grid-item',
//     columnWidth: '.grid-sizer',
//     percentPosition: true,
//     transitionDuration: 0
//   });

//   $gridShared.imagesLoaded().progress( function() {
//     $gridShared.masonry();
//   });