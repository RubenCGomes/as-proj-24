// Variable to get/store users
var users;

// Listen for the sign-up button click
window.onload = function() {
  document.getElementById('sign-up').addEventListener('click', function(event) {
    event.preventDefault(); // Prevent the form from submitting normally
    signUp();
  });
};

// Use the fetch API to get the JSON file
fetch('../db/logins.json')
  .then(response => response.json()) // Parse the data as JSON
  .then(data => {
    // Now data is the parsed JSON object from the file
    console.log(data);
    // Go one level deeper to get the array of users
    users = data;
  })
  .catch(error => console.error('Error:', error));


function signUp() {
  // Get the form values
  let name = document.getElementById('name').value;
  let email = document.getElementById('email').value;
  let password = document.getElementById('password').value;

  // Check if the email is already in use
  for (let user of users.logins) {
    if (user.email === email) {
      return false; // Email is already in use
    }
  }

  // Add the new user to the JSON object
  users.logins.push({email: email, password: password, name: name, isAdmin: false});
  console.log(users.logins);

  // Update the JSON data in localStorage
  localStorage.setItem('logins', JSON.stringify(users.logins));

  // Use the fetch API to get the JSON file
  fetch('../db/logins.json')
  .then(response => response.json()) // Parse the data as JSON
  .then(data => {
    // Now data is the parsed JSON object from the file
    console.log(data);
    // Go one level deeper to get the array of users
    users = data.logins;

    // Load the logins from localStorage (if any)
    let storedLogins = localStorage.getItem('logins');
    if (storedLogins) {
      users.logins = JSON.parse(storedLogins);
      console.log(users.logins);
    }

  })
  .catch(error => console.error('Error:', error));

}