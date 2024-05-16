var PostsCollection = Backbone.Collection.extend({
  url: "http://localhost:8000/api/post?postId=2",
  model: PostModel, // Specifies the model used by the collection

  // Fetch all posts (implement any filtering/sorting logic if needed)
  // (Optional) Function to fetch posts from the server
  fetchPosts: function () {
    this.fetch({
      success: function (collection, response) {
        console.log("Successfully fetched posts:", response);
        // Handle successful fetch (e.g., render posts)
      },
      error: function (collection, error) {
        console.error("Error fetching posts:", error);
      },
    });
  },
});
