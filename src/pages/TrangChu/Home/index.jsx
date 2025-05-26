import Banner from "../../../components/TrangChu/Banner"
import ChuyenKhoa from "../../../components/TrangChu/ChuyenKhoa"
import DoctorListSlider from "../../../components/TrangChu/DoctorListSlider"
import DoiNguChuyenGia from "../../../components/TrangChu/DoiNguChuyenGia"
import PhongKhamListSlider from "../../../components/TrangChu/PhongKhamListSlider"

const Home = () => {
  return (
    <div>
        <Banner/>
        <DoctorListSlider/>
        <PhongKhamListSlider/>
        <ChuyenKhoa/>
        <DoiNguChuyenGia/>
    </div>
  )
}
export default Home