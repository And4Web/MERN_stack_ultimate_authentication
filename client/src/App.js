import React from 'react';
import Layout from './components/layout/layout';
import {Routes, Route} from 'react-router-dom';
import Signin from './components/pages/Signin';
import Signup from './components/pages/Signup';
import Home from './components/pages/Home';
import Activate from './components/misc/Activate';

function App() {
  return (
    <Layout>
    <Routes>
      <Route exact path='/' element={<Home/>}/>
      <Route exact path='/signin' element={<Signin/>}/>
      <Route exact path='/signup' element={<Signup/>}/>
      <Route exact path='/auth/activate/:token' element={<Activate/>}/>
    </Routes>
    </Layout>
  );
}

export default App;
