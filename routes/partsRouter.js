const { Router } = require('express');
const router = Router();
const partsController = require('../controllers/partsController');

router.get('/new', (req, res) => {
    const categoryId = req.query.category_id;
    res.render('parts/partForm', { title: 'Add Item', categoryId });
});

router.post('/new/:id', partsController.addPart);

router.get('/edit/:id', partsController.editPartForm);
router.post('/edit/:id', partsController.updatePart);

router.get('/details/:id', partsController.partDetails);
router.post('/delete/:id', partsController.deletePart);

module.exports = router;