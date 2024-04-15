const Order = require("../Modals/Schema/OrderSchema")
const {HTTP_STATUS_CODES,RESPONSE_MESSAGES} = require('../config/constants')

//View all orders page
exports.allOrders = async (rea,res) => {
    try{
        const orders = await Order.find({})
        res.status(HTTP_STATUS_CODES.OK).json({
            message : RESPONSE_MESSAGES.ORDER_CREATED_SUCCESS ,
            data : orders
        })
    }catch(error){
        res.status(HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR).send(RESPONSE_MESSAGES.INTERNAL_SERVER_ERROR)
    }
}

//Order details page
exports.orderDetails = async (req,res) => {
    try{
        const id = req.params.id
        const order = await Order.findById(id)
        if(!order){
            res.status(HTTP_STATUS_CODES.NOT_FOUND).send(RESPONSE_MESSAGES.ORDER_NOT_FOUND)
        }
        const details = {
            Restaurant : order.restaurant ,
            Address : order.deliveryAddress ,
            Status : order.status ,
            Total : order.totalPrice ,
            PayementMethod : order.paymentMethod
        }
        res.status(HTTP_STATUS_CODES.OK).json(details)
    }catch(error){
        res.status(HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR).send(RESPONSE_MESSAGES.INTERNAL_SERVER_ERROR)
    }
}

//Update order
exports.updateOrder = async (req,res) => {
    try {
        const id = req.params.id
        const updates = req.body

        const updatedOrder = await Order.findByIdAndUpdate(id, updates, { new: true });

        if (!updatedOrder) {
            return res.status(HTTP_STATUS_CODES.NOT_FOUND).json(RESPONSE_MESSAGES.ORDER_NOT_FOUND)
        }
        
        res.json({
            message: RESPONSE_MESSAGES.ORDER_UPDATED_SUCCESS ,
            data: updatedOrder
        })
    } catch (error) {
        res.status(HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR).json(RESPONSE_MESSAGES.INTERNAL_SERVER_ERROR)
    }
}

//Delete Order
exports.deleteOrder = async (req,res) => {
    try{
        const id = req.params.id

        const order = await Order.findByIdAndDelete(id)

        if(!order){
            res.status(HTTP_STATUS_CODES.NOT_FOUND).json(RESPONSE_MESSAGES.ORDER_NOT_FOUND)
        }

        res.status(HTTP_STATUS_CODES.OK).json(RESPONSE_MESSAGES.ORDER_CANCELED_SUCCESS)
    }catch(error){
        res.status(HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR).json(RESPONSE_MESSAGES.INTERNAL_SERVER_ERROR)
    }
}

//Track orders page
exports.trackOrder = async (req,res) => {
    try{
        const {id} = req.query
        const order = await Order.findById(id)
        if(!order){
            res.status(HTTP_STATUS_CODES.NOT_FOUND).json(RESPONSE_MESSAGES.ORDER_NOT_FOUND)
        }
        const trackingInfo = {
            status : order.status
        }
        res.status(HTTP_STATUS_CODES.OK).json(trackingInfo)
    }catch(error){
        res.status(HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR).send(RESPONSE_MESSAGES.INTERNAL_SERVER_ERROR)
    }
}