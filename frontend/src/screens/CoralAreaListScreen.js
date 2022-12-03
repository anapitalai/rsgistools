import React, { useEffect } from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { Table, Button, Row, Col, Nav } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import Paginate from '../components/Paginate'

import {
  listMultiCoral,
  deleteCoral,
  createCoralMultipolygon
} from '../actions/coralMultiActions'

import { CORALMULTI_CREATE_RESET } from '../constants/coralMultiConstants'

const CoralListScreen = ({ history, match }) => {
  const pageNumber = match.params.pageNumber || 1

  const dispatch = useDispatch()


	const coralMultiList = useSelector((state) => state.coralMultiList);
	const { loading, error, corals, page, pages } = coralMultiList;
  

  const coralCreate = useSelector((state) => state.coralCreate)
  const {
    loading: loadingCreate,
    error: errorCreate,
    success: successCreate,
    coral: createdCoral,
  } = coralCreate

  const coralDelete = useSelector((state) => state.coralDelete)
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = coralDelete


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
    successDelete,
    successCreate,
    createdCoral,
    pageNumber,
  ])

  const deleteHandler = (id) => {
    if (window.confirm('Are you sure')) {
      dispatch(deleteCoral(id))
    }
  }

  const createCoralHandler = () => {
    dispatch(createCoralMultipolygon())
  }


  return (
    <>
      <Row className='align-items-center'>
        <Col>
          <h1>Coral Bleaching Data</h1>
        </Col>
        <Col className='text-right'>
        {/* <Button className='my-3' onClick={createCoralHandler}>
            <i className='fas fa-plus'></i> Create Coral Data
          </Button> */}
          			
			<LinkContainer to="/admin/multi">
				<Nav.Link>
					<i className="fas fa-upload" /> + BLEACHING DATA
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
                <th>NAME</th>
                <th>DATE</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              
               {corals.map((product) => (
                <tr key={product.name}>
                  <td>{product.name}</td>
                  <td>{product.createdAt}</td>

                  <td>
                    <LinkContainer to={`#`}>
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

export default CoralListScreen
