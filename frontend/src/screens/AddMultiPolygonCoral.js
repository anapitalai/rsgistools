    import React, { useState, useEffect } from 'react'
    import { Link } from 'react-router-dom'
    import { Form, Button, Row, Col } from 'react-bootstrap'
    import { useDispatch, useSelector } from 'react-redux'
    import Message from '../components/Message'
    import Loader from '../components/Loader'
    import FormContainer from '../components/FormContainer'
    //import { createCoralMultipolygon } from '../actions/coralMultiActions'

    import {
      listMultiCoral,
      createCoralMultipolygon
    } from '../actions/coralMultiActions'

    
    import { CORALMULTI_CREATE_RESET } from '../constants/coralMultiConstants'

    
    const AddMultiPolygonCoral = ({ location, history,match }) => {
      const pageNumber = match.params.pageNumber || 1

      const dispatch = useDispatch()
    
      const userRegister = useSelector((state) => state.userRegister)
      //const { loading, error, userInfo } = userRegister
    
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
        dispatch({ type: CORALMULTI_CREATE_RESET })
    
        if (!userInfo || !userInfo.isAdmin) {
          history.push('/login')
        }
    
        if (successCreate) {
          history.push('/admin/map')
        } else {
          dispatch(listMultiCoral('', pageNumber))
        }
      }, [
        dispatch,
        history,
        userInfo,
        successCreate,
        createdCoral,
        pageNumber,
      ])
    
      const [files, setFiles] = useState("");
    
      const submitHandler = (e) => {
        e.preventDefault()
        const fileReader = new FileReader()
        fileReader.readAsText(e.target.files[0],'UTF-8')
        fileReader.onload = e => {
          console.log("e.target.result", e.target.result);
          const geo=e.target.result
          setFiles(geo); 
          const result=JSON.parse(geo);
          console.log('XXX',result)
          dispatch(createCoralMultipolygon(result.name,result.features))

        };
        
      }   
      return (
        
        <FormContainer>
          <h1>Upload MultiPolygon Coral Data</h1>
          {errorCreate && <Message variant='danger'>{errorCreate}</Message>}
      {loadingCreate && <Loader />}  
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
    
export default AddMultiPolygonCoral
