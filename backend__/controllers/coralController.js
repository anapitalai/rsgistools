import Coral from '../models/coralModel.js';

import asyncHandler from 'express-async-handler';

// @desc  Get all stores
// @route GET /api/v1/stores
// @access Public
// const getCorals = asyncHandler(async (req, res) => {
// 	const pageSize = 10;
// 	const page = Number(req.query.pageNumber) || 1;

// 	const keyword = req.query.keyword
// 		? {
// 				name: {
// 					$regex: req.query.keyword,
// 					$options: 'i'
// 				}
// 			}
// 		: {};

// 	const count = await Coral.countDocuments({ ...keyword });
// 	 const corals = await Coral.find();
// 	 res.json({ corals, page, pages: Math.ceil(count / pageSize) });
// });

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
       
		
		
		console.log('corals',corals.length)



	 res.json({ corals, page, pages: Math.ceil(count / pageSize) });

});


// @desc    Fetch single coral
// @route   GET /api/coral/:id
// @access  Public
const getCoralById = asyncHandler(async (req, res) => {
	const coral = await Coral.findById(req.params.id)
  
	if (coral) {
	  res.json(coral)
	} else {
	  res.status(404)
	  throw new Error('Coral Area not found')
	}
  })
  


// @desc  Create a store
// @route POST /api/stores
// @access Public

const addCoral = asyncHandler(async (req, res) => {
	const { coralId,coralArea,coordinates} = req.body;


	const geometry = {
		type: 'Polygon',
		coordinates: coordinates
	};
const properties={
	coralId:coralId,
	coralArea:coralArea
}
	const features={
		type:'Feature',
		properties,
		geometry

	}
	console.log(features)


	console.log(req.body);
		const coralExists = await Coral.findOne({ coralId });
	
		if (coralExists) {
			res.status(400);
			throw new Error('Coral Area already exists');
		}
	//whast saved into the db
   
		const coral = await Coral.create({
         features
		});


		if (coral) {
			res.status(201).json({
			
				coralId: coral.coralId,
				coralArea: coral.coralArea,
				
			});
		} else {
			res.status(400);
			throw new Error('Invalid coral data');
		}

});


export { getCorals, addCoral,getCoralById };






