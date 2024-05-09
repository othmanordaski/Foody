const Order = require("../Modals/Schema/OrderSchema")
const DeliveryPerson = require('../Modals/Schema/Delivery')
const {HTTP_STATUS_CODES,RESPONSE_MESSAGES} = require('../config/constants')
const { response } = require("express")
const {calculateDistance} = require("../Helpers/calculateDistance")


//Create a new order by the client ofc
exports.createOrder = async (req,res) => {
    try{
        const restauId = req.params.id
        const menuId = req.params.menuid
        const {_id} = req.user
        const {total,status,quantity,variations} = req.body
        const item = [{
            menuId: menuId,
            quantity: quantity, 
            variation: variations 
        }]
        const  newOrder = new Order({
            items : item,
            total,
            status,
            customerId : _id,
            restaurantId: restauId,
        })
        const order = await newOrder.save()
        res.status(HTTP_STATUS_CODES.OK).send({message: RESPONSE_MESSAGES.ORDER_CREATED_SUCCESS})
    }catch(error){
        res.status(HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR).send({message: RESPONSE_MESSAGES.INTERNAL_SERVER_ERROR})
    }
}

//Get All Orders
exports.getAllOrders = async (req,res) => {
    try{
        const {_id} = req.user
        const orders = await Order.find()
        res.status(HTTP_STATUS_CODES.OK).send(orders)
    }catch(error){
        res.status(HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR).SEND({messsage: RESPONSE_MESSAGES.INTERNAL_SERVER_ERROR})
    }
}

//Get Order by ID
exports.getOrderById = async (req,res) => {
    try{
        const {_id} = req.user
        const orderId = req.params.id
        const order = await Order.findById(orderId)

        if(!order){
            return res.status(HTTP_STATUS_CODES.NOT_FOUND).send({message: RESPONSE_MESSAGES.ORDER_NOT_FOUND})
        }
        res.status(HTTP_STATUS_CODES.OK).send(order)
    }catch(error){
        res.status(HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR).SEND({messsage: RESPONSE_MESSAGES.INTERNAL_SERVER_ERROR})
    }
}

//Update Order
exports.updateOrder = async (req,res) =>{
    try{
        const orderId = req.params.id
        const order = await Order.findById(orderId)

        if(!order){
            return res.status(HTTP_STATUS_CODES.NOT_FOUND).send({MESSAGE : RESPONSE_MESSAGES.ORDER_NOT_FOUND})
        }
        const {total,status,quantity,variations} = req.body
        const updatedOrder = await Order.findByIdAndUpdate(orderId,{
            total,
            status,
            quantity,
            variations
        })

        res.status(HTTP_STATUS_CODES.OK).send({message : updatedOrder})
    }catch(error){
        res.status(HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR).SEND({messsage: RESPONSE_MESSAGES.INTERNAL_SERVER_ERROR})
    }
    

}

//Delete order by client
exports.deleteOrder = async (req,res) => {
    try{
        const orderId = req.params.id
        const order = await Order.findByIdAndDelete(orderId)
        if(!order){
            return res.status(HTTP_STATUS_CODES.NOT_FOUND).send({message : RESPONSE_MESSAGES.ORDER_NOT_FOUND})
        }
        res.status(HTTP_STATUS_CODES.OK).send({message : order})
    }catch(error){
        res.status(HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR).SEND({messsage: RESPONSE_MESSAGES.INTERNAL_SERVER_ERROR})
    }
}

//Assign delivery person to order
exports.assignDelivery = async (req,res) => {
    try{
        const orderId= req.params.id
        const {_id} = req.user

        const order = await Order.findById(orderId)
        if(!order){
            return res.status(HTTP_STATUS_CODES.NOT_FOUND).send({message : RESPONSE_MESSAGES.ORDER_NOT_FOUND})
        }
        const delivery = await DeliveryPerson.findByIdAndUpdate(_id,{
            status : 'Assigned',
            assignedOrder : orderId   
        },{new:true})
        res.status(HTTP_STATUS_CODES.OK).send({message: delivery})
    }catch(error){
        res.status(HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR).send({messsage: RESPONSE_MESSAGES.INTERNAL_SERVER_ERROR})
    }
}

// Get delivery details for an order
exports.getDeliveryDetails = async (req, res) => {
    try {
        const orderId = req.params.id;
        const delivery = await DeliveryPerson.findOne({ orderId });
        if (!delivery) {
            return res.status(HTTP_STATUS_CODES.NOT_FOUND).send({ error: RESPONSE_MESSAGES.DELIVERY_NOT_FOUND });
        }
        const deliveryDetail = {
            name : delivery.username,
            email : delivery.email,
            phoneNumber : delivery.phoneNumber,
            address : delivery.address,
            status : delivery.status
        }
        res.status(200).send(deliveryDetail);
    } catch (error) {
        res.status(HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR).json({ error : RESPONSE_MESSAGES.INTERNAL_SERVER_ERROR });
    }
};

exports.trackOrder = async (req,res) => {
    try{
        const orderId = req.params.id
        const orderToTrack = await Order.find({orderId})
        if(orderToTrack){
            const clientAddress = req.user.clientAddress
            //get the id of delivery
            const deliveryAddress = delivery.address
            //calculate distance
            const distanceData = await calculateDistance(clientAddress,deliveryAddress)

            res.status(HTTP_STATUS_CODES.OK).send({message : distanceData})
        }else{
            return res.status(HTTP_STATUS_CODES.NOT_FOUND).send({message : RESPONSE_MESSAGES.ORDER_NOT_FOUND})
        }
        
        
    }catch(error){
        res.status(HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR).json({ error : RESPONSE_MESSAGES.INTERNAL_SERVER_ERROR });
    }
}