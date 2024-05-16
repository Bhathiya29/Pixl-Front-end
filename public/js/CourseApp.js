(function (Backbone, $) {
  // Model (combines CourseModel and CourseCollection logic)
  var Course = Backbone.Model.extend({
    urlRoot: "http://localhost:8000/api/courses", // Adjust URL based on your CodeIgniter routes

    initialize: function () {
      this.fetch({
        success: function (model, response) {
          this.trigger("coursesFetched", response);
        },
        error: function (model, xhr) {
          console.error("Error fetching courses:", xhr.statusText);
        },
      });
    },
  });
  // View (combines CoursesView and CourseView logic)
  var AppView = Backbone.View.extend({
    el: "#courses", // Adjust selector as needed

    template: _.template($("#courseTemplate").html()), // Pre-compile template

    events: {
      coursesFetched: "renderCourses",
    },

    initialize: function () {
      this.courseCollection = new Course();
      this.listenTo(
        this.courseCollection,
        "coursesFetched",
        this.renderCourses
      );
    },

    renderCourses: function (courses) {
      var html = "";
      courses.forEach(function (course) {
        html += this.template(course.toJSON());
      }, this);
      this.$el.html(html);
    },
  });

  // Instantiate the view to trigger data fetching
  var appView = new AppView();
})(Backbone, jQuery);
