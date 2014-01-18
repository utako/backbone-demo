window.Todo.Views.TodosShow = Backbone.View.extend({
  template: JST["todos/show"],

  initialize: function (options) {
    this.listenTo(this.model, "sync", this.render);
    this.listenTo(this.model.comments(), "sync add remove", this.render);
  },

  render: function () {
    var renderedContent = this.template({
      todo: this.model
    });

    this.$el.html(renderedContent);

    // even more building view objects inside #render...
    this.model.comments().each(function (comment) {
      var commentsShowView = new Todo.Views.CommentsShow({
        model: comment
      });

      this.$(".comments").append(commentsShowView.render().$el);
    });

    var commentNewView = new Todo.Views.CommentsNew({
      todo: this.model
    });
    this.$(".comment-new").html(commentNewView.render().$el);

    return this;
  }
});
