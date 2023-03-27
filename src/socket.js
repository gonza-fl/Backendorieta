import { Server } from 'socket.io';
import ProductManager from './helpers/ProductManager.js';

const productManager = new ProductManager();
const products = await productManager.listProducts();

const socket = {};

socket.connect = function(httpServer) { 
    socket.io = new Server(httpServer);
    let { io } = socket;

    io.on("connection", (socket) => {
        console.log(`${socket.id} connected`);
        io.emit("products", products);

        socket.on('submitProduct', async (product) => {
            try {
                await productManager.addProduct(product.id);
                socket.emit("productCreated", { success: true });
            } catch (error) {
                socket.emit("productCreated", { success: false, error: error.message });
            }
        });

        socket.on('deleteProduct', async (product) => {
            try {
                await productManager.deleteProduct(product.id);
                socket.emit("productDeleted", { success: true });
            } catch (error) {
                socket.emit("productDeleted", { success: false, error: error.message });
            }
        });
    });
}

export default socket;