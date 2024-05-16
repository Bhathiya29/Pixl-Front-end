var UserProfile = Backbone.View.extend({
  el: "#user-profile",
  template: _.template(`
        <div class="user-info">
            <img src="<%= profilePicture %>" alt="<%= username %>'s profile picture" />
            <p><%= username %></p>
            <p><%= fullName %> </p>
            <button class="logout-button">Logout</button>
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
    return this;
  },

  logout: function () {
    alert("Logout button clicked");
    // Add logout logic here
  },
});
