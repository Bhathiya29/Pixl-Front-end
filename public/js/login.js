// login.js

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

      // Instantiate LoginModel
      console.log("Hitting here2");
      var user = new LoginModel(formData);

      if (!user.isValid()) {
        // Display validation errors
        alert(user.validationError);
        return;
      }

      // Send AJAX request to backend
      fetch("http://localhost:8000/api/login", {
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
          // Handling response data
          if (data && data.message === "Login successful") {
            const userId = data.userId;
            const userName = data.userName;

            // Store user ID and UserName in local storage
            localStorage.setItem("userId", userId);
            localStorage.setItem("userName", userName);

            // Redirect to feed after successful login
            window.location.href = "/feed";
          } else {
            throw new Error(data.error || "Invalid username or password."); // Error message for invalid credentials
          }
        })
        .catch((error) => {
          console.error("Error:", error);
          alert("Login failed. Please check Credentials."); // Error message
          document.getElementById("username").value = ""; // Clear username field
          document.getElementById("password").value = ""; // Clear password field
        });
    });
});
