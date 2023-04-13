import ProductManager from '../helpers/productManager.js';
const productManager= new ProductManager();

const getAllProducts = async (req, res)=>{ 
    const { limit } = req.query;
    try {
        const products = await productManager.getProducts();
        if(limit){
            const productsLimited = products.filter( (el,index) => index<limit);
            return res.json({
                ok:true,
                products:productsLimited,
                limit
            })
        }
        return res.json({
            ok:true,
            products,
            limit
        })

    } catch (error) {
        return res.status(500).json({
            ok:false,
            error,
            msg:'Internal server error'
        })
    }    
}

const getProductById = async (req, res) => {
    const { id } = req.params;
    try {
        const product = await productManager.getProductById(id);

        if(!product) return res.status(400).json({
            ok:false,
            msg:`There is not exist a product with id: ${id}`
        })

        return res.status(200).json({
            ok: true,
            data:product
        })
    } catch (error) {
        return res.status(500).json({
            ok:false,
            msg:'Server internal error. Please contact with admin server'
        })
    }
}

const addProduct = async (req, res) => {
    const mimetypeArray = req.file.mimetype.split('/');
    const filepath = `${req.file.destination}/${req.file.filename}.${mimetypeArray[mimetypeArray.length - 1]}`;
    try {
        req.body.thumbnail = filepath;
        const newProduct = await productManager.addProduct(req.body);
        return res.status(200).json({
            ok:true,
            data: newProduct
        })
    } catch (error) {
        return res.status(500).json({
            ok:false,
            msg:'Server internal error. Please contact with admin server'
        })
    }
}

const updateProduct = async (req, res) => {
    const {id} = req.params;
    try {
        const updatedProduct = await productManager.updateProduct(req.body,id)
        return res.status(200).json({
            ok:true,
            data: updatedProduct
        })
    } catch (error) {
        return res.status(500).json({
            ok:false,
            msg:'Server internal error. Please contact with admin server'
        })
    }
}

const deleteProduct = async (req, res) => {

    const { id } = req.params;

    try {
        const result = await productManager.deleteProduct(Number(id));
        if(!result) return res.status(400).json({ ok:false, msg:`The product to delete with the id: ${id} does not exist in the list` })
        return res.status(200).json({ok:true, msg: 'delete product successfuly'})
    } catch (error) {
        return res.status(500).json({
            ok:false,
            msg:'Server internal error. Please contact with admin server'
        })
    }
}


export{
    getAllProducts,
    getProductById,
    addProduct,
    updateProduct,
    deleteProduct
}