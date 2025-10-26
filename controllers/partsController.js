const db = require('../db/queries');

const addPart = async (req, res) => {
    const { name, description, price, quantity } = req.body;
    const categoryId = req.params.id;
    try {
        await db.addPart(name, description, price, quantity, categoryId);

        req.flash('success_msg', '✅ Item added successfully!');
        res.redirect(`/categories/details/${categoryId}`);
    } catch (error) {
        console.error('Error adding Item:', error);
        req.flash('error_msg', '❌ Failed to add item. Please try again.')
        res.status(500).send('Internal Server Error');
    }
};

const partDetails = async (req, res) => {
    const partId = req.params.id;
    try {
        const part = await db.getPartById(partId);
        
        if (!part) {
            res.status(404).send('Item not found!')
        }

        res.render('parts/partDetail', {
            title: 'Item Details',
            part
        })
    } catch (error) {
        console.error('Error fetching Item details:', error);
        res.status(500).send('Internal Server Error');
    }
};

const deletePart = async (req, res) => {
    const partId = req.params.id;
    try {
        const part = await db.getPartById(partId);
        
        if (!part) {
            return res.status(404).send('Item not found');
        }

        const categoryId = part.category_id;
        await db.deletePart(partId);

        req.flash('success_msg', '✅ Item deleted successfully!');
        res.redirect(`/categories/details/${categoryId}`);
    } catch (error) {
        console.error('Error deleting Item:', error);
        req.flash('error_msg', '❌ Failed to delete item. Please try again.')
        res.status(500).send('Internal Server Error');
    }
};

const editPartForm = async (req, res) => {
  const partId = req.params.id;
  try {
    const part = await db.getPartById(partId);
    if (!part) return res.status(404).send('Item not found');
    res.render('parts/editForm', { title: 'Edit Item', part });
  } catch (error) {
    console.error('Error loading edit form:', error);
    res.status(500).send('Internal Server Error');
  }
};

const updatePart = async (req, res) => {
  const { name, description, price, quantity } = req.body;
  const partId = req.params.id;
  try {
    const existingPart = await db.getPartById(partId);

    if (!existingPart) {
        req.flash('error_msg', 'Item not found')
        return res.status(404).send('Item not found')
    }

    await db.updatePart(partId, name, description, price, quantity);

    req.flash('success_msg', '✅ Item updated successfully!');
    res.redirect(`/categories/details/${existingPart.category_id}`);
  } catch (error) {
    console.error('Error updating Item:', error);

    req.flash('error_msg', '❌ Failed to update item. Please try again.');
    res.status(500).send('Internal Server Error');
  }
};

module.exports = {
    addPart,
    partDetails,
    deletePart,
    editPartForm,
    updatePart
}