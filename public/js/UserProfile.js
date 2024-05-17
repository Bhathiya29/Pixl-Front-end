var UserProfile = Backbone.View.extend({
  el: "#user-profile",
  template: _.template(`
<div class="user-info card center-align">
  <div class="card-image">
      <img class="profile-picture circle" src="<%= profilePicture %>" alt="<%= username %>" />
  </div>
  <div class="card-content">
      <p class="full-name"><b><%= fullName %></b></p>
      <p class="username"><b><i>@<%= username %></i></b></p>
      <p class ="bio"><%=bio%></p>
  </div>
  <div class="card-action">
      <button class="btn waves-effect waves-light logout-button">Logout</button>
  </div>
</div>
    `),
  events: {
    "click .logout-button": "logout",
  },

  initialize: function () {
    this.model = new ProfileModel();
    this.listenTo(this.model, "sync", this.render);
    //this.fetchUserData();
  },

  fetchUserData: function () {
    var userName = localStorage.getItem("userName");
    var userId = localStorage.getItem("userId");
    //var self = this;

    console.log("Fetching user data for user: " + userName);

    this.model.fetch({
      url: "http://localhost:8000/api/profile",
      data: { username: userName, userId: userId },
      success: function (model, response) {
        console.log("User data fetched successfully:", response);
      },
      error: function (model, xhr, error) {
        console.error("Failed to fetch user data:", error);
      },
    });
  },

  render: function () {
    this.$el.html(this.template(this.model.toJSON()));
    fullName = this.model.get("fullName");
    profilePicture = this.model.get("profilePicture");
    bio = this.model.get("bio");
    return this;
  },

  logout: function () {
    // Add logout logic here
    localStorage.removeItem("userName");
    localStorage.removeItem("userId");
    window.location.href = "/login";
    window.history.pushState(null, "", "/login");
  },
});
