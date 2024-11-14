// function will store data
document.getElementById('save-button').addEventListener('click', function() {
    var name = document.getElementById('name').value;
    var email = document.getElementById('email').value;
  
    // store data in LocalStorage
    localStorage.setItem('name', name);
    localStorage.setItem('email', email);
  
    alert("Data Saved!");
  });
  
  // display information on screen when loaded
  window.onload = function() {
    if(localStorage.getItem('name')) {
      document.getElementById('name').value = localStorage.getItem('name');
    }
    if(localStorage.getItem('email')) {
      document.getElementById('email').value = localStorage.getItem('email');
    }
  };
  