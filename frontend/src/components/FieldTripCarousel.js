import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Carousel, CarouselItem, Image } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Loader from './Loader'
import Message from './Message'
import { listTopProducts } from '../actions/productActions'

const FieldTripCarousel = () => {
  const dispatch = useDispatch()

  const productTopRated = useSelector((state) => state.productTopRated)
  const { loading, error, products } = productTopRated

  useEffect(() => {
    dispatch(listTopProducts())
  }, [dispatch])

  return loading ? (
    <Loader />
  ) : error ? (
    <Message variant='danger'>{error}</Message>
  ) : (
    <Carousel pause='hover' className='bg-dark'>
           <Carousel.Item key='id'>
          <Link to='#'>
            <Image src='/field/line_transect_measurement/op1.jpg' alt='product.name' fluid />
            <Carousel.Caption className='carousel-caption'>
              <h2>
                Line Transect Measurement
              </h2>
            </Carousel.Caption>
          </Link>
        </Carousel.Item>

        <Carousel.Item key='id'>
          <Link to='#'>
            <Image src='/field/line_transect_measurement/op2.jpg' alt='product.name' fluid />
            <Carousel.Caption className='carousel-caption'>
              <h2>
                Line Transect Measurement
              </h2>
            </Carousel.Caption>
          </Link>
        </Carousel.Item>

        <Carousel.Item key='id'>
          <Link to='#'>
            <Image src='/field/line_transect_measurement/op3.jpg' alt='product.name' fluid />
            <Carousel.Caption className='carousel-caption'>
              <h2>
                Line Transect Measurement
              </h2>
            </Carousel.Caption>
          </Link>
        </Carousel.Item>

        <Carousel.Item key='id'>
          <Link to='#'>
            <Image src='/field/line_transect_measurement/op4.jpg' alt='product.name' fluid />
            <Carousel.Caption className='carousel-caption'>
              <h2>
                Line Transect Measurement
              </h2>
            </Carousel.Caption>
          </Link>
        </Carousel.Item>
        <Carousel.Item key='id'>
          <Link to='#'>
            <Image src='/field/line_transect_measurement/op5.jpg' alt='product.name' fluid />
            <Carousel.Caption className='carousel-caption'>
              <h2>
                Line Transect Measurement
              </h2>
            </Carousel.Caption>
          </Link>
        </Carousel.Item>

        <Carousel.Item key='id'>
          <Link to='#'>
            <Image src='/field/line_transect_measurement/op6.jpg' alt='product.name' fluid />
            <Carousel.Caption className='carousel-caption'>
              <h2>
                Line Transect Measurement
              </h2>
            </Carousel.Caption>
          </Link>
        </Carousel.Item>

        <Carousel.Item key='id'>
          <Link to='#'>
            <Image src='/field/line_transect_measurement/op7.jpg' alt='product.name' fluid />
            <Carousel.Caption className='carousel-caption'>
              <h2>
                Line Transect Measurement
              </h2>
            </Carousel.Caption>
          </Link>
        </Carousel.Item>

        <Carousel.Item key='id'>
          <Link to='#'>
            <Image src='/field/line_transect_measurement/op8.jpg' alt='product.name' fluid />
            <Carousel.Caption className='carousel-caption'>
              <h2>
                Line Transect Measurement
              </h2>
            </Carousel.Caption>
          </Link>
        </Carousel.Item>
        {/* next */}
        <Carousel.Item key='id'>
          <Link to='#'>
            <Image src='/field/temperature_profile_measurement/op1.JPG' alt='product.name' fluid />
            <Carousel.Caption className='carousel-caption'>
              <h2>
                Temperature Profile Measurement
              </h2>
            </Carousel.Caption>
          </Link>
        </Carousel.Item>

        <Carousel.Item key='id'>
          <Link to='#'>
            <Image src='/field/temperature_profile_measurement/op2.JPG' alt='product.name' fluid />
            <Carousel.Caption className='carousel-caption'>
              <h2>
Temperature Profile Measurement              </h2>
            </Carousel.Caption>
          </Link>
        </Carousel.Item>

        <Carousel.Item key='id'>
          <Link to='#'>
            <Image src='/field/temperature_profile_measurement/op3.JPG' alt='product.name' fluid />
            <Carousel.Caption className='carousel-caption'>
              <h2>
Temperature Profile Measurement              </h2>
            </Carousel.Caption>
          </Link>
        </Carousel.Item>

        <Carousel.Item key='id'>
          <Link to='#'>
            <Image src='/field/temperature_profile_measurement/op4.JPG' alt='product.name' fluid />
            <Carousel.Caption className='carousel-caption'>
              <h2>
Temperature Profile Measurement              </h2>
            </Carousel.Caption>
          </Link>
        </Carousel.Item>
        <Carousel.Item key='id'>
          <Link to='#'>
            <Image src='/field/temperature_profile_measurement/op5.JPG' alt='product.name' fluid />
            <Carousel.Caption className='carousel-caption'>
              <h2>
Temperature Profile Measurement             
 </h2>
            </Carousel.Caption>
          </Link>
        </Carousel.Item>
        

    </Carousel>
  )
}

export default FieldTripCarousel
