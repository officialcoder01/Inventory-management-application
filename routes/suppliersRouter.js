const { Router } = require('express');
const router = Router();
const suppliersController = require('../controllers/suppliersController');

// Route to list all suppliers
router.get('/list', suppliersController.listSuppliers);

// Route to create a new supplier
router.get('/create', (req, res) => {
    res.render('supplier/form', { title: 'Create Supplier' });
});
router.post('/create', suppliersController.createSupplier);

router.get('/edit/:id', suppliersController.editSupplierForm);
router.post('/edit/:id', suppliersController.updateSupplier);

// Route to view supplier details
router.get('/details/:id', suppliersController.supplierDetails)

// Route to delete a supplier by ID
router.post('/delete/:id', suppliersController.deleteSupplier);

module.exports = router;