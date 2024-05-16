// Assuming you have an app.js file to handle application initialization:
$(function () {
  // Create and render the UserProfileView instance (replace with appropriate logic)
  var userProfileView = new UserProfile();
  userProfileView.fetchUserData(); // Trigger user data fetching

  //Post Collections
  var postsCollection = new PostsCollection();
  postsCollection.fetchPosts(); // Fetch all posts

  // Create and render the PostListView instance (replace with appropriate logic)
  //var postsView = new PostView({ el: "#posts", collection: postsCollection });
  //postsView.render(); // Render all posts in the collection

  var coursesView = new CoursesView();
  //var postView = new PostView();
});
