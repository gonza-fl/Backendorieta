import express from 'express';

const router = express.Router();

router.get('/',async (req, res)=>{
    const { limit } = req.query;
    console.log(limit);
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
}); //http://localhost:8080/api/products

export default router;