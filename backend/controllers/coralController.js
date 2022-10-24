import Coral from '../models/coralModel.js';

import asyncHandler from 'express-async-handler';

// @desc  Get all stores
// @route GET /api/v1/stores
// @access Public
const getCorals = asyncHandler(async (req, res) => {
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

	const count = await Coral.countDocuments({ ...keyword });
	const corals = await Coral.find({ ...keyword }).limit(pageSize).skip(pageSize * (page - 1));

	res.json({ corals, page, pages: Math.ceil(count / pageSize) });
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
const addCoral = asyncHandler(async (req, res) => {
	const { coralId,coralArea,coordinates } = req.body;


	// for(let i=0;i<coordinates.length;i++){
	

	// 	parcel = {
	// 		type: 'Polygon',
	// 		coordinates: [coordinates[i]]
	// 	};
    //     console.log(coordinates[i])
		
	// }
	

	const parcel = {
		type: 'Polygon',
		coordinates: coordinates
	};

	console.log(req.body);
		const coralExists = await Coral.findOne({ coralId });
	
		if (coralExists) {
			res.status(400);
			throw new Error('Coral Area already exists');
		}
	//whast saved into the db
		const coral = await Coral.create({
			coralId,
			coralArea,
			parcel
			
		});
	
		
		if (coral) {
			res.status(201).json({
				coralId: coral.coralId,
				coralArea: coral.coralArea,
				parcel:coral.parcel
			});
		} else {
			res.status(400);
			throw new Error('Invalid coral data');
		}
	


});

export { getCorals, addCoral };




