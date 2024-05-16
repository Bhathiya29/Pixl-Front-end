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
  `),
  events: {
    "click .like-button": "likePost",
    "submit .new-comment": "postComment",
  },

  initialize: function () {
    this.listenTo(this.model, "change", this.render);
  },

  likePost: function () {
    //var newLikesCount = this.model.get("likesCount") + 1;
    //this.model.set("likesCount", newLikesCount);
    this.model.set("likesCount", this.model.get("likesCount") + 1);
    console.log("Updating count locally");
    //console.log("Like Method called");
    this.model.save(null, {
      url: `http://localhost:8000/api/like?postId=${this.model.id}`,
      success: function (model, response) {
        console.log("Like updated successfully:", response);
        model.set("likesCount", response.Likes);
      },
      error: function (model, xhr, error) {
        console.error("Error updating like:", error);
      },
    });

    this.render();
  },

  postComment: function (event) {
    event.preventDefault();

    var commentText = this.$el
      .find(".new-comment input[name='commentText']")
      .val();
    if (!commentText) {
      return;
    }

    var newComment = new CommentModel({
      username: "Current User", // Replace with actual username
      text: commentText,
    });

    this.model.get("comments").push(newComment);

    this.model.save(null, {
      url: `http://localhost:8000/api/comment?postId=${this.model.id}`,
      success: function (model, response) {
        console.log("Comment posted successfully:", response);
      },
      error: function (model, xhr, error) {
        console.error("Error posting comment:", error);
      },
    });

    this.render();
    this.$el.find(".new-comment input[name='commentText']").val("");
  },

  render: function () {
    var template = this.template(this.model.toJSON());
    this.$el.html(template);
    return this;
  },
});
