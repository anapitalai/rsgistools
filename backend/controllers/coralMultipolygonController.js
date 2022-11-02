import Coral from '../models/coralMultipolygonModel.js';

import asyncHandler from 'express-async-handler';


const getCoralMultipolygons = asyncHandler(async (req, res) => {
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


// @desc    Fetch single coral
// @route   GET /api/coral/:id
// @access  Public
const getCoralMultipolygonById = asyncHandler(async (req, res) => {
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


const addCoralMultiPolygon = asyncHandler(async (req, res) => {
	const { type,name,features} = req.body;
console.log(type,name,features)

	const geometry = {
		type: 'Polygon',
		coordinates: features[0].geometry.coordinates
	};
	console.log('cords',geometry)
const properties={
	Id:features[0].properties.Id,
	gridcode:features[0].properties.gridcode
}
	const featureArray={
		type:'Feature',
		properties,
		geometry

	}


    const id=features[0].properties.Id
	console.log(req.body);
		const coralExists = await Coral.findOne({ id });
	
		if (coralExists) {
			res.status(400);
			throw new Error('Coral Area already exists');
		}
	//whast saved into the db
   
		const coral = await Coral.create({
         features,name
		});


		if (coral) {
			res.status(201).json({
			
			features
				
			});
		} else {
			res.status(400);
			throw new Error('Invalid coral data');
		}

});






export { getCoralMultipolygons,addCoralMultiPolygon };






