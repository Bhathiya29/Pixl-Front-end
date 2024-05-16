var CourseView = Backbone.View.extend({
  tagName: "div",
  className: "course",
  template: _.template($("#course-template").html()), // Assuming you have an Underscore template with id 'course-template'

  render: function () {
    this.$el.html(this.template(this.model.toJSON()));
    return this;
  },
});
