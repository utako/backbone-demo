window.Todo = {
  Models: {},
  Collections: {},
  Routers: {},
  Views: {},

  initialize: function () {
    // just sets up the routes
    new Todo.Routers.AppRouter();
    // start listening to changes to the location
    Backbone.history.start();
  }
};

Backbone.CompositeView = Backbone.View.extend({
  addSubview: function (selector, subview) {
    var selectorSubviews =
      this.subviews()[selector] || (this.subviews()[selector] = []);

    selectorSubviews.push(subview);

    var $selectorEl = this.$(selector);
    $selectorEl.append(subview.$el);
  },

  remove: function () {
    Backbone.View.prototype.remove.call(this);

    // remove all subviews as well
    _(this.subviews()).each(function (selectorSubviews, selector) {
      _(selectorSubviews).each(function (subview){
        subview.remove();
      });
    });
  },

  removeSubview: function (selector, subview) {
    var selectorSubviews =
      this.subviews()[selector] || (this.subviews()[selector] = []);

    var subviewIndex = selectorSubviews.indexOf(subview);
    selectorSubviews.splice(subviewIndex, 1);
    subview.remove();
  },

  renderSubviews: function () {
    var view = this;
    
    _(this.subviews()).each(function (selectorSubviews, selector) {
      var $selectorEl = view.$(selector);
      $selectorEl.empty();

      _(selectorSubviews).each(function (subview) {
        $selectorEl.append(subview.render().$el);
        subview.delegateEvents();
      });
    });
  },

  subviews: function () {
    if (!this._subviews) {
      this._subviews = {};
    }

    return this._subviews;
  }
});

Backbone.TableView = Backbone.CompositeView.extend({
  rowSubviewClass: null,

  events: {
    "click th": "resort"
  },

  initialize: function () {
    this.sortCol = null;

    this.listenTo(this.collection, "add", this.addRowSubview);

    this.collection.each(this.addRowSubview.bind(this));
  },

  addRowSubview: function (model) {
    var rowSubview = new this.rowSubviewClass({
      model: model
    });

    this.addSubview("tbody", rowSubview);
    rowSubview.render();
  },

  resort: function (event) {
    this.sortCol = $(event.currentTarget).data("col");
    this._sortRowSubviews();
    this.renderSubviews();
  },

  _sortRowSubviews: function () {
    var tableView = this;
    
    var rowSubviews = this.subviews()["tbody"];
    rowSubviews.sort(function (rowView1, rowView2) {
      var val1 = rowView1.model.get(tableView.sortCol);
      var val2 = rowView2.model.get(tableView.sortCol);

      if (val1 < val2) {
        return -1;
      } else if (val1 == val2) {
        return 0;
      } else {
        return 1;
      }
    });
  }
});

$(Todo.initialize);
