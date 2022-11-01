    import React, { useState, useEffect } from 'react'
    import { Link } from 'react-router-dom'
    import { Form, Button, Row, Col } from 'react-bootstrap'
    import { useDispatch, useSelector } from 'react-redux'
    import Message from '../components/Message'
    import Loader from '../components/Loader'
    import FormContainer from '../components/FormContainer'
    import { createCoralMultipolygon } from '../actions/coralMultiActions'
    
    const AddMultiPolygonCoral = ({ location, history }) => {
      const [Id, setId] = useState('')
      const [gridcode, setgridcode] = useState('')
      const [coordinates, setPassword] = useState('')
      const [confirmPassword, setConfirmPassword] = useState('')
      const [message, setMessage] = useState(null)
    
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
    
      // const handleChange = e => {
      //   const fileReader = new FileReader();
      //   fileReader.readAsText(e.target.files[0], "UTF-8");
      //   fileReader.onload = e => {
      //     console.log("e.target.result", e.target.result);
      //     setFiles(e.target.result);
      //   };
      // };
    
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
    
           


          console.log('features',result.features)
          const Id= result.features[0].properties.Id
          const gridcode= result.features[0].properties.gridcode
          const coordinates=result.features[0].geometry.coordinates
          console.log('All data',Id,gridcode,coordinates)
          
    
          dispatch(createCoralMultipolygon(result.features))

          // const featuresArray = result.features.map(mp=>{
          //   const Id= mp.properties.Id
          //   const gridcode=mp.properties.gridcode
          //   // const FID_FiCB_M= mp.properties.FID_FiCB_M
          //   // const FID_FiCB_1=mp.properties.FIB_FiCB_1
          //   // const Id_1= mp.properties.Id_1
          //   // const gridcode_1=mp.properties.gridcode_1
          //   const coordinates=mp.geometry.coordinates
          //   dispatch(createCoralMultipolygon(result.features))
          //   //console.log('mp',mp,'CORRDas',coordinates)

          // })

          // dispatch(createCoralMultipolygon(Id,gridcode,FID_FiCB_M,FID_FiCB_1,gridcode_1,Id_1,coordiates))
            
        };
        
      }
    
      return (
        <FormContainer>
          <h1>Upload MultiPolygon Coral Data</h1>
    
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
