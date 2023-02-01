const express = require('express')
const customerModel = require("../models/customer")
const router = express.Router()

router.post('/createCustomer', async (req, res) => {
    try {
        const { customer_id, customer_name, email } = req.body
        if (!customer_id || !customer_name || !email) {
            return res.status(401).json({
                message: 'Invalid request.'
            })
        }
        const newUser = await customerModel.create({
            customer_id, customer_name, email
        })
        return res.status(200).json(newUser)
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
})

router.get('/customerDetails', async(req, res)=>{
    try {
       const customers = await customerModel.find() 
       res.status(200).json({data: customers})
    } 
    catch (error) {
        res.status(500).json({ message: error.message })
    }
})

module.exports = router