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
          <Link to=''>
            <Image src='/field/dive2.JPG' alt='product.name' fluid />
            <Carousel.Caption className='carousel-caption'>
              <h2>
                Some Field Measurements
              </h2>
            </Carousel.Caption>
          </Link>
        </Carousel.Item>

       <Carousel.Item key='_i'>
          <Link to=''>
            <Image src='/field/dive3.JPG' alt='product.name' fluid />
            <Carousel.Caption className='carousel-caption'>
              <h2>
                Measurements
              </h2>
            </Carousel.Caption>
          </Link>
        </Carousel.Item>

       <Carousel.Item key='d'>
          <Link to=''>
            <Image src='/field/dive4.JPG' alt='product.name' fluid />
            <Carousel.Caption className='carousel-caption'>
              <h2>
                Field Measurements
              </h2>
            </Carousel.Caption>
          </Link>
        </Carousel.Item>



          <Carousel.Item key='a'>
          <Link to=''>
            <Image src='/field/drone.jpg' alt='product.name' fluid />
            <Carousel.Caption className='carousel-caption'>
              <h2>
                Mavic Drone Used
              </h2>
            </Carousel.Caption>
          </Link>

        </Carousel.Item>
        <CarouselItem>
        <Link to=''>
            <Image src='/field/gps.jpg' alt='product.name' fluid />
            <Carousel.Caption className='carousel-caption'>
              <h2>
                GPS Temperature Logger Location
              </h2>
            </Carousel.Caption>
          </Link>
        </CarouselItem>
    </Carousel>
  )
}

export default FieldTripCarousel
