import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';

const collectionName = 'products';

const productSchema = mongoose.Schema({
  code: Number,
  category: {
    type: String,
    enum: ['deporte', 'formal', 'informal', 'unknow'],
    default: 'unknow',
  },
  title: String,
  description: String,
  price: Number,
  thumbnail: String,
  stock: Number,
  status: Boolean,
});
productSchema.plugin(mongoosePaginate);

const Product = mongoose.model(collectionName, productSchema);

export default Product;
