var PostModel = Backbone.Model.extend({
  defaults: {
    PostID: "",
    UserID: "",
    UserName: "",
    Caption: "",
    Image: "",
    Date: "",
    Likes: 0,
    Comments: [], // Array of CommentModel objects
  },

  parse: function (response) {
    return {
      id: response.PostID,
      username: response.UserName,
      caption: response.Caption,
      imageUrl: response.Image,
      likesCount: response.Likes || 0,
      comments: response.comments
        ? _.map(response.comments, function (comment) {
            return new CommentModel(comment);
          })
        : [],
    };
  },
});
