// signup.js
//const UserModel = require("../models/UserModel");

document.addEventListener("DOMContentLoaded", function () {
  // Handle form submission

  document
    .getElementById("signup-form")
    .addEventListener("submit", function (event) {
      event.preventDefault(); // Prevent default form submission

      // Collect form data
      console.log("Hitting here1");
      var formData = {
        firstname: document.getElementById("firstname").value,
        lastname: document.getElementById("lastname").value,
        email: document.getElementById("email").value,
        username: document.getElementById("username").value,
        password: document.getElementById("password").value,
        bio: document.getElementById("bio").value,
        dob: document.getElementById("dob").value,
        profilepicture: document.getElementById("profilepicture").value,
      };

      // Validate the email
      var email = formData.email;
      if (!email || !/\S+@\S+\.\S+/.test(email)) {
        alert("Invalid email address.");
        //clear all fields
        document.getElementById("firstname").value = "";
        document.getElementById("lastname").value = "";
        document.getElementById("email").value = "";
        document.getElementById("username").value = "";
        document.getElementById("password").value = "";
        document.getElementById("bio").value = "";
        document.getElementById("dob").value = "";
        document.getElementById("profilepicture").value = "";
        return;
      }

      // Instantiate UserModel
      console.log("Htting here2");
      //var user = new window.UserModel(formData);
      var user = new UserModel(formData); // Now UserModel is defined

      // Validate the model
      //var errors = user.validate();

      // Validate the model
      if (!user.isValid()) {
        // Display validation errors
        alert(user.validationError);
        return;
      }

      /*
      if (errors) {
        // Display validation errors
        alert(errors.join("\n"));
        return;
      }*/

      // Send AJAX request to backend
      fetch("http://localhost:8000/api/signup", {
        //mode: "no-cors",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user.toJSON()), // Send UserModel JSON data
      })
        .then((response) => {
          console.log(response.statusCode);
          if (response.ok) {
            //alert("Signup successful!"); // Success message
            return response.json(); // Parse response JSON
          } else {
            throw new Error("Signup failed."); // Error message
          }
        })
        .then((data) => {
          if (data.message === "Signup successful") {
            // Handle response data (if needed)
            console.log(data);
            alert("Signup successful!"); // Success message
            // Redirect to login page or any other page
            window.location.href = "/login";
          }
        })
        .catch((error) => {
          console.error("Error:", error);
          alert("Signup failed. Please try again."); // Error message
        });
    });
});
