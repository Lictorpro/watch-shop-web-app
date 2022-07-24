import React from 'react';
import './Application.sass';
import { Container } from 'react-bootstrap';
import UserLoginPage from '../User/UserLoginPage/UserLoginPage';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import UserCategoryList from '../User/UserCategoryList/UserCategoryList';
import Menu from '../Menu/Menu';
import UserCategoryPage from '../User/UserCategoryPage/UserCategoryPage';
import UserHomePage from '../User/UserHome/UserHomePage';
import AdminDashboard from '../Administrator/Dashboard/AdminDashboard';
import AdminCategoryList from '../Administrator/Dashboard/AdminCategoryList';
import UserItemDetailsPage from '../User/UserItemDetailsPage/UserItemDetailsPage';
import AdminAdministratorList from '../Administrator/Dashboard/AdminAdministratorList';
import AdminAdministratorAdd from '../Administrator/Dashboard/AdminAdministratorAdd';
import AdminUserList from '../Administrator/Dashboard/AdminUserList';

function Application() {
  return (
    <Container className="mt-4">

      <BrowserRouter>
        <Menu />
        <Routes>


          <Route path='/auth/user/login' element={<UserLoginPage />} />
          <Route path='/categories' element={<UserCategoryList />} />
          <Route path='/' element={<UserHomePage />} />
          <Route path='/category/:id' element={<UserCategoryPage />} />
          <Route path='/item/:id' element={<UserItemDetailsPage />} />

          <Route path='/admin/dashboard' element={<AdminDashboard />} />
          <Route path='/admin/dashboard/category/list' element={<AdminCategoryList />} />
          <Route path='/admin/dashboard/administrator/list' element={<AdminAdministratorList />} />
          <Route path='/admin/dashboard/administrator/add' element={<AdminAdministratorAdd />} />

          <Route path='/admin/dashboard/user/list' element={<AdminUserList />} />

        </Routes>
      </BrowserRouter>
    </Container>
  );
}

export default Application;