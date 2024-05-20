// Variable to get/store users
var users;
var storedLogins = localStorage.getItem('logins');

window.onload = function() {
  document.getElementById('login').addEventListener('click', function(event) {
    event.preventDefault(); // Prevent the form from submitting normally
    login();
  });
};

// If there are logins in localStorage, use them
if (storedLogins) {
  users = JSON.parse(storedLogins);
} else {
  fetch('../db/logins.json')
    .then(response => response.json()) // Parse the data as JSON
    .then(data => {
      // Now data is the parsed JSON object from the file
      console.log(data);
      // Go one level deeper to get the array of users
      users = data;
      // Store the logins in localStorage
      localStorage.setItem('logins', JSON.stringify(users));
    })
    .catch(error => console.error('Error:', error));
}

function checkLogin(email, password) {
  // Check if the email and password match any user in the JSON object
  for (let user of users) {
    if (user.email === email && user.password === password) {
      // Store the current user's email in localStorage
      localStorage.setItem('currentUser', email);
      return true; // Login successful
    }
  }
  return false; // Login failed
}

function login(){// Usage
  let email = document.getElementById('email').value;
  let password = document.getElementById('password').value;
  if (checkLogin(email, password)) {
    console.log('Login successful');
    window.location.href = 'index.html';
  } else {
    console.log('Login failed');
    alert('Login failed');
  }
}
