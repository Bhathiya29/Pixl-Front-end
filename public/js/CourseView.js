var CourseView = Backbone.View.extend({
  tagName: "div",
  className: "course",
  template: _.template($("#course-template").html()),

  render: function () {
    this.$el.html(this.template(this.model.toJSON()));
    return this;
  },
});
