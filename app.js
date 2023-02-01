const express = require('express')

const customerRoutes=require("./routes/customerRoutes")
const inventoryRoutes=require("./routes/inventoryRoutes")
const ordersRoutes=require("./routes/ordersRoutes")

const cors = require('cors')

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())


app.use(customerRoutes)
app.use(inventoryRoutes)
app.use(ordersRoutes)


app.get('/', (req, res) => {
    res.send("All Ok.")
})

module.exports = app