window.Todo.Views.CommentsShow = Backbone.View.extend({
  attributes: function () {
    return {
      "data-id": this.model.get("id")
    };
  },
  
  template: function () {
    return this.open ? JST["comments/edit"] : JST["comments/show"];
  },

  events: {
    "click button.destroy": "destroy",
    "dblclick div.content": "beginEditing",
    "submit form.comment": "endEditing",
    "move": "moveComment"
  },

  initialize: function (options) {
    this.open = false;

    this.listenTo(this.model, "change", this.render);
  },

  beginEditing: function () {
    this.open = true;
    this.render();
  },

  endEditing: function (event) {
    event.preventDefault();

    this.open = false;

    var content = this.$("textarea.comment_content").val();
    this.model.save({ content: content });

    this.render();
  },

  moveComment: function () {
    var todo =
      Todo.Collections.todos.get(this.model.get("todo_id"));

    var prevId = this.$el.prev().data("id");
    var nextId = this.$el.next().data("id");

    var prevModel = todo.comments().get(prevId);
    var nextModel = todo.comments().get(nextId);

    var newOrderNum;
    if (prevModel == null) {
      // moved to the first position
      newOrderNum = nextModel.get("order_num") - 1;
    } else if (nextModel == null) {
      // moved to the last position
      newOrderNum = prevModel.get("order_num") + 1;
    } else {
      newOrderNum =
        (prevModel.get("order_num") + nextModel.get("order_num")) / 2;
    }

    this.model.save({ order_num: newOrderNum });
  },

  render: function () {
    var renderedContent = this.template()({
      comment: this.model
    });

    this.$el.html(renderedContent);
    
    return this;
  },

  destroy: function () {
    this.model.destroy();
  }
});
