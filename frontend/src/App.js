import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { Container } from 'react-bootstrap'
import Header from './components/Header'
import Footer from './components/Footer'
import HomeScreen from './screens/HomeScreen'
import ProductScreen from './screens/ProductScreen'
import CartScreen from './screens/CartScreen'
import LoginScreen from './screens/LoginScreen'
import RegisterScreen from './screens/RegisterScreen'
import ProfileScreen from './screens/ProfileScreen'
import ShippingScreen from './screens/ShippingScreen'
import PaymentScreen from './screens/PaymentScreen'
import PlaceOrderScreen from './screens/PlaceOrderScreen'
import OrderScreen from './screens/OrderScreen'
import UserListScreen from './screens/UserListScreen'
import UserEditScreen from './screens/UserEditScreen'
import ProductListScreen from './screens/ProductListScreen'
import ProductEditScreen from './screens/ProductEditScreen'
import OrderListScreen from './screens/OrderListScreen'
import CoralAreaListScreen from './screens/CoralAreaListScreen'


// just added

import MapScreen from './screens/MapScreen'
import AddStoreScreen from './screens/AddStoreScreen'
import AddCoralScreen from './screens/AddCoralScreen'

import AddTemperatureScreen from './screens/AddTemperatureScreen'
import AddMultiPolygonCoral from './screens/AddMultiPolygonCoral'
import MarineLifeScreen from './screens/MarineLifeScreen'
import CoralLifeScreen from './screens/CoralLifeScreen'
import FieldScreen from './screens/FieldScreen'
import NOAAScreen from './screens/NOAAScreen'
import TemperatureListScreen from './screens/TemperaureListScreen'

import UploadImageScreen from './screens/UploadImageScreen'



const App = () => {
  return (
    <Router>
      <Header />
      <main className='py-3'>
        <Container>
          <Route path='/order/:id' component={OrderScreen} />
          <Route path='/shipping' component={ShippingScreen} />
          <Route path='/payment' component={PaymentScreen} />
          <Route path='/placeorder' component={PlaceOrderScreen} />
          <Route path='/login' component={LoginScreen} />
          <Route path='/store' component={AddStoreScreen} />
          <Route path='/temperature' component={AddTemperatureScreen} />
          <Route path='/register' component={RegisterScreen} />
          <Route path='/profile' component={ProfileScreen} />

          <Route path='/product/:id' component={ProductScreen} />
          <Route path='/cart/:id?' component={CartScreen} />
          <Route path='/admin/userlist' component={UserListScreen} />
          <Route path='/admin/multi' component={AddMultiPolygonCoral} />

          <Route path='/admin/coralarealist' component={CoralAreaListScreen} />
          <Route path='/admin/temperaturelist' component={TemperatureListScreen} />
 

          <Route path='/admin/user/:id/edit' component={UserEditScreen} />

          <Route
            path='/admin/productlist'
            component={ProductListScreen}
            exact
          />
          <Route
            path='/admin/productlist/:pageNumber'
            component={ProductListScreen}
            exact
          />
          <Route path='/admin/product/:id/edit' component={ProductEditScreen} />
          <Route path='/admin/orderlist' component={OrderListScreen} />
          <Route path='/admin/map' component={MapScreen} />
          <Route path='/geo' component={AddCoralScreen} />
          <Route path='/marine' component={MarineLifeScreen} />
          <Route path='/coral' component={CoralLifeScreen} />
          <Route path='/NOAA' component={NOAAScreen} />
          <Route path='/field' component={FieldScreen} />
          <Route path='/uploads' component={UploadImageScreen} />


          <Route path='/search/:keyword' component={HomeScreen} exact />
          <Route path='/page/:pageNumber' component={HomeScreen} exact />
          <Route
            path='/search/:keyword/page/:pageNumber'
            component={HomeScreen}
            exact
          />
          <Route path='/' component={HomeScreen} exact />
        </Container>
      
      </main>
      <Footer />
    </Router>
  )
}

export default App
