const Order = require("../Modals/Schema/OrderSchema")

//View all orders page
exports.allOrders = async (rea,res) => {
    try{
        const orders = await Order.find({})
        res.status(200).json(orders)
    }catch(error){
        res.status(500).send('Server Error')
    }
}

//Order details page
exports.orderDetails = async (req,res) => {
    try{
        const id = req.params.id
        const order = await Order.findById(id)
        if(!order){
            res.status(404).send('Order not found')
        }
        const details = {
            //order.(restau, items, deliveryAddress, status, totalPrice, notes)
        }
        res.status(200).json(details)
    }catch(error){
        res.status(500).send('Server Error')
    }
}

//Update order
exports.updateOrder = async (req,res) => {
    try {
        const id = req.params.id
        const updates = req.body

        const updatedOrder = await Order.findByIdAndUpdate(id, updates, { new: true });

        if (!updatedOrder) {
            return res.status(404).json({ message: 'Order not found' })
        }
        
        
        res.json(updatedOrder)
    } catch (error) {
        res.status(500).json('Server error')
    }
}

//Delete Order
exports.deleteOrder = async (req,res) => {
    try{
        const id = req.params.id

        const order = await Order.findByIdAndDelete(id)

        if(!order){
            res.status(404).json({message : 'Order not found'})
        }

        res.status(200).json({message : 'Order deleted successfuly'})
    }catch(error){
        res.status(500).json('Server error')
    }
}

//Track orders page
exports.trackOrder = async (req,res) => {
    try{
        const {id} = req.query
        const order = await Order.findById(id)
        if(!order){
            res.status(404).json({message: 'Order not found'})
        }
        const trackingInfo = {
            status : order.status
        }
        res.status(200).json(trackingInfo)
    }catch(error){
        res.status(500).send('Server Error')
    }
}