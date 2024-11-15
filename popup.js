// save data to localStorage when the save button is clicked
  document.getElementById('save-button').addEventListener('click', function() {
 // get the values from the input fields
  var name = document.getElementById('name').value;
  var email = document.getElementById('email').value;
  var certificates = document.getElementById('certificates').value;
  var portfolio = document.getElementById('portfolio').value;
  var summary = document.getElementById('summary').value;

  // store the data in localStorage
  localStorage.setItem('name', name);
  localStorage.setItem('email', email);
  localStorage.setItem('certificates', certificates);
  localStorage.setItem('portfolio', portfolio);
  localStorage.setItem('summary', summary);

  // show a confirmation message to the user
  alert("Data Saved!");
});

  // load the data from localStorage when the page is loaded
  window.onload = function() {
  // check if there is data in localStorage for each field and load it into the form
  if (localStorage.getItem('name')) {
    document.getElementById('name').value = localStorage.getItem('name');
  }
  if (localStorage.getItem('email')) {
    document.getElementById('email').value = localStorage.getItem('email');
  }
  if (localStorage.getItem('certificates')) {
    document.getElementById('certificates').value = localStorage.getItem('certificates');
  }
  if (localStorage.getItem('portfolio')) {
    document.getElementById('portfolio').value = localStorage.getItem('portfolio');
  }
  if (localStorage.getItem('summary')) {
    document.getElementById('summary').value = localStorage.getItem('summary');
  }
};
