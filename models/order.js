const mongoose = require('mongoose')

const ordersListSchema = new mongoose.Schema({
    customer_id: { type: String, required: true },
    inventory_id: { type: String, required: true },
    item_name: { type: String, required: true },
    quantity: { type: Number, required: true }
})

const ordersListModel = mongoose.model('ordersList', ordersListSchema)

module.exports = ordersListModel