import Store from '../models/storeModel.js';

import asyncHandler from 'express-async-handler';

// @desc  Get all stores
// @route GET /api/v1/stores
// @access Public
const getStores = asyncHandler(async (req, res) => {
	const pageSize = 10;
	const page = Number(req.query.pageNumber) || 1;

	const keyword = req.query.keyword
		? {
				name: {
					$regex: req.query.keyword,
					$options: 'i'
				}
			}
		: {};

	const count = await Store.countDocuments({ ...keyword });
	const stores = await Store.find({ ...keyword }).limit(pageSize).skip(pageSize * (page - 1));

	res.json({ stores, page, pages: Math.ceil(count / pageSize) });
});


// @desc  Create a store
// @route POST /api/stores
// @access Public

// const addStore = async (req, res, next) => {
//   try {
//     const store = await Store.create(req.body);

//     return res.status(201).json({
//       success: true,
//       data: store
//     });
//   } catch (err) {
//     console.error(err);
//     if (err.code === 11000) {
//       return res.status(400).json({ error: 'This store already exists' });
//     }
//     res.status(500).json({ error: 'Server error' });
//   }
// };
const addStore = asyncHandler(async (req, res) => {
	const { storeId, address,longitude, latitude } = req.body;

	const location = {
		type: 'Point',
		coordinates: [ longitude, latitude ]
	};

	console.log(req.body);
	const storeExists = await Store.findOne({ storeId });

	if (storeExists) {
		res.status(400);
		throw new Error('Store already exists');
	}

	const store = await Store.create({
		storeId,
		address,
		location
	});

	if (store) {
		res.status(201).json({
			storeId: store.storeId,
			address: store.address,
            location:store.location
		});
	} else {
		res.status(400);
		throw new Error('Invalid store data');
	}
});

export { getStores, addStore };


