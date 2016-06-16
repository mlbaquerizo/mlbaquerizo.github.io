function formHasEmptyFields() {
  var errors = false;
  $('.email-form-input').trigger('blur');
    if(emptyFieldVal($('.email-form-input').val())){
      errors = true;
    } else {
      errors = false;
    }
  return errors;
}

function formHasIncorrectEmail() {
  var errors = false;
  $('#email').trigger('blur');
    if(!emailVal($('#email').val())){
      errors = true;
    } else {
      errors = false;
    }
  return errors;
}

function emptyFieldVal(fieldVal) {
  return fieldVal.trim() === ''
}

function emailVal(email) {
  var emailRegex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
  return emailRegex.test(email);
}

// get all data in form and return object
function getFormData() {
  var elements = document.getElementById("contact-form").elements; // all form elements
  var fields = Object.keys(elements).map(function(k) {
    if(elements[k].name !== undefined) {
      return elements[k].name;
    }
  })
  fields = fields.filter(function(item, pos, self) {
    return self.indexOf(item) == pos && item;
  });
  var data = {};
  fields.forEach(function(k){
    data[k] = elements[k].value;
  });
  console.log(data);
  return data;
}

function handleFormSubmit(event) {
  event.preventDefault();
  // get the values submitted in the form
  var data = getFormData();
  // if email is not valid show error
  if( formHasEmptyFields() || formHasIncorrectEmail() ) {
    var message = 'Your message could not be received. Please enter valid data and try again.'
    document.getElementById('after-submit').style.display = 'block';
    document.getElementById('after-submit').innerHTML = message
    return false;
  } else {
    var url = event.target.action;
    var xhr = new XMLHttpRequest();
    xhr.open('POST', url);
    // xhr.withCredentials = true;
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.onreadystatechange = function() {
        console.log( xhr.status, xhr.statusText )
        console.log(xhr.responseText);
        var message = 'Your message has been received! I\'ll get back to you as soon as I can!'
        document.getElementById('after-submit').style.display = 'block';
        document.getElementById('after-submit').innerHTML = message
        return;
    };
    // url encode form data for sending as post data
    var encoded = Object.keys(data).map(function(k) {
        return encodeURIComponent(k) + '=' + encodeURIComponent(data[k])
    }).join('&')
    xhr.send(encoded);
    document.getElementById('contact-form').reset();
  }
}
function loaded() {
  // console.log('contact form submission handler loaded successfully');
  // bind to the submit event of form
  var form = document.getElementById('contact-form');
  form.addEventListener("submit", handleFormSubmit, false);
};
document.addEventListener('DOMContentLoaded', loaded, false);
