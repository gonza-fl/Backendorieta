import ProductManager from '../helpers/productManager.js';
const productManager= new ProductManager();

const showProducts = async (req, res) => {

    try {
        const arrayProducts = await productManager.getProducts();
        return res.render('products',{ arrayProducts });
    } catch (error) {
        console.log(error);
    }

    res.render('products',{});
}


export{
    showProducts,
}