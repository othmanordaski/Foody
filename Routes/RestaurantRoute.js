const express = require('express')
const router = express.Router()

const uploadImage = require('../Middlwares/multer')
const {getAllMenus, getSingleMenu, createMenu, updateMenu, deleteMenu}=require('../Controllers/restaurantController')



router.route('/menu')
.get(getAllMenus)
.post(uploadImage,createMenu)
router.route('/menu/:id')
.get(getSingleMenu)
.patch(uploadImage,updateMenu)
.delete(deleteMenu)

module.exports = router