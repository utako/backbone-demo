window.Todo.Views.TodosIndex = Backbone.View.extend({
  template: JST["todos/index"],
  
  events: {
    "click button.refresh": "refresh"
  },

  initialize: function (options) {
    this.listenTo(
      this.collection,
      "sync add",
      this.render
    );
  },

  refresh: function () {
    this.collection.fetch();
  },

  render: function () {
    var renderedContent = this.template({
      todos: this.collection
    });

    this.$el.html(renderedContent);

    return this;
  }
});
