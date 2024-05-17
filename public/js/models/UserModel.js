// userModel.js

function UserModel(data) {
  this.firstname = data.firstname;
  this.lastname = data.lastname;
  this.email = data.email;
  this.username = data.username;
  this.password = data.password;
  this.bio = data.bio;
  this.dob = data.dob;
  this.profilepicture = data.profilepicture;

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
      this.validationError = errors.join("\n"); // Join errors with newlines
      return false;
    }

    return true;
  };

  this.toJSON = function () {
    return {
      firstname: this.firstname,
      lastname: this.lastname,
      email: this.email,
      username: this.username,
      password: this.password,
      bio: this.bio,
      dob: this.dob,
      profilepicture: this.profilepicture,
    };
  };
}
