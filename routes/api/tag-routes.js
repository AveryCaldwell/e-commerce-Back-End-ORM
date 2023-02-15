const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

// GET all tags
router.get('/', (req, res) => {
    //include its associated Product data
    Tag.findAll({
        include: {
            model: Product,
        },
    })
        .then((tagData) => res.json(tagData))
        .catch((err) => {
            res.status(500).json(err);
        });
});

// GET a single tag by its `id`
// localhost:3001/api/tag/4
router.get('/:id', (req, res) => {
    // include its associated Product data
    Tag.findOne({
        where: {
            id: req.params.id,
        },
        include: {
            model: Product,
        },
    })
        .then((tagData) => res.json(tagData))
        .catch((err) => {
            res.status(500).json(err);
        });
});

// CREATE a new tag
// INSOMNIA: { "tag_name": "coral" }
router.post('/', (req, res) => {
    Tag.create({
        tag_name: req.body.tag_name,
    })
        .then((tagData) => res.json(tagData))
        .catch((err) => {
            res.status(500).json(err);
        });
});

// UPDATE a tag's name by its `id` value
router.put('/:id', (req, res) => {
    Tag.update(
        {
            tag_name: req.body.tag_name,
        },
        {
            where: {
                id: req.params.id,
            },
        }
    )
        .then((tagData) => {
            if (!tagData) {
                res.status(404).json({ message: 'No Tag found with that id.' });
                return;
            }
            res.json(tagData);
        })
        .catch((err) => {
            res.status(500).json(err);
        });
});

// DELETE on tag by its `id` value
router.delete('/:id', (req, res) => {
    Tag.destroy({
        where: {
            id: req.params.id,
        },
    })
        .then((tagData) => {
            if (!tagData) {
                res.status(404).json({ message: 'No Tag found with that id.' });
                return;
            }
            res.json(tagData);
        })
        .catch((err) => {
            res.status(500).json(err);
        });
});

module.exports = router;
