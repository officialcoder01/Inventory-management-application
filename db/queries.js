const pool = require('./pool');

const getAllSuppliers = async () => {
    const query = 'SELECT supplier_id, name, email, phone FROM suppliers ORDER BY supplier_id';
    const { rows } = await pool.query(query);
    return rows;
};

const getSupplierById = async (id) => {
    const query = 'SELECT supplier_id, name, email, phone FROM suppliers WHERE supplier_id = $1';
    const { rows } = await pool.query(query, [id]);
    return rows[0];
};

const createSupplier = async (name, email, phone) => {
    const query = 'INSERT INTO suppliers (name, email, phone) VALUES ($1, $2, $3) RETURNING *';
    const { rows } = await pool.query(query, [name, email, phone]);
    return rows[0];
};

const updateSupplier = async (id, name, phone, email) => {
  const query = `
    UPDATE suppliers
    SET name = $1, phone = $2, email = $3
    WHERE supplier_id = $4
    RETURNING *;
  `;
  const { rows } = await pool.query(query, [name, phone, email, id]);
  return rows[0];
};

const deleteSupplier = async (id) => {
    const query = 'DELETE FROM suppliers WHERE supplier_id = $1';
    const { rows } = await pool.query(query, [id]);
    return rows[0];
}

const getAllCategoriesBySupplierId = async (supplierId) => {
    const query = 'SELECT category_id, name, description, supplier_id FROM categories WHERE supplier_id = $1 ORDER BY category_id';
    const { rows } = await pool.query(query, [supplierId]);
    return rows;
}

const addCategory = async (name, description, id) => {
    const query = 'INSERT INTO categories (name, description, supplier_id) VALUES ($1, $2, $3) RETURNING *';
    const { rows } = await pool.query(query, [name, description, id]);
    return rows[0];
}

const getCategoryById = async (categoryId) => {
    const query = `SELECT category_id, name, description, supplier_id FROM categories WHERE category_id = $1`;
    const { rows } = await pool.query(query, [categoryId]);
    return rows[0];
}

const updateCategory = async (id, name, description) => {
  const query = `
    UPDATE categories
    SET name = $1, description = $2
    WHERE category_id = $3
    RETURNING *;
  `;
  const { rows } = await pool.query(query, [name, description, id])
  return rows[0];
}

const deleteCategory = async (id) => {
    const query = 'DELETE FROM categories WHERE category_id = $1';
    const { rows } = await pool.query(query, [id]);
    return rows[0];
}

const getAllPartsByCategoryId = async (categoryId) => {
    const query = `SELECT part_id, name, description, price, quantity, category_id FROM parts WHERE category_id = $1 ORDER BY part_id`;
    const { rows } = await pool.query(query, [categoryId]);
    return rows;
}

const addPart = async (name, description, price, quantity, category_id) => {
    const query = `INSERT INTO parts (name, description, price, quantity, category_id) VALUES ($1, $2, $3, $4, $5) RETURNING *`;
    const { rows } = await pool.query(query, [name, description, price, quantity, category_id]);
    return rows[0];
}

const getPartById = async (partId) => {
    const query = `SELECT part_id, name, description, price, quantity, category_id FROM parts WHERE part_id = $1`;
    const { rows } = await pool.query(query, [partId]);
    return rows[0];
}

const deletePart = async (id) => {
    const query = 'DELETE FROM parts WHERE part_id = $1';
    const { rows } = await pool.query(query, [id]);
    return rows[0];
}

const updatePart = async (id, name, description, price, quantity) => {
  const query = `
    UPDATE parts
    SET name = $1, description = $2, price = $3, quantity = $4
    WHERE part_id = $5
    RETURNING *;
  `;

  const priceNum = Number(price);
  const quantityNum = Number(quantity);
  const { rows } = await pool.query(query, [name, description, priceNum, quantityNum, id]);
  return rows[0];
};

module.exports = {
    getAllSuppliers,
    getSupplierById,
    createSupplier,
    updateSupplier,
    deleteSupplier,
    getAllCategoriesBySupplierId,
    addCategory,
    getCategoryById,
    updateCategory,
    deleteCategory,
    getAllPartsByCategoryId,
    addPart,
    getPartById,
    deletePart,
    updatePart
};