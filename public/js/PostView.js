var PostView = Backbone.View.extend({
  tagName: "div",
  className: "post",
  template: _.template(`
      <h4>Posted by: <%= username %></h4>
      <p><%= caption %></p>
      <img src="<%= imageUrl %>" alt="Post image" />
      <div class="likes">
        <span><%= likesCount %> Likes</span>
        <button class="like-button">Like</button>
      </div>
      <div class="comments">
        <% _.each(comments, function(comment) { %>
          <p><b><%= comment.get("username") %>:</b> <%= comment.get("text") %></p>
        <% }); %>
        <form class="new-comment">
          <input type="text" name="commentText" placeholder="Add a comment..." />
          <button type="submit">Post Comment</button>
        </form>
      </div>
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
    "click .like-button": "likePost",
    "submit .new-comment": "postComment",
    "submit #new-post-form": "createPost",
  },

  initialize: function (options) {
    this.model = new PostModel();
    this.listenTo(this.model, "sync", this.render);
    this.fetchPostData();
  },
  // Fetch data
  fetchPostData: function () {
    console.log("Fetching post data...");

    this.model.fetch({
      url: "http://localhost:8000/api/post?postId=2",
      success: function (model, response) {
        console.log("Posts fetched successfully:", response);
      },
      error: function (model, xhr, error) {
        console.error("Error fetching posts:", error);
      },
    });
  },

  // Increment likes count and update model/server (implement logic)
  likePost: function () {
    // Update likesCount in the model
    this.model.set("likesCount", this.model.get("likesCount") + 1);

    // Implement logic to send like request to the server (using Backbone.sync or custom AJAX)
    // Update likesCount on the server and potentially refetch the post for consistency

    // After successful update, re-render the view
    this.render();
  },

  // Create a new comment, add it to the model's comments array, and send to server (implement logic)
  postComment: function (event) {
    event.preventDefault();

    var commentText = this.$el
      .find(".new-comment input[name='commentText']")
      .val();
    if (!commentText) {
      return; // Handle empty comment
    }

    var newComment = new CommentModel({
      username: "Current User", // Replace with actual username
      text: commentText,
    });

    // Add comment to the model's comments array
    this.model.get("comments").push(newComment);

    // Implement logic to send the comment to the server (using Backbone.sync or custom AJAX)
    // Add comment to the comments table on the server and potentially refetch the post for consistency

    // After successful update, re-render the view to show the new comment
    this.render();

    // Clear the comment input field
    this.$el.find(".new-comment input[name='commentText']").val("");
  },

  createPost: function (event) {
    event.preventDefault();

    var formData = new FormData(this.$el.find("#new-post-form")[0]);

    // Handle image upload logic (implement based on your server-side approach)
    // You might need to use libraries like FileReader or fetch API with FormData

    var caption = formData.get("caption");
    if (!caption) {
      return; // Handle missing caption
    }

    // Implement logic to send the post data (caption and potentially image) to the server
    // This might involve using Backbone.sync or custom AJAX with FormData

    // After successful creation, consider refetching posts or updating the view

    // Clear the form fields
    this.$el.find("#new-post-form input[type='file']").val("");
    this.$el.find("#new-post-form textarea").val("");
  },

  render: function () {
    var template = this.template(this.model.toJSON());
    this.$el.html(template);
    return this;
  },
});
var postView = new PostView({ el: "#post-container" });
postView.render(); // Initial render to show loading message
