var PostsView = Backbone.View.extend({
  el: "#posts-container",

  initialize: function () {
    this.collection = new PostsCollection();
    this.listenTo(this.collection, "sync", this.render);
    this.collection.fetchPosts();
  },

  render: function () {
    this.$el.empty();
    this.collection.each(this.addPost, this);
    return this;
  },

  addPost: function (posts) {
    var postView = new PostView({ model: posts });
    this.$el.append(postView.render().el);
  },
});

var postsView = new PostsView();
