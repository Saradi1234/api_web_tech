const express = require('express')
const inventoryModel = require("../models/inventory")
const router = express.Router()

router.post('/createInventory', async (req, res) => {
    try {
        const { inventory_id,
            inventory_type,
            item_name,
            available_quantity } = req.body
        if (!inventory_id
            || !inventory_type
            || !item_name
            || !available_quantity) {
            return res.status(401).json({
                message: 'Ivalid request.'
            })
        }
        const newInventory = await inventoryModel.create({
            inventory_id, inventory_type, item_name, available_quantity
        })
        return res.status(200).json(newInventory)
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
})
router.get('/inventory', async (req, res) => {
    try {
        const inventories = await inventoryModel.find()
        res.status(200).json({ data: inventories })
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
})
router.get('/inventory/:inventoryType', async (req, res) => {
    try {
        const inventoryType = req.params.inventoryType
        const inventories = await inventoryModel.find(
            { inventory_type: inventoryType })
        return res.status(200).json(inventories)
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
})
router.put('/:itemName/:availableQuantity', async (req, res) => {
    try {
        // const inventoryType = req.params.inventoryType
        const item = await inventoryModel.find(
            { item_name: req.params.itemName })
        if (item.available_quantity < req.params.availableQuantity) {
            return res.status(200).json({message: "ITEM IS OUT OF STOCK"})
            
        }
        await inventoryModel.updateOne({item_name: req.params.itemName},
            {$set:{available_quantity: (available_quantity - req.params.availableQuantity)}})
        return res.status(200).json({
            newAvailableQuantity: (available_quantity - req.params.availableQuantity)
        })
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
})
module.exports = router