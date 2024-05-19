var users;
var storedLogins = localStorage.getItem('logins');

// Get the current user's email
var currentUser = localStorage.getItem('currentUser');
console.log(currentUser);


// Load the logins from localStorage (if any)
if (storedLogins) {
  users = JSON.parse(storedLogins);
  console.log(users);
} else {
  // Use the fetch API to get the JSON file
  fetch('../db/logins.json')
    .then(response => response.json()) // Parse the data as JSON
    .then(data => {
      // Now data is the parsed JSON object from the file
      console.log(data);
      // Go one level deeper to get the array of users
      users = data.logins;
    })
    .catch(error => console.error('Error:', error));
}

// Fill forms on page load
window.onload = function() { getInfo(); }

// Begin the process of updating the user's profile
// Listen for the save button click
document.getElementById('save').addEventListener('click', function(event) {
  event.preventDefault(); // Prevent the form from submitting normally
  if (updateProfile()) {
    // Redirect to the login page
    window.location.href = 'lockers.html';
  } else {
    alert('Email is already in use');
  }
});

// Fill the page with the user's profile information
function getInfo() {
  // Get the current user's email
  let currentUser = localStorage.getItem('currentUser');
  console.log(currentUser);

  // Get the user's profile
  for (let user of users) {
    if (user.email === currentUser) {
      document.getElementById('name').value = user.name;
      document.getElementById('email').value = user.email;
      document.getElementById('bio').value = user.bio;
    }
  }
}

function updateProfile() {
  // Get the form values
  let name = document.getElementById('name').value;
  let password = document.getElementById('password').value;
  let bio = document.getElementById('bio').value;

  // Update the user's profile
  for (let user of users) {
    if (user.email === currentUser) {
      user.name = name;
      user.password = password;
      user.bio = bio;
    }
  }

  // Update the JSON data in localStorage
  localStorage.setItem('logins', JSON.stringify(users));
  return true;
}

function logOut() {
  // Remove the current user from localStorage
  localStorage.removeItem('currentUser');
  window.location.href = 'login.html';
}