var CreatePostView = Backbone.View.extend({
  el: "#create-post-container",
  template: _.template(`
      <div class="new-post-form">
        <h5>Create a New Post</h5>
        <form id="new-post-form">
          <input type="file" name="imageFile" accept="image/*" required>
          <label for="imageFile">Choose Image</label>
          <textarea name="caption" placeholder="Write a caption..." required></textarea>
          <button type="submit">Create Post</button>
        </form>
      </div>
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
    var imageFile = formData.get("imageFile");

    if (!caption || !imageFile) {
      return;
    }

    var self = this;
    $.ajax({
      url: "http://localhost:8000/api/upload",
      type: "POST",
      data: formData,
      contentType: false,
      processData: false,
      success: function (response) {
        var newPost = new PostModel({
          username: "Current User", // Replace with actual username
          caption: caption,
          imageUrl: response.imageUrl,
          likesCount: 0,
          comments: [],
        });

        newPost.save(null, {
          success: function (model, response) {
            console.log("Post created successfully:", response);
            postsView.collection.add(newPost);
            postsView.render();
          },
          error: function (model, xhr, error) {
            console.error("Error creating post:", error);
          },
        });
      },
      error: function (xhr, status, error) {
        console.error("Error uploading image:", error);
      },
    });

    this.$el.find("#new-post-form input[type='file']").val("");
    this.$el.find("#new-post-form textarea").val("");
  },

  render: function () {
    this.$el.html(this.template());
    return this;
  },
});

var createPostView = new CreatePostView();
