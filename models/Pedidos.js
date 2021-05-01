var mongoose = require('mongoose');

var PedidosSchema = new mongoose.Schema({
  id: String,
  itemId: String,
  itemName: String,
  itemPrice: Number,
  itemQty: Number,
  totalPrice: String,
  updated: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Pedidos', PedidosSchema);