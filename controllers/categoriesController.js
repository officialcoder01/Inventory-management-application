const db = require('../db/queries');

const listCategoriesBySupplier = async (req, res) => {
    const supplierId = req.params.id;
    try {
        const categories = await db.getAllCategoriesBySupplierId(supplierId);
        res.render('category/list', { title: 'Category List', categories, supplierId });
    } catch (error) {
        console.error('Error fetching categories:', error);
        res.status(500).send('Internal Server Error');
    }
};

const addCategory = async (req, res) => {
    const { name, description } = req.body;
    const supplierId = req.params.id;
    try {
        await db.addCategory(name, description, supplierId);
        res.redirect(`/suppliers/details/${supplierId}`);
    } catch (error) {
        console.error('Error adding category:', error);
        res.status(500).send('Internal Server Error');
    }
};

const categoryDetails = async (req, res) => {
    const categoryId = req.params.id;
    try {
        const category = await db.getCategoryById(categoryId);
        const parts = await db.getAllPartsByCategoryId(categoryId) || [];
        
        if (!category) {
            res.status(404).send('Category not found!')
        }

        res.render('category/categoryDetail', {
            title: 'Category Details',
            category,
            parts
        })
    } catch (error) {
        console.error('Error fetching category details:', error);
        res.status(500).send('Internal Server Error');
    }
};

const editCategoryForm = async (req, res) => {
    const categoryId = req.params.id;
    try {
        const category = await db.getCategoryById(categoryId);
        if (!category) return res.status(404).send('Category not found');

        res.render('category/categoryEdit', { title: 'Edit Category', category });
    } catch (error) {
        console.error('Error loading edit form:', error);
        res.status(505).send('Internal Server Error');
    }
};

const updateCategory = async (req, res) => {
    const { name, description } = req.body;
    const categoryId = req.params.id;

    try {
        const existingCategory = await db.getCategoryById(categoryId);
        if (!existingCategory) {
            req.flash('error_msg', 'Category not found');
        }

        await db.updateCategory(categoryId, name, description);

        req.flash('success_msg', '✅ Category updated successfully!');
        res.redirect(`/categories/details/${categoryId}`);
    } catch (error) {
        console.error('Error Updating category:', error);

        req.flash('error_msg', '❌ Failed to update category. Please try again.');
        res.status(500).send('Internal Server Error');
    }
}

const deleteCategory = async (req, res) => {
    const categoryId = req.params.id;
    try {
        const category = await db.getCategoryById(categoryId);
        if (!category) {
            return res.status(404).send('Category not found');
        } 
        await db.deleteCategory(categoryId);
        res.redirect(`/suppliers/details/${category.supplier_id}`);
    } catch (error) {
        console.error('Error deleting category:', error);
        res.status(500).send('Internal Server Error');
    }
};

module.exports = {
    listCategoriesBySupplier,
    addCategory,
    categoryDetails,
    editCategoryForm,
    updateCategory,
    deleteCategory
};