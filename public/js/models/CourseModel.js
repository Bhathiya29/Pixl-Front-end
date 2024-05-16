var CourseModel = Backbone.Model.extend({
  defaults: {
    courseID: 0,
    courseName: "",
    courseDescription: "",
    courseLink: "",
    coursePrice: 0,
    Image: "",
  },
  toJSON: function () {
    var data = _.clone(this.attributes);
    // You can add custom logic here to format specific attributes for JSON
    return data;
  },
});
