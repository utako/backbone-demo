window.Todo.Views.TodosShow = Backbone.CompositeView.extend({
  template: JST["todos/show"],

  initialize: function (options) {
    this.listenTo(this.model, "sync", this.render);
    this.listenTo(this.model.comments(), "add", this.addComment);

    var commentNewView = new Todo.Views.CommentsNew({
      todo: this.model
    });
    this.addSubview(".comment-new", commentNewView);
  },

  addComment: function (comment) {
    var commentsShowView = new Todo.Views.CommentsShow({
      model: comment
    });
    
    this.addSubview(".comments", commentsShowView);
    commentsShowView.render();
  },

  render: function () {
    var renderedContent = this.template({
      todo: this.model
    });

    this.$el.html(renderedContent);
    this.renderSubviews();

    return this;
  }
});
