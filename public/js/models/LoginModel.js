// loginmodel.js

function LoginModel(data) {
  this.username = data.username;
  this.password = data.password;

  // Add any validation logic here
  this.isValid = function () {
    var errors = [];
    if (!this.username.trim()) {
      errors.push("Username or Email is required.");
    }
    if (!this.password.trim()) {
      errors.push("Password is required.");
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
      username: this.username,
      password: this.password,
    };
  };
}

//module.exports = LoginModel;
