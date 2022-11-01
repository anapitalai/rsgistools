import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Form, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import FormContainer from '../components/FormContainer'
import { createCoral } from '../actions/coralActions'

const AddCoralScreen = ({ location, history }) => {
  const [coralId, setName] = useState('')
  const [coralArea, setEmail] = useState('')
  const [coordinates, setPassword] = useState('')


  const dispatch = useDispatch()

  const userRegister = useSelector((state) => state.userRegister)
  const { loading, error, userInfo } = userRegister

  const redirect = location.search ? location.search.split('=')[1] : '/'

  useEffect(() => {
    if (userInfo) {
      history.push(redirect)
    }
  }, [history, userInfo, redirect])

  const [files, setFiles] = useState("");

  const handleChange = e => {
    const fileReader = new FileReader();
    fileReader.readAsText(e.target.files[0], "UTF-8");
    fileReader.onload = e => {
      console.log("e.target.result", e.target.result);
      setFiles(e.target.result);
    };
  };

  const submitHandler = (e) => {
    e.preventDefault()
    const fileReader = new FileReader()
    fileReader.readAsText(e.target.files[0],'UTF-8')
    fileReader.onload = e => {
      console.log("e.target.result", e.target.result);
      const geo=e.target.result
      setFiles(geo);

     
      const result=JSON.parse(geo);
      console.log(result.features)

      const coralId= result.features[0].properties.coralId
      const coralArea= result.features[0].properties.coralArea
      const coordinates=result.features[0].geometry.coordinates
      console.log(coralId,coralArea)
      console.log(coordinates)

      dispatch(createCoral(coralId,coralArea,coordinates))

        
    };
    

  }

  return (
    <FormContainer>
      <h1>Upload Coral Bleached Data</h1>

      <Form>
        <Form.Group>
          <Form.Label>Coral Data</Form.Label>
          <Form.Control
            type='file'
            placeholder='Select data'
            onChange={submitHandler}
            
          ></Form.Control>
        </Form.Group>

        

        <Button type='submit' variant='primary'>
          Upload
        </Button>
      </Form>

    </FormContainer>
  )
}

export default AddCoralScreen
