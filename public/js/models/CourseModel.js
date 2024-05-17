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
    return data;
  },
});
