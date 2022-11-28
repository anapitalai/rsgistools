import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Carousel, CarouselItem, Image } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Loader from './Loader'
import Message from './Message'
import { listTopProducts } from '../actions/productActions'

const MortalityCarousel = () => {
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
                  <Carousel.Item key='z'>
          <Link to='#'>
            <Image src='/coral/recovery.JPG' alt='product.name' fluid />
            <Carousel.Caption className='carousel-caption'>
              <h2>
                Recovering bleached Coral
              </h2>
            </Carousel.Caption>
          </Link>

        </Carousel.Item>
            <Carousel.Item key='v'>
          <Link to=''>
            <Image src='/coral/cbnm.jpg' alt='product.name' fluid />
            <Carousel.Caption className='carousel-caption'>
              <h2>
                Bleached Coral
              </h2>
            </Carousel.Caption>
          </Link>

        </Carousel.Item>
        <CarouselItem>
        <Link to=''>
            <Image src='/coral/cbnm3.jpg' alt='product.name' fluid />
            <Carousel.Caption className='carousel-caption'>
              <h2>
                Bleach Coral Species
              </h2>
            </Carousel.Caption>
          </Link>
        </CarouselItem>
    </Carousel>
  )
}

export default MortalityCarousel
