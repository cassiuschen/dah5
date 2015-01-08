App =
  Init : () ->
    App.Resize()

  Resize : ->
    App.replaceHeroContainerPositon()
    console.log 'Resizing....'

  replaceHeroContainerPositon : ->
    @container = $('#hero .container').height()
    @height = $(window).height()
    $('#hero .container').css 'padding-top', ((@height - @container) / 2)

$ ->
  Swiper = $('.pages').swiper
    mode:'vertical'
    loop: false
    keyboardControl: true
    mousewheelControl: true
    moveStartThreshold: 80
  App.Init()

window.onresize = ->
  App.Resize()

document.onreadystatechange = ->
  App.Resize()
  if document.readyState == "complete"
    App.Init()