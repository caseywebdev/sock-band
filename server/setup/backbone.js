var Backbone = require('backbone');

Backbone.sync = function (method, model, options) {
  var isModel = model instanceof Backbone.Model;
  var table = model.table || model.model.prototype.table;
  var query;
  var select = options.select || [table.star()];
  var where =
    options.where !== void 0 ?
    options.where :
    model.id ? table.id.equals(model.id) : null;
  var order = options.order;
  var limit = isModel ? 1 : options.limit;
  var offset = options.offset;

  switch (method) {

  // INSERT
  case 'create':
    query = table.insert(model.attributes).returning(table.star());
    break;

  // SELECT
  case 'read':
    var from = table;
    if (!isModel && model.owner) {
      var via = model;
      var owner = via.owner;
      var fk = via.fk;
      var leftTable = table;
      var rightTable;
      while (via = via.via) {
        rightTable = via.model.prototype.table;
        var rightKey = rightTable[fk] || rightTable.id;
        var leftKey = leftTable[fk] || leftTable.id;
        from = from.join(rightTable).on(rightKey.equals(leftKey));
        owner = via.owner;
        fk = via.fk;
        leftTable = rightTable;
      }
      rightTable = owner.table;
      from = from.join(rightTable).on(leftTable[fk].equals(owner.id));
    }
    query = table.select.apply(table, select).from(from);
    if (where) query = query.where(where);
    if (!isModel) query = query.group(table.id);
    if (order) query = query.order.apply(query, order);
    if (limit) query = query.limit(limit);
    if (offset) query = query.offset(offset);
    break;

  // UPDATE
  case 'update':
  case 'patch':
    query = table.update(options.attrs || model.attributes);
    if (where) query = query.where(where);
    query = query.returning(table.star());
    break;

  // DELETE
  case 'delete':
    query = table['delete']();
    if (where) query = query.where(where);
  }

  // Grab a pg connection from the pool and run the query.
  pg.query(query.toQuery(), function (er, res) {
    if (er) {
      options.error(er);
      if (options.cb) options.cb(er, model, null, options);
    } else {
      options.success(res = isModel ? res.rows[0] || {} : res.rows);
      if (options.cb) options.cb(null, model, res, options);
    }
  });
};
