$(document).ready(function(){

  var $aboutButton = $('button[name="about"]')
  var $aboutDiv = $('div[id="content-about"]')
  var $workButton = $('button[name="work"]')
  var $workDiv = $('div[id="content-work"]')
  var $contactButton = $('button[name="contact"]')
  var $contactDiv = $('div[id="content-contact"]')

  $('nav').show("drop", 500);

  $aboutButton.hover(function(){
    $(this).css("border-bottom", "4px solid #3BC094")
  }, function(){
    $(this).css("border-bottom", "4px solid #eff6f3")
  })

  $aboutButton.click(function(){
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
    $contactDiv.fadeToggle(400);
    $workDiv.hide();
    $aboutDiv.hide();
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
})
