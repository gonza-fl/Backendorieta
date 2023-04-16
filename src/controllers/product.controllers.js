import Product from '../models/Product.js';

const getAllProducts = async (req, res) => {
  const { page: skip = 1, limit = 10, query = {}, sort } = req.query;
  try {
    const {
      docs: payload,
      totalPages,
      prevPage: prevPages,
      nextPage,
      page,
      hasPrevPage,
      hasNextPage,
    } = await Product.paginate(JSON.parse(query), {
      skip,
      limit,
      sort: {
        price: sort,
      },
    });
    const prevLink = hasPrevPage
      ? `/api/products?page=${prevPages}&limit=${limit}`
      : null;
    const nextLink = hasNextPage
      ? `/api/products?page=${nextPage}&limit=${limit}`
      : null;

    return res.json({
      status: 'success',
      payload,
      totalPages,
      prevPages,
      nextPage,
      page,
      hasPrevPage,
      hasNextPage,
      prevLink,
      nextLink,
    });
  } catch (error) {
    return res.status(500).json({
      status: 'error',
      error: error.message,
      msg: 'Internal server error',
    });
  }
};

const getProductById = async (req, res) => {
  const { id } = req.params;
  try {
    const product = await Product.findById(id);

    if (!product)
      return res.status(400).json({
        ok: false,
        msg: `There is not exist a product with id: ${id}`,
      });

    return res.status(200).json({
      ok: true,
      data: product,
    });
  } catch (error) {
    return res.status(500).json({
      ok: false,
      msg: 'Server internal error. Please contact with admin server',
    });
  }
};

const addProduct = async (req, res) => {
  try {
    const newProduct = await Product.create(req.body);
    return res.status(200).json({
      ok: true,
      data: newProduct,
    });
  } catch (error) {
    return res.status(500).json({
      ok: false,
      msg: 'Server internal error. Please contact with admin server',
    });
  }
};

const updateProduct = async (req, res) => {
  const { id } = req.params;
  try {
    const updatedProduct = await Product.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    return res.status(200).json({
      ok: true,
      data: updatedProduct,
    });
  } catch (error) {
    return res.status(500).json({
      ok: false,
      msg: 'Server internal error. Please contact with admin server',
    });
  }
};

const deleteProduct = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await Product.findByIdAndDelete(id);
    if (!result)
      return res.status(400).json({
        ok: false,
        msg: `The product to delete with the id: ${id} does not exist in the list`,
      });
    return res
      .status(200)
      .json({ ok: true, msg: 'delete product successfuly' });
  } catch (error) {
    return res.status(500).json({
      ok: false,
      msg: 'Server internal error. Please contact with admin server',
    });
  }
};

export {
  getAllProducts,
  getProductById,
  addProduct,
  updateProduct,
  deleteProduct,
};
