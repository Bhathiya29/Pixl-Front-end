var PostModel = Backbone.Model.extend({
  defaults: {
    username: "",
    caption: "",
    imageUrl: "",
    likesCount: 0,
    comments: [], // Array of CommentModel objects
  },

  // Override to handle potential server response variations
  parse: function (response) {
    return {
      username: response.UserName,
      caption: response.Caption,
      image: response.Image,
      likesCount: response.Likes || 0,
      comments: response.comments
        ? _.map(response.comments, function (comment) {
            return new CommentModel(comment); // Convert comments to CommentModel instances
          })
        : [],
    };
  },
});
