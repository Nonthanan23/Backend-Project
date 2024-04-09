const express = require('express');
const mongoose = require('mongoose');
const Product = require('./models/productmodel.js')
const app = express();

// middleware
app.use(express.json());




app.get ('/', (req, res) => {
	res.send('Hello World');
});


// GET alla produkter
app.get('/api/products', async (req, res) => {
	try {
		const products = await Product.find({});
		res.status(200).json(products);
	} catch (error) {
		res.status(500).json({message: error.message });
	}
});

// GET ett produkt
app.get('/api/products/:id', async (req, res) => {
	try {
		const { id } = req.params;
		const product = await Product.findById(id);
		res.status(200).json(product);
	} catch (error) {
		res.status(500).json({message: error.message });
	}
});


// POST skapa ny produkt
app.post('/api/products', async (req, res) => {
	try {
		const product = await Product.create(req.body);
		res.status(201).json(product);
	} catch (error) {
		res.status(500).json({message: error.message });
	}
});


// PUT uppdatera en produkt
app.put('/api/products/:id', async (req, res) => {
	try {
		const { id } = req.params;
		const product = await Product.findByIdAndUpdate(id, req.body);
		if (!product) {
			return res.status(404).json({message: 'Product not found'});
		}
		const updatedProduct = await Product.findById(id);
		res.status(200).json(updatedProduct);
	} catch (error) {
		res.status(500).json({message: error.message });
	}
});


// DELETE en produkt
app.delete('/api/products/:id', async (req, res) => {
	try {
		const { id } = req.params;
		const product = await Product.findByIdAndDelete(id);
		if (!product) {
			return res.status(404).json({message: 'Product not found'});
		}
		res.status(200).json({message: 'Product deleted'});
	} catch (error) {
		res.status(500).json({message: error.message });
	}
});


//mongodb connection /
mongoose.connect("mongodb+srv://betlomsak:cq5P5zBxYSOtCP5H@backendkth.tsc25h7.mongodb.net/?retryWrites=true&w=majority&appName=BackendKTH")

.then(() => {
	console.log("Connected to the database");
	app.listen(3000, () => {
		console.log('Server is running on port 3000');
	});
})
.catch(() => {
	console.log("Failed Connecting to the database");
});