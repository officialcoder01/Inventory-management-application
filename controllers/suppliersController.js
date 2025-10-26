const db = require('../db/queries');

const listSuppliers = async (req, res) => {
    try {
        const suppliers = await db.getAllSuppliers();
        res.render('supplier/list', { title: 'Supplier List', suppliers });
    } catch (error) {
        console.error('Error fetching suppliers:', error);
        res.status(500).send('Internal Server Error');
    }
};

const supplierDetails = async (req, res) => {
    const supplierId = req.params.id;
    try {
        const supplier = await db.getSupplierById(supplierId);
        const categories = await db.getAllCategoriesBySupplierId(supplierId) || [];
        if (supplier) {
            res.render('supplier/detail', { title: 'Supplier Details', supplier, categories });
        } else {
            res.status(404).send('Supplier not found');
        }
    } catch (error) {
        console.error('Error fetching supplier details:', error);
        res.status(500).send('Internal Server Error');
    }
};

const createSupplier = async (req, res) => {
    const { name, email, phone } = req.body;
    try {
        await db.createSupplier(name, email, phone);
        res.redirect('/suppliers');
    } catch (error) {
        console.error('Error creating supplier:', error);
        res.status(500).send('Internal Server Error');
    }
};

// Show the edit form
const editSupplierForm = async (req, res) => {
  const supplierId = req.params.id;
  try {
    const supplier = await db.getSupplierById(supplierId);
    if (!supplier) return res.status(404).send('Supplier not found');
    res.render('supplier/edit', { title: 'Edit Supplier', supplier });
  } catch (error) {
    console.error('Error loading edit form:', error);
    res.status(500).send('Internal Server Error');
  }
};

// Handle edit form submission
const updateSupplier = async (req, res) => {
  const { name, phone, email } = req.body;
  const supplierId = req.params.id;
  try {
    await db.updateSupplier(supplierId, name, phone, email);
    res.redirect(`/suppliers/details/${supplierId}`);
  } catch (error) {
    console.error('Error updating supplier:', error);
    res.status(500).send('Internal Server Error');
  }
};

const deleteSupplier = async (req, res) => {
    const supplierId = req.params.id;
    try {
        const supplier = await db.getSupplierById(supplierId);
        if (!supplier) {
            return res.status(404).send('Supplier not found');
        } 
        await db.deleteSupplier(supplierId);
        res.redirect('/suppliers');
    } catch (error) {
        console.error('Error deleting supplier:', error);
        res.status(500).send('Internal Server Error');
    }
};

module.exports = {
    listSuppliers,
    supplierDetails,
    createSupplier,
    editSupplierForm,
    updateSupplier,
    deleteSupplier
};