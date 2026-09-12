const { pool } = require("../config/db");

async function getAllProducts() {
  const [rows] = await pool.execute(
    "SELECT id, name, description, price, category, stock, image, created_at FROM products ORDER BY created_at DESC"
  );
  return rows;
}

async function getProductById(id) {
  const [rows] = await pool.execute(
    "SELECT id, name, description, price, category, stock, image, created_at FROM products WHERE id = ? LIMIT 1",
    [id]
  );
  return rows[0];
}

async function createProduct(data) {
  const [result] = await pool.execute(
    "INSERT INTO products (name, description, price, category, stock, image) VALUES (?, ?, ?, ?, ?, ?)",
    [data.name, data.description, data.price, data.category, data.stock ?? 0, data.image || ""]
  );
  return getProductById(result.insertId);
}

async function updateProduct(id, data) {
  const current = await getProductById(id);
  if (!current) return null;

  const updated = {
    name: data.name ?? current.name,
    description: data.description ?? current.description,
    price: data.price ?? current.price,
    category: data.category ?? current.category,
    stock: data.stock ?? current.stock,
    image: data.image ?? current.image,
  };

  await pool.execute(
    "UPDATE products SET name = ?, description = ?, price = ?, category = ?, stock = ?, image = ? WHERE id = ?",
    [updated.name, updated.description, updated.price, updated.category, updated.stock, updated.image, id]
  );

  return getProductById(id);
}

async function deleteProduct(id) {
  const [result] = await pool.execute("DELETE FROM products WHERE id = ?", [id]);
  return result.affectedRows > 0;
}

module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};
