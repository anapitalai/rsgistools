import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Form, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import FormContainer from '../components/FormContainer'
import axios from 'axios'

import {
  createStore
} from '../actions/storeActions'


import { STORE_CREATE_RESET } from '../constants/storeConstants'


const AddStoreScreen = ({ location, history,match }) => {
  const pageNumber = match.params.pageNumber || 1

  const dispatch = useDispatch()

  const userRegister = useSelector((state) => state.userRegister)
 
  const redirect = location.search ? location.search.split('=')[1] : '/'

  const coralCreate = useSelector((state) => state.coralCreate)
  const {
    loading: loadingCreate,
    error: errorCreate,
    success: successCreate,
    coral: createdCoral,
  } = coralCreate


  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin


  useEffect(() => {
    dispatch({ type: STORE_CREATE_RESET })

    if (!userInfo || !userInfo.isAdmin) {
      history.push('/login')
    }

    if (successCreate) {
      history.push('/admin/map')
    } else {
      //dispatch(listMultiCoral('', pageNumber))
    }
  }, [
    dispatch,
    history,
    userInfo,
    successCreate,
    createdCoral,
    pageNumber,
  ])

  const [image, setImage] = useState("");
  const [uploading,setUploading]=useState('')

  const uploadFileHandler = async (e) => {
    const file = e.target.files[0]
    const formData = new FormData()
    formData.append('image', file)
    setUploading(true)

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
  return (
    
    <FormContainer>
      <h1>Upload A Store Image For Machine Learning</h1>
      {errorCreate && <Message variant='danger'>{errorCreate}</Message>}
  {loadingCreate && <Loader />}  
      <Form>
        <Form.Group>
          <Form.Label>Coral Data</Form.Label>
          <Form.Control
            type='file'
            placeholder='Select data'
            onChange={uploadFileHandler}         
          ></Form.Control>
          {uploading && <Loader />}
        </Form.Group>
        <Button type='submit' variant='primary'>
          Upload
        </Button>
      </Form>

    </FormContainer>
  )
}

export default AddStoreScreen
