const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

// GET all tags
router.get('/', async (req, res) => {
    try {
        const tagData = await Tag.findAll({
            include: {
                model: Product,
            },
        });
        res.status(200).json(tagData);
    } catch (err) {
        res.status(500).json(err);
    }
});

// GET a single tag by its `id`
// localhost:3001/api/tag/4
router.get('/:id', async (req, res) => {
    try {
        const tagData = await Tag.findOne({
            where: {
                id: req.params.id,
            },
            include: {
                model: Product,
            },
        });
        res.status(200).json(tagData);
    } catch (err) {
        res.status(500).json(err);
    }
});

// CREATE a new tag
// INSOMNIA: { "tag_name": "coral" }
router.post('/', async (req, res) => {
    try {
        const tagData = await Tag.create(req.body);
        res.status(200).json(tagData);
    } catch (err) {
        res.status(400).json(err);
    }
});

// UPDATE a tag's name by its `id` value
// INSOMNIA: localhost:3001/api/tags/11 ; { "tag_name": "pink" }
router.put('/:id', async (req, res) => {
    // All the fields you can update and the data attached to the request body.
    try {
        const tagData = await Tag.update(req.body, {
            // Gets a category based on the book_id given in the request parameters
            where: {
                id: req.params.id,
            },
        });
        res.status(200).json(tagData);
    } catch (err) {
        res.status(400).json(err);
    }
});

// DELETE on tag by its `id` value
// INSOMNIA: localhost:3001/api/tags/11
router.delete('/:id', async (req, res) => {
    const tagData = await Tag.destroy({
        where: {
            id: req.params.id,
        },
    });
    res.json(tagData);
});

module.exports = router;
