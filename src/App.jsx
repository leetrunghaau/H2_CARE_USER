import { Routes, Route, Outlet } from "react-router-dom";
import Login from "./pages/Admin/Login";
import Register from "./pages/Admin/Register";
import HomeAdmin from "./pages/Admin/HomeAdmin";
import QuanLyDoctor from "./components/Admin/Doctor/QuanLyDoctor";
import QuanLyChucVu from "./components/Admin/ChucVu/QuanLyChucVu";
import QuanLyPhongKham from "./components/Admin/PhongKham/QuanLyPhongKham";
import QuanLyChuyenKhoa from "./components/Admin/ChuyenKhoa/QuanLyChuyenKhoa";
import KeHoachKhamBenh from "./components/Admin/KeHoachKhamBenh/KeHoachKhamBenh";
import QuanLyLichHen from "./components/Admin/LichHen/QuanLyLichHen";
import QuanLyKhachHang from "./components/Admin/BenhNhan/QuanLyKhachHang";
import Home from "./pages/TrangChu/Home";
import AppHeader from "./components/TrangChu/Header";
import AppFooter from "./components/TrangChu/Footer";
import DatKham from "./pages/TrangChu/DatKham";
import SearchAll from "./pages/TrangChu/SearchAll";
import DoctorDetail from "./pages/TrangChu/ChiTietDoctor";
import CauHoiThuongGap from "./pages/TrangChu/CauHoiThuongGap";
import CheckOutDatLich from "./pages/TrangChu/CheckOutDatLich";
import LichHen from "./pages/TrangChu/LichHen";
const MainLayout = () => {
  return (
    <>
      <AppHeader />
      <main style={{}}>
        <Outlet />
      </main>
      {/* <ChatBot /> */}
      <AppFooter />
    </>
  );
};

const App = () => {
  const routeConfig = [
    { path: "/", element: <Home /> },

    { path: "/admin/home-page-admin", element: <HomeAdmin /> }, // home page admin
    { path: "/admin/login-admin", element: <Login /> }, // Login admin
    { path: "/admin/register-admin", element: <Register /> }, // Register admin
    { path: "/admin/quan-ly-doctor", element: <QuanLyDoctor /> }, // quan ly doctor
    { path: "/admin/quan-ly-chuc-vu", element: <QuanLyChucVu /> }, // quan ly chuc vu
    { path: "/admin/quan-ly-phong-kham", element: <QuanLyPhongKham /> }, // quan ly phong kham
    { path: "/admin/quan-ly-chuyen-khoa", element: <QuanLyChuyenKhoa /> }, // quan ly chuyen khoa
    { path: "/admin/ke-hoach-doctor", element: <KeHoachKhamBenh /> }, // ke hoach kham benh
    { path: "/admin/quan-ly-lich-hen", element: <QuanLyLichHen /> }, // ke hoach kham benh
    { path: "/admin/quan-ly-kh", element: <QuanLyKhachHang /> }, // ke hoach kham benh
  ];
  return (
    <>
      <Routes>
        <Route element={<MainLayout />}>
          <Route index element={<Home />} /> {/*  path="/" */}
          <Route path="dat-kham" element={<DatKham />} />
          <Route path="search" element={<SearchAll />} />
          <Route path="chi-tiet-doctor" element={<DoctorDetail />} />
          <Route path="cau-hoi-thuong-gap" element={<CauHoiThuongGap />} />
          <Route path="dat-lich-checkout" element={<CheckOutDatLich />} />
          <Route path="lich-hen" element={<LichHen />} />
        </Route>
      </Routes>
    </>
  );
};

export default App;
