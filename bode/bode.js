subInput = document.getElementById('sub_input');

subInput.onfocus = function(){
  this.placeholder = ""
}

subInput.onblur = function(){
  this.placeholder = "subscribe"
}
