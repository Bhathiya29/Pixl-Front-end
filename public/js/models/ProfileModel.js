var ProfileModel = Backbone.Model.extend({
  // Define default attributes for the model
  defaults: {
    username: "",
    profilePicture: "",
    firstName: "",
    lastName: "",
    bio: "",
  },

  // Parse the response to handle the data structure
  parse: function (response) {
    return {
      username: response.username,
      profilePicture: response.profile_pic,
      firstName: response.firstname,
      lastName: response.lastname,
      fullName: response.firstname + " " + response.lastname,
      bio: response.bio,
    };
  },
});
