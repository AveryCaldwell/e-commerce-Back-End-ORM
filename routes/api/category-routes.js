const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

// GET all categories
router.get('/', async (req, res) => {
    // include its associated Products
    try {
        const categoryData = await Category.findAll({ include: Product });
        res.status(200).json(categoryData);
    } catch (err) {
        res.status(500).json(err);
    }
});

// GET one category by its `id` value
router.get('/:id', async (req, res) => {
    // include its associated Products
    try {
        const categoryData = await Category.findByPk(req.params.id, {
            include: Product,
        });
        if (!categoryData) {
            res.status(404).json({ message: 'No Category by this id!' });
            return;
        }
        res.status(200).json(categoryData);
    } catch (err) {
        res.status(500).json(err);
    }
});

// CREATE a new category
router.post('/', async (req, res) => {
    try {
        const categoryData = await Category.create(req.body);
        res.status(200).json(categoryData);
    } catch (err) {
        res.status(400).json(err);
    }
});

// UPDATE a category by its `id` value
router.put('/:id', async (req, res) => {
    // All the fields you can update and the data attached to the request body.
    try {
        const categoryData = await Category.update(req.body, {
            // Gets a category based on the book_id given in the request parameters
            where: {
                id: req.params.id,
            },
        });
        res.status(200).json(categoryData);
    } catch (err) {
        res.status(400).json(err);
    }
});

// DELETE a category by its `id` value
router.delete('/:id', async (req, res) => {
    const categoryData = await Category.destroy({
        where: {
            id: req.params.id,
        },
    });
    res.json(categoryData);
});

module.exports = router;
