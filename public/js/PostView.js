var PostView = Backbone.View.extend({
  tagName: "div",
  className: "post",
  template: _.template(`
      <div class = "social-post">
        <div class="card-content">
          <h5 class="post-username" style="font-size:20px; font-weight:bold">Posted by: @<%= username %></h5>
          <div class= image-container><img class="post-image" src="<%= imageUrl %>" alt="Post image" />
          </div>
          
          <p class="post-caption" style="font-size:18px"><i><%= caption %></i></p>
        </div>
        <div class="card-action">
          <div class="likes">
            <span class="likes-count" style="font-size:18px"><%= likesCount %></span>Likes
            <button class="like-button btn-flat">
            <i class="material-icons">thumb_up</i> 
            </button>
            
          </div>
          <div class="comments">
          <h6><b>Comments</b></h6>
            <% _.each(comments, function(comment) { %>
              <div class="comment">
                <p><%= comment %></p>
              </div>
            <% }); %>
            <form class="new-comment">
              <input type="text" name="commentText" placeholder="Add a comment..." class="comment-input"/>
              <button type="submit" class="btn waves-effect waves-light">Comment</button>
            </form>
          </div>
        </div>
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
    console.log("Updating count locally");
    var likeData = {
      postId: this.model.get("id"),
    };

    var model = this.model; // to overcome the set not defined issue
    // Send the AJAX request
    $.ajax({
      type: "POST",
      url: `http://localhost:8000/api/like?postId=${likeData.postId}`,
      contentType: "application/json", // As server expects JSON
      data: JSON.stringify(likeData),
      success: function (response) {
        // Update the model's likes count with the server response
        if (response.Likes !== undefined) {
          model.set("likesCount", response.Likes);
        }
      },
      error: function (xhr, status, error) {
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
      userID: localStorage.getItem("userId"),
      text: commentText,
    });

    $.ajax({
      type: "POST",
      url: `http://localhost:8000/api/comment?postId=${this.model.id}`,
      contentType: "application/json",
      data: JSON.stringify(newComment),
      success: function (response) {
        console.log("Comment posted successfully Row:", response);
      },
      error: function (xhr, status, error) {
        console.error("Error posting comment:", error);
      },
    });

    this.model.get("comments").push(commentText);
    this.render();
    this.$el.find(".new-comment input[name='commentText']").val("");
  },

  render: function () {
    var template = this.template(this.model.toJSON());
    this.$el.html(template);
    this.$el.find(".likes-count").text(this.model.get("likesCount"));
    return this;
  },
});
