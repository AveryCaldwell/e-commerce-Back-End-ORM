//TODO: working...kinda
const router = require('express').Router();
const { Product, Category, Tag, ProductTag } = require('../../models');

// The `/api/products` endpoint

// GET ALL products =================COMPLETE=================
// localhost:3001/api/products
router.get('/', async (req, res) => {
    // find all products
    // be sure to include its associated Category and Tag data
    try {
        const productData = await Product.findAll({
            include: ({ model: Category }, { model: Tag }),
        });
        res.status(200).json(productData);
    } catch (err) {
        res.status(500).json(err);
    }
});

// GET ONE product by its `id` ===============COMPLETE=================
// localhost:3001/api/products/3
router.get('/:id', async (req, res) => {
    try {
        const productData = await Product.findByPk(req.params.id, {
            // include its associated Category and Tag data
            include: ({ model: Category }, { model: Tag }),
        });
        if (!productData) {
            res.status(404).json({ message: 'No Product by this id!' });
            return;
        }
        res.status(200).json(productData);
    } catch (err) {
        res.status(500).json(err);
    }
});

// CREATE new product
// {"product_name": "Velvet Suit","price": 250.00,"stock": 3,"tagIds": 1}
router.post('/', (req, res) => {
    /* req.body should look like this...
    {
      product_name: "Basketball",
      price: 200.00,
      stock: 3,
      tagIds: [1, 2, 3, 4]
    }
  */
    Product.create(req.body)
        .then((product) => {
            // if there's product tags, we need to create pairings to bulk create in the ProductTag model
            if (req.body.tagIds.length) {
                const productTagIdArr = req.body.tagIds.map((tag_id) => {
                    return {
                        product_id: product.id,
                        tag_id,
                    };
                });
                return ProductTag.bulkCreate(productTagIdArr);
            }
            // if no product tags, just respond
            res.status(200).json(product);
        })
        .then((productTagIds) => res.status(200).json(productTagIds))
        .catch((err) => {
            console.log(err);
            res.status(400).json(err);
        });
});

// UPDATE product +++++WORKS?+++++
// INSOMNIA: localhost:3001/api/products/1 ==> type into json: {{"product_name": "Plaid Shorts"}}
router.put('/:id', (req, res) => {
    // update product data
    Product.update(req.body, {
        where: {
            id: req.params.id,
        },
    })
        .then((product) => {
            // find all associated tags from ProductTag
            return ProductTag.findAll({ where: { product_id: req.params.id } });
        })
        .then((productTags) => {
            // get list of current tag_ids
            const productTagIds = productTags.map(({ tag_id }) => tag_id);
            // create filtered list of new tag_ids
            const newProductTags = req.body.tagIds
                .filter((tag_id) => !productTagIds.includes(tag_id))
                .map((tag_id) => {
                    return {
                        product_id: req.params.id,
                        tag_id,
                    };
                });
            // figure out which ones to remove
            const productTagsToRemove = productTags
                .filter(({ tag_id }) => !req.body.tagIds.includes(tag_id))
                .map(({ id }) => id);

            // run both actions
            return Promise.all([
                ProductTag.destroy({ where: { id: productTagsToRemove } }),
                ProductTag.bulkCreate(newProductTags),
            ]);
        })
        .then((updatedProductTags) => res.json(updatedProductTags))
        .catch((err) => {
            // console.log(err);
            res.status(400).json(err);
        });
});

// INSOMNIA: localhost:3001/api/categories/1 =>  {"id": 2}
// DELETE by id
router.delete('/:id', async (req, res) => {
    const productData = await Product.destroy({
        where: {
            id: req.params.id,
        },
    });
    res.json(productData);
});

module.exports = router;
