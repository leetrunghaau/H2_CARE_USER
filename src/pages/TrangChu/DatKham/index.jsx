import Banner from "../../../components/TrangChu/Banner"
import ChuyenKhoa from "../../../components/TrangChu/ChuyenKhoa"
import CKhoa from "../../../components/TrangChu/ChuyenKhoa/CKhoa"
import DatKhamTabs from "./DatKhamTab"
import TimDatDoctor from "./TimDatDoctor"

const DatKham = () => {
  return (
    <div>
        <Banner/>
        <DatKhamTabs/>
        <CKhoa/>
        <TimDatDoctor/>
    </div>
  )
}
export default DatKham