window.Todo.Views.TodosShow = Backbone.View.extend({
  template: JST["todos/show"],

  initialize: function (options) {
    this.listenTo(this.model, "sync", this.render);
  },

  render: function () {
    var renderedContent = this.template({
      todo: this.model,
      // comments: this.comments
    });

    this.$el.html(renderedContent);

    return this;
  }
});
