// TODO:
//Fill out the unfinished routes category-routes.js to perform create, read, update, and delete operations using your Sequelize models.
// Note that the functionality for creating the many-to-many relationship for products has already been completed for you.
// Hint: Be sure to look at the mini-project code for syntax help and use your model's column definitions to figure out what req.body will be for POST and PUT routes!

const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

// GET all categories
// be sure to include its associated Products ~~~COMPLETE/MAYBE
router.get('/', (req, res) => {
    try {
        const categoryData = Category.findAll({ include: Product });
        res.status(200).json(categoryData);
    } catch (err) {
        res.status(500).json(err);
    }
});

// find one category by its `id` value
// be sure to include its associated Products
// router.get('/:id', (req, res) => {
//     try {
//         const categoryData = await Category.findByPk(req.params.id, {

//         })
//     }
// });

router.post('/', (req, res) => {
    // create a new category
});

router.put('/:id', (req, res) => {
    // update a category by its `id` value
});

router.delete('/:id', (req, res) => {
    // delete a category by its `id` value
});

module.exports = router;
