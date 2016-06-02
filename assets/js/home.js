$(document).ready(function(){

  $aboutButton = $('button[name="about"]')
  $aboutDiv = $('div[id="content-about"]')
  $workButton = $('button[name="work"]')
  $workDiv = $('div[id="content-work"]')
  $contactButton = $('button[name="contact"]')
  $contactDiv = $('div[id="content-contact"]')

  $aboutButton.hover(function(){
    $(this).css("border-bottom", "4px solid #3BC094")
  }, function(){
    $(this).css("border-bottom", "4px solid #eff6f3")
  })

  $aboutButton.click(function(){
    $aboutDiv.toggle();
    $workDiv.hide();
    $contactDiv.hide();
  })

  $workButton.hover(function(){
    $(this).css("border-bottom", "4px solid #6B95BF")
  }, function(){
    $(this).css("border-bottom", "4px solid #eff6f3")
  })

  $workButton.click(function(){
    $workDiv.toggle();
    $aboutDiv.hide();
    $contactDiv.hide();
  })

  $contactButton.hover(function(){
    $(this).css("border-bottom", "4px solid #E91E63")
  }, function(){
    $(this).css("border-bottom", "4px solid #eff6f3")
  })

  $contactButton.click(function(){
    $contactDiv.toggle();
    $workDiv.hide();
    $aboutDiv.hide();
  })

})
