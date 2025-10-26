const { Router } = require('express');
const router = Router();
const suppliersController = require('../controllers/suppliersController');
const categoriesController = require('../controllers/categoriesController');

// Route to list all suppliers
router.get('/list', suppliersController.listSuppliers);

router.get('/new', (req, res) => {
    const supplierId = req.query.supplier_id;
    res.render('category/categoryForm', { title: 'Add Category', supplierId });
});

// Route to add a new category
router.post('/new/:id', categoriesController.addCategory);

router.get('/details/:id', categoriesController.categoryDetails);

router.get('/edit/:id', categoriesController.editCategoryForm);
router.post('/edit/:id', categoriesController.updateCategory);

router.post('/delete/:id', categoriesController.deleteCategory);
module.exports = router;