const express = require('express')
const router = express.Router()

const upload = require('../Middlwares/multer')
const {getAllMenus,getSingleMenu,createMenu,updateMenu,deleteMenu}=require('../Controllers/restaurantController')



router.route('/menu')
.get(getAllMenus)
.post(upload,createMenu)
router.route('/menu/:id')
.get(getSingleMenu)
.patch(upload,updateMenu)
.delete(deleteMenu)

module.exports = router