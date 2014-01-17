window.Todo.Views.TodosIndex = Backbone.View.extend({
  template: JST["todos/index"],
  
  events: {
    "click button.refresh": "refresh"
  },

  refresh: function () {
    var view = this;
    
    this.collection.fetch({
      success: function () { view.render() }
    });
  },

  render: function () {
    var renderedContent = this.template({
      todos: this.collection
    });

    this.$el.html(renderedContent);

    return this;
  }
});
