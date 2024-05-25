const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

// find all categories
router.get('/', async (req, res) => {
  try {
    const categoryData = await Category.findAll({
      // be sure to include its associated Products
      include: [{ model: Product, as: 'products' }],
    });
    res.status(200).json(categoryData);
  } catch (err) {
    console.error('Error fetching categories:', err);  // Log the error to understand the issue better
    res.status(500).json(err);
  }
});


router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  try {
    const categoryData = await Category.findByPk(req.params.id, {
      // be sure to include its associated Products
      include: [{ model: Product, as: 'products' }]
    });

    if (!categoryData) {
      res.status(404).json({ message: "No category found with this id" });
      return;
    }
    res.status(200).json(categoryData)
  } catch (err) {
    console.error('Error fethcing category', err);
    res.status(500).json(err);
  }
});

router.post('/', async (req, res) => {
  // create a new category
  try {
    const categoryData = await Category.create(req.body);
    res.status(200).json(categoryData);
  } catch (error) {
    res.status(400).json(error);
  }
});

// router.put('/:id', async (req, res) => {
//   // update a category by its `id` value
//   Category.update(
//     {
//       category_name: req.body.category_name
//     },
//     {
//       where: {
//         id: req.params.id,
//       },
//     }
//   )
//     .then((updatedCategory) => {
//       res.json(updatedCategory);
//     })
//     .catch((err) => {
//       consoele.error(err);
//       res.json(err);
//     });
// });
// Update a category by its `id` value
router.put('/:id', async (req, res) => {
  try {
    const updatedCategory = await Category.update(
      { category_name: req.body.category_name },
      { where: { id: req.params.id } }
    );

    if (!updatedCategory[0]) {
      res.status(404).json({ message: 'No category found with this id' });
      return;
    }

    res.status(200).json(updatedCategory);
  } catch (err) {
    console.error('Error updating category:', err);
    res.status(500).json(err);
  }
});

router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
  try {
    const categoryData = await Category.destroy({
      where: {
        id: req.params.id
      }
    });
    if (!categoryData) {
      res.status(404).json({ message: 'No category found with this id' });
      return;
    }

    res.status(200).json(categoryData);
  } catch (error) {
    console.error('Error Deleting category', error);
    res.status(500).json(error)
  }
});

module.exports = router;
