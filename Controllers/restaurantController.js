const Menu = require('../Modals/Schema/MenuSchema');
const { RESPONSE_MESSAGES, HTTP_STATUS_CODES } = require('../config/constants');
const { menuFilterOptions } = require('../Helpers/Query/menuQueries');

exports.getAllMenus = async (req, res) => {
    try {
        const menus = await menuFilterOptions(req);
        if (!menus || menus.length === 0) {
            return res.status(HTTP_STATUS_CODES.NOT_FOUND).json({ message: RESPONSE_MESSAGES.NO_MENU_ITEMS_AVAILABLE});
        }
        res.json({ data: menus });
    } catch (err) {
          console.error(err);
          res.status(HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR).json({ message: RESPONSE_MESSAGES.INTERNAL_SERVER_ERROR });
    }
}

exports.getSingleMenu= async (req,res) => {
    try {
        const id = req.params.id;
        const menu = await Menu.findOne({ _id: id, isPublished: true });;
        if (!menu) {
            return res.status(HTTP_STATUS_CODES.NOT_FOUND).json({ message: RESPONSE_MESSAGES.MENU_ITEM_NOT_FOUND });
        }
        res.json({ data: menu });
    } catch (err) {
          console.error(err);
          res.status(HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR).json({ message: RESPONSE_MESSAGES.INTERNAL_SERVER_ERROR });
    }
}


exports.createMenu = async (req, res) => {
    try {
        const {filename} = req.file
        const {name, description, price, category, variations, dietary, reviews ,isPublished} = req.body;
        
        const menu = new Menu({
            name,
            description,
            price,
            category,
            image : filename,
            isPublished: isPublished,
            variations,
            dietary,
            reviews,
        });
        const createdMenu = await menu.save();
        if (!createdMenu) {
            return res.status(HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR).json({ message: RESPONSE_MESSAGES.MENU_CREATION_FAILED });
        }
        return res.status(HTTP_STATUS_CODES.CREATED).json({ message: RESPONSE_MESSAGES.MENU_CREATED_SUCCESS , data : createdMenu });
    } catch (err) {
        console.error(err);
        return res.status(HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR).json({ message: RESPONSE_MESSAGES.INTERNAL_SERVER_ERROR });
    }
}

exports.updateMenu = async (req, res) => {
    try {
        const id = req.params.id;
        const { filename } = req.file;
        const { name, description, price, category, variations, dietary, reviews, isPublished } = req.body;
        const updatedMenu = await Menu.findByIdAndUpdate(id, {
            name,
            description,
            price,
            category,
            image: filename,
            isPublished: isPublished,
            variations,
            dietary,
            reviews
        }, { new: true });
        if (!updatedMenu) {
            return res.status(HTTP_STATUS_CODES.NOT_FOUND).json({ message: RESPONSE_MESSAGES.MENU_ITEM_NOT_FOUND });
        }
        return res.json({ message: RESPONSE_MESSAGES.MENU_UPDATED_SUCCESS, data: updatedMenu });
    } catch (err) {
        console.error(err);
        return res.status(HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR).json({ message: RESPONSE_MESSAGES.INTERNAL_SERVER_ERROR });
    }
}

exports.deleteMenu = async (req, res) => {
    try {
        const id = req.params.id;
        const deletedMenu = await Menu.deleteOne({ _id: id });
        if (!deletedMenu) {
            return res.status(HTTP_STATUS_CODES.NOT_FOUND).json({ message: RESPONSE_MESSAGES.MENU_ITEM_NOT_FOUND });
        }
        res.json({ message: RESPONSE_MESSAGES.MENU_DELETED_SUCCESS, data: deletedMenu });
    } catch (err) {
        console.error(err);
        res.status(HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR).json({ message: RESPONSE_MESSAGES.INTERNAL_SERVER_ERROR });
    }
}