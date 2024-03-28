const Menu = require('../Modals/Schema/MenuSchema');


exports.getAllMenus = async (req, res) => {
    try {
        const menus = await Menu.find();
        return res.json({ data: menus });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Server error' });
    }
}

exports.getSingleMenu= async (req,res) => {
    try {
        const id = req.params.id;
        const menu = await Menu.findById(id);
        res.json({
            data: menu
        });
    }catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
}


exports.createMenu = async (req, res) => {
    try {
        const {filename} = req.file
        const {name, description, price, category, variations, dietary, reviews } = req.body;
        
        const menu = new Menu({
            name,
            description,
            price,
            category,
            image : filename,
            variations,
            dietary,
            reviews,
        });
        const result = await menu.save();
        
        return res.json({ data: result });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Server error' });
    }
}
exports.updateMenu = async (req, res) => {
    try {
        const id = req.params.id;
        const { filename } = req.file;
        const { name, description, price, category, variations, dietary, reviews } = req.body;
        const updatedMenu = await Menu.findByIdAndUpdate(id, {
            name,
            description,
            price,
            category,
            image: filename,
            variations,
            dietary,
            reviews
        }, { new: true });
        res.json({ data: updatedMenu });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
}

exports.deleteMenu = async (req, res) => {
    try {
        const id = req.params.id;
        const deletedMenu = await Menu.deleteOne({ _id: id });
        res.json({ data: deletedMenu });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
}

