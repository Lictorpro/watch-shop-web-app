import React from 'react';
import './Application.sass';
import { Container } from 'react-bootstrap';
import UserLoginPage from '../User/UserLoginPage/UserLoginPage';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import UserCategoryList from '../User/UserCategoryList/UserCategoryList';
import Menu from '../Menu/Menu';
import UserCategoryPage from '../User/UserCategoryPage/UserCategoryPage';
import UserHomePage from '../User/UserHome/UserHomePage';

function Application() {
  return (
    <Container className="mt-4">
      
      <BrowserRouter>
      <Menu />
        <Routes>
        
          
          <Route  path='/auth/user/login' element={ <UserLoginPage />} />
          <Route  path='/categories' element={ <UserCategoryList /> } />
          <Route  path='/' element={ <UserHomePage /> } />
          <Route  path='/category/:id' element={<UserCategoryPage />} />
        </Routes>
        </BrowserRouter>
    </Container>
  );
}

export default Application;
