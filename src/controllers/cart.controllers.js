import mongoose from 'mongoose';
import Cart from '../models/Cart.js';
import Product from '../models/Product.js';

const createCart = async (req, res) => {
  const { products } = req.body;

  try {
    const cart = new Cart({ products });
    await cart.save();

    res.status(201).json({ message: 'Cart created successfully', cart });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Something went wrong' });
  }
};

const getItems = async (req, res) => {
  try {
    const { cid } = req.params;

    const cart = await Cart.findById(cid);

    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    const productIds = cart.products.map((product) => product.productId);

    const products = await Product.find({ _id: { $in: productIds } });

    return res.json(products);
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

const addItem = async (req, res) => {
  const { cid } = req.params;
  const { productId, quantity } = req.body;

  if (!mongoose.Types.ObjectId.isValid(cid)) {
    return res.status(400).json({ message: 'Invalid cart ID' });
  }

  try {
    const cart = await Cart.findById(cid);
    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    const existingProductIndex = cart.products.findIndex(
      (p) => p.productId.toString() === productId
    );

    if (existingProductIndex >= 0) {
      cart.products[existingProductIndex].quantity += quantity;
    } else {
      cart.products.push({ productId, quantity });
    }

    await cart.save();

    return res.status(201).json({ message: 'Product added to cart', cart });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Something went wrong' });
  }
};
const deleteProductFromCart = async (req, res) => {
  try {
    const { cid, pid } = req.params;
    const cart = await Cart.findById(cid);
    if (!cart) return res.status(404).json({ error: 'Cart not found' });
    cart.products = cart.products.filter(
      (product) => product.productId.toString() !== pid
    );
    await cart.save();
    return res.json(cart);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};
const deleteAllProductsFromCart = async (req, res) => {
  try {
    const { cid } = req.params;
    const cart = await Cart.findById(cid);
    if (!cart) return res.status(404).json({ error: 'Cart not found' });
    cart.products = [];
    await cart.save();
    res.json(cart);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};

const updateCartProducts = async (req, res) => {
  try {
    const { cid } = req.params;
    const { products } = req.body;
    console.log(
      '🚀 ~ file: cart.controllers.js:105 ~ updateCartProducts ~ products:',
      products
    );
    const cart = await Cart.findById(cid);
    if (!cart) return res.status(404).json({ error: 'Cart not found' });
    cart.products = products;
    await cart.save();
    res.json(cart);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};

const updateProductQuantityInCart = async (req, res) => {
  try {
    const { cid, pid } = req.params;
    const { quantity } = req.body;
    const cart = await Cart.findById(cid);
    if (!cart) return res.status(404).json({ error: 'Cart not found' });
    const productIndex = cart.products.findIndex(
      (product) => product.productId.toString() === pid
    );
    if (productIndex === -1)
      return res.status(404).json({ error: 'Product not found in cart' });
    cart.products[productIndex].quantity = quantity;
    await cart.save();
    res.json(cart);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};

export {
  addItem,
  createCart,
  deleteAllProductsFromCart,
  deleteProductFromCart,
  getItems,
  updateCartProducts,
  updateProductQuantityInCart,
};
