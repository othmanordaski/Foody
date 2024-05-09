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
          res.status(HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR).json({ message: RESPONSE_MESSAGES.INTERNAL_SERVER_ERROR });
    }
}


exports.createMenu = async (req, res) => {
    try {
        const {_id,role}=req.user
        if(role == 'Restaurant'){
        const {filename} = req.file
        const {name, description, price, category ,isPublished} = req.body;
        const menu = new Menu({
            name,
            description,
            price,
            category,
            image : filename,
            isPublished: isPublished,
            ownerId:_id ,
        });
        const createdMenu = await menu.save();
        if (!createdMenu) {
            return res.status(HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR).json({ message: RESPONSE_MESSAGES.MENU_CREATION_FAILED });
        }
        return res.status(HTTP_STATUS_CODES.CREATED).json({ message: RESPONSE_MESSAGES.MENU_CREATED_SUCCESS , data : createdMenu });
        }else{
            res.status(HTTP_STATUS_CODES.NOT_ALLOWED).json({message: RESPONSE_MESSAGES.MENU_NOT_ALLOWED})
        }
    } catch (err) {
        return res.status(HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR).json({ message: RESPONSE_MESSAGES.INTERNAL_SERVER_ERROR });
    }
}

exports.updateMenu = async (req, res) => {
    try {
        const {_id,role}=req.user
        const id = req.params.id
        if(role==='Restaurant'){
            const menuFound = await Menu.findById(id) 
            if(menuFound.ownerId == _id) {
                const { filename } = req.file;
                const { name, description, price, category, isPublished } = req.body;
                const updatedMenu = await Menu.findByIdAndUpdate(id, {
                    name,
                    description,
                    price,
                    category,
                    image: filename,
                    isPublished: isPublished,
                }, { new: true });
                if (!updatedMenu) {
                    return res.status(HTTP_STATUS_CODES.NOT_FOUND).json({ message: RESPONSE_MESSAGES.MENU_ITEM_NOT_FOUND });
                }
                return res.json({ message: RESPONSE_MESSAGES.MENU_UPDATED_SUCCESS, data: updatedMenu });
            }else{
                res.status(HTTP_STATUS_CODES.NOT_ALLOWED).json({message: RESPONSE_MESSAGES.MENU_NOT_ALLOWED})
            }
        }
        
    } catch (err) {
        return res.status(HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR).json({ message: RESPONSE_MESSAGES.INTERNAL_SERVER_ERROR });
    }
}

exports.deleteMenu = async (req, res) => {
    try {
        const {_id,role}=req.user
        const id = req.params.id
        if(role==='Restaurant'){
            const menuFound = await Menu.findById(id) 
            if(menuFound.ownerId == _id) {
        const deletedMenu = await Menu.deleteOne({_id : id });
        if (!deletedMenu) {
            return res.status(HTTP_STATUS_CODES.NOT_FOUND).json({ message: RESPONSE_MESSAGES.MENU_ITEM_NOT_FOUND });
        }
        res.json({ message: RESPONSE_MESSAGES.MENU_DELETED_SUCCESS, data: deletedMenu });
    }else {res.status(HTTP_STATUS_CODES.NOT_ALLOWED).json({message: RESPONSE_MESSAGES.MENU_NOT_ALLOWED})}
    }
    } catch (err) {
        res.status(HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR).json({ message: RESPONSE_MESSAGES.INTERNAL_SERVER_ERROR });
    }
}