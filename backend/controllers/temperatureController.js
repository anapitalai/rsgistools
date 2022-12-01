import asyncHandler from 'express-async-handler'
import Temperature from '../models/temperatureModel.js'

// @desc    Fetch all products
// @route   GET /api/products
// @access  Public
const getTemperatures = asyncHandler(async (req, res) => {
  const pageSize = 10
  const page = Number(req.query.pageNumber) || 1

  const keyword = req.query.keyword
    ? {
        name: {
          $regex: req.query.keyword,
          $options: 'i',
        },
      }
    : {}

  const count = await Temperature.countDocuments({ ...keyword })
  const temperatures = await Temperature.find({ ...keyword })
    .limit(pageSize)
    .skip(pageSize * (page - 1))

  res.json({ temperatures, page, pages: Math.ceil(count / pageSize) })
})

// @desc    Fetch single product
// @route   GET /api/products/:id
// @access  Public
const getTemperatureById = asyncHandler(async (req, res) => {
  const temperature = await Temperature.findById(req.params.id)

  if (temperature) {
    res.json(temperature)
  } else {
    res.status(404)
    throw new Error('Temperature not found')
  }
})

// @desc    Delete a product
// @route   DELETE /api/products/:id
// @access  Private/Admin
const deleteTemperature = asyncHandler(async (req, res) => {
  const temperature = await Temperature.findById(req.params.id)

  if (temperature) {
    await temperature.remove()
    res.json({ message: 'Temperature removed' })
  } else {
    res.status(404)
    throw new Error('Temperature not found')
  }
})

// @desc    Create a temperature data
// @route   POST /api/temperatures
// @access  Private/Admin
const createTemperature = asyncHandler(async (req, res) => {
	const { location_name,latitude,longitude,date,time,temp_depth_3m,temp_depth_5_5m,temp_depth_9m } = req.body;

	const location = {
		type: 'Point',
		coordinates: [ longitude, latitude ]
	};

	console.log(req.body);
	const temperatureExists = await Temperature.findOne({ date });

	if (temperatureExists) {
		res.status(400);
		throw new Error('Temperature data already exists');
	}

	const temperature = await Temperature.create({
    date,
    time,
    location_name,
    location,
		temp_depth_3m,
    temp_depth_5_5m,
    temp_depth_9m,
	});


	if (temperature) {
		res.status(201).json({
			_id: temperature._id,
			date: temperature.date,
      time:temperature.time,
      location_name:temperature.location_name,
      location:temperature.location,
      temp_depth_3m:temperature.temp_depth_3m,
      temp_depth_5_5m:temperature.temp_depth_5_5m,
      temp_depth_9m:temperature.temp_depth_9m
		});
	} else {
		res.status(400);
		throw new Error('Invalid temperature data');
	}
});

// @desc    Update a product
// @route   PUT /api/products/:id
// @access  Private/Admin
const updateProduct = asyncHandler(async (req, res) => {
  const {
    name,
    price,
    description,
    image,
    brand,
    category,
    countInStock,
  } = req.body

  const product = await Product.findById(req.params.id)

  if (product) {
    product.name = name
    product.price = price
    product.description = description
    product.image = image
    product.brand = brand
    product.category = category
    product.countInStock = countInStock

    const updatedProduct = await product.save()
    res.json(updatedProduct)
  } else {
    res.status(404)
    throw new Error('Product not found')
  }
})

// @desc    Create new review
// @route   POST /api/products/:id/reviews
// @access  Private
const createProductReview = asyncHandler(async (req, res) => {
  const { rating, comment } = req.body

  const product = await Product.findById(req.params.id)

  if (product) {
    const alreadyReviewed = product.reviews.find(
      (r) => r.user.toString() === req.user._id.toString()
    )

    if (alreadyReviewed) {
      res.status(400)
      throw new Error('Product already reviewed')
    }

    const review = {
      name: req.user.name,
      rating: Number(rating),
      comment,
      user: req.user._id,
    }

    product.reviews.push(review)

    product.numReviews = product.reviews.length

    product.rating =
      product.reviews.reduce((acc, item) => item.rating + acc, 0) /
      product.reviews.length

    await product.save()
    res.status(201).json({ message: 'Review added' })
  } else {
    res.status(404)
    throw new Error('Product not found')
  }
})

// @desc    Get top rated products
// @route   GET /api/products/top
// @access  Public
const getTopProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({}).sort({ rating: -1 }).limit(3)

  res.json(products)
})

export {
  getTemperatures,
  getTemperatureById,

  deleteTemperature,
  createTemperature,
  updateProduct,
  createProductReview,
  getTopProducts,
}
