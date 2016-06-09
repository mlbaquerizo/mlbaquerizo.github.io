$(document).ready(function(){

  var $aboutButton = $('a[id="about-link"]')
  var $aboutDiv = $('div[id="content-about"]')
  var $workButton = $('a[id="work-link"]')
  var $workDiv = $('div[id="content-work"]')
  var $contactButton = $('a[id="contact-link"]')
  var $contactDiv = $('div[id="content-contact"]')

  var $contentContainer = $('#content-container')

  $('nav').show("drop", 500);

  $aboutButton.hover(function(){
    $(this).css("border-bottom", "4px solid #3BC094")
  }, function(){
    $(this).css("border-bottom", "4px solid #eff6f3")
  })

  $aboutButton.click(function(){
    $contentContainer.show();
    $aboutDiv.fadeToggle(400);
    $workDiv.hide();
    $contactDiv.hide();
  })

  $workButton.hover(function(){
    $(this).css("border-bottom", "4px solid #6B95BF")
  }, function(){
    $(this).css("border-bottom", "4px solid #eff6f3")
  })

  $workButton.click(function(){
    $contentContainer.show();
    $workDiv.fadeToggle(400);
    $aboutDiv.hide();
    $contactDiv.hide();
  })

  $contactButton.hover(function(){
    $(this).css("border-bottom", "4px solid #AC305F")
  }, function(){
    $(this).css("border-bottom", "4px solid #eff6f3")
  })

  $contactButton.click(function(){
    $contentContainer.show();
    $contactDiv.fadeToggle(400);
    $workDiv.hide();
    $aboutDiv.hide();
  })

  $contactDiv.on('focusout', function(){
    $('#after-submit').html('');
    $('#after-submit').css('display', 'none')
  })

  $('.project-link').on('click', function(e){
    e.preventDefault;
    var divId = this.id + '-div';

    $(this).css('font-size', '2em');
    $('#' + divId).removeClass();
    $('#' + divId).addClass('active');

  })

  $('.email-form-input').on('blur', function(){
    var $errorDiv = $(this).parent().find('span[id=' + $(this).prop('name') + '-validation]');
    if(emptyFieldVal($(this).val())){
      $errorDiv.html('required field');
      $errorDiv.css('display', 'inline-block');
    } else {
      $errorDiv.html('');
      $errorDiv.css('display', 'none');
    }
  })

  $('#email').on('blur', function(){
    var $errorDiv = $(this).parent().find('span[id=' + $(this).prop('name') + '-validation]');
    if(!emailVal($(this).val())){
      $errorDiv.html('enter a valid email address')
      $errorDiv.css('display', 'inline-block');
    } else {
      $errorDiv.html('');
      $errorDiv.css('display', 'none');
    }
  })

  $('.close-content').on('click', function(){
    $(this).parent().fadeOut();
    $contentContainer.fadeOut();
  })

  $(this).on('click', function(e){
    if($(e.target).has('.main-content').length){
      $contentContainer.fadeOut();
      $('main-content').fadeOut();
    }
  })
})
