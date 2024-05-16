// login.js
//const LoginModel = require("../models/LoginModel"); // Assuming LoginModel exists

document.addEventListener("DOMContentLoaded", function () {
  // Handle form submission

  document
    .getElementById("login-form")
    .addEventListener("submit", function (event) {
      event.preventDefault(); // Prevent default form submission

      // Collect form data
      console.log("Hitting here1");
      var formData = {
        username: document.getElementById("username").value,
        password: document.getElementById("password").value,
      };

      // Instantiate LoginModel (Assuming LoginModel exists)
      console.log("Hitting here2");
      var user = new LoginModel(formData); // Update with your LoginModel

      // Validate the model (if needed) - Implement validation logic in LoginModel

      if (!user.isValid()) {
        // Display validation errors
        alert(user.validationError);
        return;
      }

      // Send AJAX request to backend
      fetch("http://localhost:8000/api/login", {
        // Replace with your login API endpoint
        //mode: "no-cors",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user.toJSON()), // Send LoginModel JSON data
      })
        .then((response) => {
          console.log(response);
          if (response.ok) {
            return response.json(); // Parse response JSON
          } else {
            throw new Error("Login failed."); // Error message
          }
        })
        .then((data) => {
          // Handle response data (e.g., successful login, redirect)
          if (data && data.message === "Login successful") {
            const userId = data.userId;
            const userName = data.userName;

            // Store user ID and UserName in local storage
            localStorage.setItem("userId", userId);
            localStorage.setItem("userName", userName);

            alert(
              "Login successful! UserID: " + userId + ", Username: " + userName
            ); // Success message
            // Redirect to dashboard or any other page after successful login
            window.location.href = "/feed";
          } else {
            throw new Error(data.error || "Invalid username or password."); // Error message for invalid credentials
          }

          // Redirect to dashboard or any other page after successful login
        })
        .catch((error) => {
          console.error("Error:", error);
          alert("Login failed. Please try again."); // Error message
        });
    });
});
