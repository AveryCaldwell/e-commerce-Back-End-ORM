// import models
const Product = require('./Product');
const Category = require('./Category');
const Tag = require('./Tag');
const ProductTag = require('./ProductTag');

// ** TODO **
// Products belongsTo Category ~~ COMPLETED
Product.belongsTo(Category, {
    foreignKey: 'category_id',
});

// ** TODO **
// Categories have many Products ~~ COMPLETED
Category.hasMany(Product, {
    foreignKey: 'product_id',
    onDelete: 'CASCADE',
});
// ** TODO **
// Products belongToMany Tags (through ProductTag) ~~ COMPLETED

Product.belongsToMany(Tag, { through: 'ProductTag' });

// ** TODO **
// Tags belongToMany Products (through ProductTag) ~~ COMPLETED
Tag.belongsToMany(Product, { through: 'ProductTag' });

module.exports = {
    Product,
    Category,
    Tag,
    ProductTag,
};
