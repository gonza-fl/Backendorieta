import CartManager from "../helpers/cartManager.js";
const cartManager = new CartManager();

const getItems = async (req, res) => {

    const result = await cartManager.getAllCart();
    return res.status(200).json({
        ok:true,
        data: result
    })

}

const addItem = async (req, res) => {

    const result = await cartManager.addToCart(req.body)
    return res.status(200).json({
        ok:true,
        data: result
    })

}

export{
    getItems,
    addItem
}