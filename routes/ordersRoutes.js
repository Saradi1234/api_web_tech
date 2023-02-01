const express = require('express')
const ordersListModel = require("../models/order")
const router = express.Router()

router.post('/createOrders', async (req, res) => {
    try {
        const { customer_id, inventory_id, item_name, quantity } = req.body
        if (!customer_id || !inventory_id || !item_name || !quantity) {
            return res.status(401).json({
                message: 'Invalid request.'
            })
        }
        const newOrder = await ordersListModel.create({
            customer_id, inventory_id, item_name, quantity
        })
        return res.status(200).json(newOrder)
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
})

router.get('/orders', async (req, res) => {
    try {
        const orders = await ordersListModel.find()
        res.status(200).json({ data: orders })
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
})

module.exports = router