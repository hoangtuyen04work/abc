// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './App.css'
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";

import Home from "./pages/Home/Home";
// import RoomPage from './pages/RoomPage/RoomPage'
// import RoomDetails from './pages/RoomDetails/RoomDetails'

// import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Login from "./pages/Login/Login";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import Sidebar from "./components/Sidebar/Sidebar";
import { Dashboard } from "./pages/Sidebar/Dashboard";
import DashboardLayout from "./components/Layout/DashBoardLayout";
import UserList from "./pages/Sidebar/UserList";
import UserProfile from "./pages/Sidebar/UserProfile";
import Printers from "./pages/Sidebar/Printers";
import AdminPrinterList from "./pages/Sidebar/AdminPrinterList";
import AddPrinter from "./pages/Sidebar/AddPrinter";
import Payment from "./pages/Sidebar/Payment";
import UploadFilePage from "./pages/Sidebar/UploadFile";
import FileConfigurationPage from "./pages/Printer/FileConfiguration";
import { ToastContainer } from "react-toastify";
import Report from "./pages/Sidebar/Report";
import StudentReport from "./pages/Sidebar/StudentReport";
import StudentRegister from "./pages/Register/StudentRegister";
import AdminRegister from "./pages/Register/AdminRegister";
// import PrivateRoute from './router/PrivateRoutes'
import UserReviews from "./pages/Sidebar/UserReviews";
function App() {
  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            // <DashboardLayout>
            <Home />
            // </DashboardLayout>
          }
        ></Route>

        <Route
          path="login"
          element={
            // <DashboardLayout>
            <Login />
            // </DashboardLayout>
          }
        ></Route>

        <Route path="/register/student" element={<StudentRegister />} />
        <Route path="/register/admin" element={<AdminRegister />} />

        <Route
          path="/dashboard"
          element={
            // <PrivateRoute>
            // <Layout>
            <DashboardLayout>
              <Dashboard />
            </DashboardLayout>
            // </Layout>
            // </PrivateRoute>
          }
        />

        <Route
          path="/Payment"
          element={
            // <PrivateRoute>
            // <Layout>
            <DashboardLayout>
              <Payment />
            </DashboardLayout>
            // </Layout>
            // </PrivateRoute>
          }
        />
        <Route
          path="/printers"
          element={
            // <PrivateRoute>
            // <Layout>
            <DashboardLayout>
              <Printers />
            </DashboardLayout>
            // </Layout>
            // </PrivateRoute>
          }
        />

        <Route
          path="/uploadFile/fileConfigurationPage"
          element={
            // <Layout>
            <DashboardLayout>
              <FileConfigurationPage />
            </DashboardLayout>
            // </Layout>
          }
        />

        <Route
          path="/uploadFile"
          element={
            // <Layout>
            <DashboardLayout>
              <UploadFilePage />
            </DashboardLayout>
            // </Layout>
          }
        />

        <Route
          path="/profile"
          element={
            // <PrivateRoute>
            // <Layout>
            <DashboardLayout>
              <UserProfile />
            </DashboardLayout>
            // </Layout>
            // </PrivateRoute>
          }
        />

        <Route
          path="/studentreport"
          element={
            // <PrivateRoute>
            // <Layout>
            <DashboardLayout>
              <StudentReport />
            </DashboardLayout>
            // </Layout>
            // </PrivateRoute>
          }
        />

        <Route
          path="/admin/userlist"
          element={
            // <PrivateRoute>
            // <Layout>
            <DashboardLayout>
              <UserList />
            </DashboardLayout>
            // </Layout>
            // </PrivateRoute>
          }
        />
        <Route
          path="/admin/UserReviews"
          element={
            // <PrivateRoute>
            // <Layout>
            <DashboardLayout>
              <UserReviews />
            </DashboardLayout>
            // </Layout>
            // </PrivateRoute>
          }
        />
        <Route
          path="/admin/report"
          element={
            // <PrivateRoute>
            // <Layout>
            <DashboardLayout>
              <Report />
            </DashboardLayout>
            // </Layout>
            // </PrivateRoute>
          }
        />

        <Route
          path="/admin/printerlist"
          element={
            // <PrivateRoute>
            // <Layout>
            <DashboardLayout>
              <AdminPrinterList />
            </DashboardLayout>
            // </Layout>
            // </PrivateRoute>
          }
        />

        <Route
          path="/admin/addprinter"
          element={
            // <PrivateRoute>
            // <Layout>
            <DashboardLayout>
              <AddPrinter />
            </DashboardLayout>
            // </Layout>
            // </PrivateRoute>
          }
        />
      </Routes>
      <ToastContainer />
    </>
  );
}

export default App;
