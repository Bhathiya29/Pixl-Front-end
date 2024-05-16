var PostsCollection = Backbone.Collection.extend({
  url: "http://localhost:8000/api/posts", // Updated URL to fetch all posts
  model: PostModel,

  fetchPosts: function () {
    this.fetch({
      success: function (collection, response) {
        console.log("Successfully fetched posts:", response);
      },
      error: function (collection, error) {
        console.error("Error fetching posts:", error);
      },
    });
  },
});
