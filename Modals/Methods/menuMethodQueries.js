const Menu = require('../Schema/MenuSchema');

exports.findFilteredMenuItems = async (page = 1, limits = 10, sortBy = 'createdAt', order = 'asc', minPrice = 0, maxPrice = Infinity , category, search ) => {
  try {
      return await Menu.find({
              isPublished: true,
              price: { $gte: minPrice, $lte: maxPrice },
              category: { $regex: new RegExp(category, 'i') },
              $or: [
                  { name: { $regex: new RegExp(search, 'i') } },
                  { description: { $regex: new RegExp(search, 'i') } },
                  { category: { $regex: new RegExp(search, 'i') } },
              ]
          })
          .skip((page - 1) * limits)
          .limit(limits)
          .sort({ [sortBy]: order })
        //   .populate({ path: 'ownerId', select: '-_id  -__v -createdAt -updatedAt -lastLogin -active -role' });
  } catch (error) {
      return error;
  }
}