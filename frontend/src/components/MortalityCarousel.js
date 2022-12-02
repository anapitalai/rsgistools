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
            <Image src='/coral/bleaching1.JPG' alt='product.name' fluid />
            <Carousel.Caption className='carousel-caption'>
              <h2>
                Recovering Bleached Coral
              </h2>
            </Carousel.Caption>
          </Link>

        </Carousel.Item>
            <Carousel.Item key='v'>
          <Link to=''>
            <Image src='/coral/bleaching3.JPG' alt='product.name' fluid />
            <Carousel.Caption className='carousel-caption'>
              <h2>
                Bleached Corals
              </h2>
            </Carousel.Caption>
          </Link>

        </Carousel.Item>
        <CarouselItem>
        <Link to=''>
            <Image src='/coral/bleaching2.JPG' alt='product.name' fluid />
            <Carousel.Caption className='carousel-caption'>
              <h2>
                Coral Species
              </h2>
            </Carousel.Caption>
          </Link>
        </CarouselItem>
        <CarouselItem>
        <Link to=''>
            <Image src='/coral/bleaching.jpg' alt='product.name' fluid />
            <Carousel.Caption className='carousel-caption'>
              <h2>
                Severely Bleached Coral Species
              </h2>
            </Carousel.Caption>
          </Link>
        </CarouselItem>
    </Carousel>
  )
}

export default MortalityCarousel
