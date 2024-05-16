var CourseCollection = Backbone.Collection.extend({
  model: CourseModel,
  url: "http://localhost:8000/api/courses",
});
