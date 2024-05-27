// Load the logins from localStorage (if any)
// All logins will be stored in localStorage!
syncData();


window.onload = function() {
  document.getElementById('login').addEventListener('click', function(event) {
    event.preventDefault(); // Prevent the form from submitting normally
    login();
  });
};

function checkLogin(email, password) {
  // Check if the email and password match any user in the JSON object
  for (let user of users.logins) {
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
    window.location.href = 'lockers.html';
  } else {
    console.log('Login failed');
    alert('Login failed');
  }
}
