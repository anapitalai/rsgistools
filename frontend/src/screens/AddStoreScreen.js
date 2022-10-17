import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Form, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import FormContainer from '../components/FormContainer'
import { createStore } from '../actions/storeActions'


const AddStoreScreen = ({ location, history }) => {
  const [storeId, setStoreId] = useState('')
  const [address, setAddress] = useState('')
  const [latitude, setLatitude] = useState('')
  const [longitude, setLongitude] = useState('')
  const [message, setMessage] = useState(null)


  const dispatch = useDispatch()

  const storeCreate = useSelector((state) => state.storeCreate)
  const { loading, error, store } = storeCreate

  const redirect = location.search ? location.search.split('=')[1] : '/'

  useEffect(() => {
    if (store) {
      history.push(redirect)
    }
  }, [history, store, redirect])

  const submitHandler = (e) => {
    e.preventDefault()
    // if (storeId) {
    //   setMessage('Store location already exists')
    // } else {
      dispatch(createStore(storeId, address, latitude,longitude))
   // }
  }


  // const submitHandle = (e) => {
   
  //   e.preventDefault()
  //   dispatch(login(storeId, address,latitude,longitude))
  // }

  return (
    <FormContainer>
      <h1>Add New Store</h1>
      {error && <Message variant='danger'>{error}</Message>}
      {loading && <Loader />}

      <Form onSubmit={submitHandler}>
        <Form.Group controlId='storeId'>
          <Form.Label>StoreId</Form.Label>
          <Form.Control
            type='text'
            placeholder='Enter storeId'
            value={storeId}
            onChange={(e) => setStoreId(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId='address'>
          <Form.Label>Address</Form.Label>
          <Form.Control
            type='text'
            placeholder='Enter address'
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId='latitude'>
          <Form.Label>Latitude</Form.Label>
          <Form.Control
            type='text'
            placeholder='Enter lat'
            value={latitude}
            onChange={(e) => setLatitude(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId='longitude'>
          <Form.Label>Longitude</Form.Label>
          <Form.Control
            type='text'
            placeholder='Enter lng'
            value={longitude}
            onChange={(e) => setLongitude(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Button type='submit' variant='primary'>
          Add
        </Button>
      </Form>

      {/* <Row className='py-3'>
        <Col>
          New Store?{' '}
          <Link to={redirect ? `/register?redirect=${redirect}` : '/register'}>
            Register a new Store
          </Link>
        </Col>
      </Row> */}
    </FormContainer>
  )
}

export default AddStoreScreen
