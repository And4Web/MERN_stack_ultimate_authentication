import React from 'react';
import Layout from './components/layout/layout';
import {Routes, Route} from 'react-router-dom';
import Signin from './components/pages/Signin';
import Signup from './components/pages/Signup';

function App() {
  return (
    <Layout>
    <Routes>
      <Route exact path='/signin' element={<Signin/>}/>
      <Route exact path='/signup' element={<Signup/>}/>
    </Routes>
    </Layout>
  );
}

export default App;
