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
    //var newLikesCount = this.model.get("likesCount") + 1;
    //this.model.set("likesCount", newLikesCount);
    //this.model.set("likesCount", this.model.get("likesCount") + 1);
    console.log("Updating count locally");
    //console.log("Like Method called");
    var likeData = {
      postId: this.model.get("id"),
    };

    var model = this.model; // to overcome the set not defined issue
    // Send the AJAX request
    $.ajax({
      type: "POST",
      url: `http://localhost:8000/api/like?postId=${likeData.postId}`,
      contentType: "application/json", // Optional if the server expects JSON
      data: JSON.stringify(likeData), // Optional if sending data as JSON
      success: function (response) {
        console.log("Like updated successfully:", response);

        // Update the model's likes count with the server response (if provided)
        if (response.Likes !== undefined) {
          model.set("likesCount", response.Likes);
        }

        // Trigger a custom event to notify the view about the like update (optional)
        //this.trigger("like:updated", response); // Pass the response data
      },
      error: function (xhr, status, error) {
        console.error("Error updating like:", error);
        // Handle errors (e.g., display error message to the user)
        // You can potentially revert the local likes count update here (if done earlier)
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
