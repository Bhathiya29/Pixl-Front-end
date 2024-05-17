var CreatePostView = Backbone.View.extend({
  el: "#create-post-container",
  template: _.template(`
  <form id="new-post-form">
  <h5 style="font-size:20px; font-weight:bold; margin:0;">Create a New Post on PIXL</h5>
      <textarea name="image" placeholder="Enter image URL" required></textarea>
      <textarea name="caption" placeholder="Write a caption..." required></textarea>
      <button type="submit">Create Post</button>
    </form>
`),

  events: {
    "submit #new-post-form": "createPost",
  },

  initialize: function () {
    this.render();
  },

  createPost: function (event) {
    event.preventDefault();

    var formData = new FormData(this.$el.find("#new-post-form")[0]);

    var caption = formData.get("caption");
    var imageFile = formData.get("image");

    if (!caption || !imageFile) {
      alert("Caption and image url are required!");
      return;
    }

    var userId = localStorage.getItem("userId");
    var userName = localStorage.getItem("userName");

    var data = {
      caption: caption,
      image: imageFile,
      userID: userId,
      userName: userName,
    };

    if (!caption || !imageFile || !userId || !userName) {
      return;
    }

    var self = this;
    $.ajax({
      url: "http://localhost:8000/api/create",
      contentType: "application/json",
      type: "POST",
      data: JSON.stringify(data),
      success: function (response) {
        var newPost = new PostModel({
          id: response.PostID,
          username: response.UserName,
          caption: caption,
          imageUrl: response.Image || "",
          likesCount: 0,
          comments: [],
        });

        postsView.collection.unshift(newPost);
        postsView.render();

        //clear the form fields
        self.$el.find("#new-post-form input[type='file']").val("");
        self.$el.find("#new-post-form textarea").val("");
      },
      error: function (xhr, status, error) {
        console.error("Error uploading image:", error);
      },
    });
  },

  render: function () {
    this.$el.html(this.template());
    return this;
  },
});

var createPostView = new CreatePostView();
