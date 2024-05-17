var CoursesView = Backbone.View.extend({
  el: "#courses",
  initialize: function () {
    this.collection = new CourseCollection();
    this.listenTo(this.collection, "sync", this.render);
    this.collection.fetch({
      success: function (collection, response, options) {
        console.log("Courses Fetch successful");
      },
      error: function (collection, response, options) {
        console.error("Fetch failed");
      },
    });
  },
  render: function () {
    this.$el.html(`
      <div class="course-header">
        <h5>Learn Skills</h5>
      </div>
    `);
    this.collection.each(function (courses) {
      var courseView = new CourseView({ model: courses });
      this.$el.append(courseView.render().el);
    }, this);
    return this;
  },
});
