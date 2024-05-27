function syncData(){
  let users;
  let storedLogins = localStorage.getItem('logins');

  // Get the current user's email
  let currentUser = localStorage.getItem('currentUser');
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
}
