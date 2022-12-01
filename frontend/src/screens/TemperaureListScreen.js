import React, { useEffect } from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { Table, Button, Row, Col, Nav } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import Paginate from '../components/Paginate'

import {
  listTemperatures,
  createTemperature
} from '../actions/temperatureActions'

import { TEMPERATURE_CREATE_RESET } from '../constants/temperatureConstants'

const TemperatureListScreen = ({ history, match }) => {
  const pageNumber = match.params.pageNumber || 1

  const dispatch = useDispatch()


	const temperatureList = useSelector((state) => state.temperatureList);
	const { loading, error, temperatures, page, pages } = temperatureList;
  

  const temperatureCreate = useSelector((state) => state.temperatureCreate)
  const {
    loading: loadingCreate,
    error: errorCreate,
    success: successCreate,
    temperature: createdTemperature,
  } = temperatureCreate

  const temperatureDelete = useSelector((state) => state.temperatureDelete)
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = temperatureDelete


  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  // useEffect(() => {

  //   if (userInfo || userInfo.isAdmin) {
  //     dispatch(listMultiCoral())
  //   }else{
  //   history.push('/login')
  //   }

  // }, [
  //   dispatch,
  //   history,
  //   userInfo,
  //   successDelete
  // ])


  useEffect(() => {
    dispatch({ type: TEMPERATURE_CREATE_RESET })

    if (!userInfo || !userInfo.isAdmin) {
      history.push('/login')
    }

    if (successCreate) {
      history.push(`/admin/temperatures/${createdTemperature._id}/edit`)
    } else {
      dispatch(listTemperatures('', pageNumber))
    }
  }, [
    dispatch,
    history,
    userInfo,
    successDelete,
    successCreate,
    createdTemperature,
    pageNumber,
  ])
  const deleteHandler = (id) => {
    if (window.confirm('Are you sure')) {
      dispatch(temperatureDelete(id))
    }
  }

  const createTemperatureHandler = () => {
    dispatch(createTemperature())
  }




  return (
    <>
      <Row className='align-items-center'>
        <Col>
          <h1>Collected Temperature</h1>
        </Col>
        <Col className='text-right'>
        {/* <Button className='my-3' onClick={createCoralHandler}>
            <i className='fas fa-plus'></i> Create Coral Data
          </Button> */}
          			
			<LinkContainer to="/temperature">
				<Nav.Link>
					<i className="fas fa-upload" /> + CORAL TEMPERATURE
				</Nav.Link>
			</LinkContainer>
        </Col>
      </Row>
      {loadingDelete && <Loader />}
      {errorDelete && <Message variant='danger'>{errorDelete}</Message>}
      {loadingCreate && <Loader />}
      {errorCreate && <Message variant='danger'>{errorCreate}</Message>}
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <>
          <Table striped bordered hover responsive className='table-sm'>
            <thead>
              <tr>
                <th>ID</th>
                <th>NAME</th>
                <th>3M</th>
                <th>5.5M</th>
                <th>9M</th>
                <th>CREATED AT</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              
               {temperatures.map((product) => (
                <tr key={product._id}>
                  <td>{product._id}</td>
                  <td>{product.location_name}</td>
                  <td>{product.temp_depth_3m}</td>
                  <td>{product.temp_depth_5_5m}</td>
                  <td>{product.temp_depth_9m}</td>


                  <td>
                    <LinkContainer to={`/admin/product/${product._id}/edit`}>
                      <Button variant='light' className='btn-sm'>
                        <i className='fas fa-edit'></i>
                      </Button>
                    </LinkContainer>
                    <Button
                      variant='danger'
                      className='btn-sm'
                      onClick={() => deleteHandler(product._id)}
                    >
                      <i className='fas fa-trash'></i>
                    </Button>
                  </td>
                </tr>
              ))}

            </tbody>
          </Table>
          <Paginate pages={pages} page={page} isAdmin={true} />
        </>
      )}
    </>
  )
}

export default TemperatureListScreen
