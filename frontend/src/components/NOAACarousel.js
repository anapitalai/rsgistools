import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Carousel, CarouselItem, Image } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Loader from './Loader'
import Message from './Message'
import { listTopProducts } from '../actions/productActions'

const NOAACarousel = () => {
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
            <Carousel.Item key='_id'>
          <Link to=''>
            <Image src='/noaa/NOAA_BleachngAlertArea_Pacific_19112022.jpg' alt='product.name' fluid />
            <Carousel.Caption className='carousel-caption'>
              <h2>
                NOAA Sea Surface Temperature on the 19th of November 2022
              </h2>
            </Carousel.Caption>
          </Link>

        </Carousel.Item>
        <CarouselItem>
        <Link to=''>
            <Image src='/noaa/NOAA_BleachngAlertArea_Pacific_20112022.jpg' alt='product.name' fluid />
            <Carousel.Caption className='carousel-caption'>
              <h2>
              NOAA Sea Surface Temperature on the 20th of November 2022
              </h2>
            </Carousel.Caption>
          </Link>
        </CarouselItem>
    </Carousel>
  )
}

export default NOAACarousel
