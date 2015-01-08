var App;

App = {
  Init: function() {
    return App.Resize();
  },
  Resize: function() {
    App.replaceHeroContainerPositon();
    return console.log('Resizing....');
  },
  replaceHeroContainerPositon: function() {
    this.container = $('#hero .container').height();
    this.height = $(window).height();
    return $('#hero .container').css('padding-top', (this.height - this.container) / 2);
  }
};

$(function() {
  var Swiper;
  Swiper = $('.pages').swiper({
    mode: 'vertical',
    loop: false,
    keyboardControl: true,
    mousewheelControl: true,
    moveStartThreshold: 80
  });
  return App.Init();
});

window.onresize = function() {
  return App.Resize();
};

document.onreadystatechange = function() {
  App.Resize();
  if (document.readyState === "complete") {
    return App.Init();
  }
};
