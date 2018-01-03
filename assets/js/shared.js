


var $gridShared = $('#sharedImages').masonry({
    itemSelector: '.grid-item',
    columnWidth: '.grid-sizer',
    percentPosition: true,
    transitionDuration: 0
  });

  $gridShared.imagesLoaded().progress( function() {
    $gridShared.masonry();
  });