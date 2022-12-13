import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Form, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import FormContainer from '../components/FormContainer'
import { createProduct } from '../actions/productActions'
import { PRODUCT_UPDATE_RESET } from '../constants/productConstants'

const AddProductScreen = ({ match, history }) => {

  const [image, setImage] = useState('')
  const [errors,setErrors] = useState({})


  const dispatch = useDispatch()


  const productCreate = useSelector((state) => state.productCreate)
  const {
    products,
    loading,
    error,
    success,
  } = productCreate

  function validate(values) {
    let errors = {};
  
    if (!values.name) {
      errors.name = "Required";
    }
  
    return errors;
  }

  const uploadFileHandler = async (e) => {
    e.preventDefault()
    setImage=e.target.files[0]
    // const file = e.target.files[0]


  }

  const submitHandler = async (e) => {
    e.preventDefault()
    try {
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }

      const { data } = await axios.post('/api/upload', formData, config)

      setImage(data)
      setUploading(false)
    } catch (error) {
      console.error(error)
      setUploading(false)
    }
  }

  useEffect(() => {
    setErrors(validate({ image }));
  }, [image]);

  return (
    <>
      <Link to='/' className='btn btn-light my-3'>
        Go Back
      </Link>
      <FormContainer>
        <h1>Insert Images</h1>
        {loading && <Loader />}
        {error && <Message variant='danger'>{error}</Message>}
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant='danger'>{error}</Message>
        ) : (
          <Form onSubmit={submitHandler}>
  
            <Form.Group controlId='image'>
              <Form.Label>Image</Form.Label>
              <Form.File
                id='image-file'
                label='Choose File'
                custom
                onChange={uploadFileHandler}
              ></Form.File>
              {/* {uploading && <Loader />} */}
            </Form.Group>



            <Button type='submit' variant='primary'>
              Upload
            </Button>
          </Form>
        )}
      </FormContainer>
    </>
  )
}

export default AddProductScreen
