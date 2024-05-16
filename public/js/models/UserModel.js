// userModel.js

// usermodel.js
function UserModel(data) {
  this.firstname = data.firstname;
  this.lastname = data.lastname;
  this.email = data.email;
  this.username = data.username;
  this.password = data.password;
  this.dob = data.dob;

  // Add any validation logic here
  console.log("Gets hit 3");
  this.isValid = function () {
    var errors = [];
    if (!this.firstname.trim()) {
      errors.push("First name is required.");
    }
    if (!this.lastname.trim()) {
      errors.push("Last name is required.");
    }
    if (!this.email.trim()) {
      errors.push("Email is required.");
    }

    // Check if there are any errors
    if (errors.length > 0) {
      // Set a property to store validation errors
      this.validationError = errors.join("\n"); // Join errors with newlines
      return false; // Return false if validation fails
    }

    // If no errors, return true (validation successful)
    return true;
  };

  this.toJSON = function () {
    return {
      firstname: this.firstname,
      lastname: this.lastname,
      email: this.email,
      username: this.username,
      password: this.password,
      dob: this.dob,
    };
  };
}

//module.exports = UserModel; // Export the class for use in other files

/*
import Backbone from "backbone";

var UserModel = Backbone.Model.extend({
  defaults: {
    firstname: "",
    lastname: "",
    email: "",
    username: "",
    password: "",
    dob: "",
  },
  validate: function (attrs, options) {
    var errors = [];
    if (!attrs.firstname.trim()) {
      errors.push("First name is required.");
    }
    if (!attrs.lastname.trim()) {
      errors.push("Last name is required.");
    }
    if (!attrs.email.trim()) {
      errors.push("Email is required.");
    }
    // Add more validations as needed
    if (errors.length > 0) {
      return errors;
    }
  },
});

// Export UserModel
//export default UserModel;
window.UserModel = UserModel;
*/
