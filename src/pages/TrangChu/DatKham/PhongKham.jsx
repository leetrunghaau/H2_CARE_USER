import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { fetchAllPhongKham } from "../../../services/apiDoctor"
import { Avatar, Col, Divider, Image, Row, Typography } from "antd"
import { IoHomeSharp } from "react-icons/io5"
import { UserOutlined } from "@ant-design/icons"
const { Text, Title } = Typography;

const PhongKham = () => {

    const [dataPK, setDataPK] = useState([])
    const navigate = useNavigate()
    const [dataSearch, setDataSearch] = useState('')

    useEffect(() => {
        fetchListPK()
    }, [])

    const fetchListPK = async () => {

        let query = 'page=1&limit=1000'
        if (dataSearch) {
            query += `&name=${encodeURIComponent(dataSearch)}`;
        }
        if (dataSearch) {
            query += `&address=${encodeURIComponent(dataSearch)}`;
        }
        const res = await fetchAllPhongKham(query)
        console.log("res all doctor: ", res);
        if(res && res.data) {
            setDataPK(res.data)
        }
    }
   
    const onSearchPK = (value) => {
        console.log("value: ",value);
        
        if (value) {
            navigate(`/search?_idPhongKham=${value}`);
            window.scrollTo({ top: 0, behavior: 'smooth' }); // 👈 Cuộn lên đầu mượt
        }
    };

    return (
        <div style={{ maxWidth: 950, margin: '30px auto' }}>
            <Row style={{ marginBottom: 5, }}>
                <Title level={3} style={{ margin: 0 }}> 
                Đa dạng phòng khám
                </Title>  
            </Row>
            <Text type="secondary" style={{ display: 'block', marginBottom: 32, fontWeight: "500" }}>
                Đặt khám dễ dàng và tiện lợi hơn với các phòng khám cùng nhiều chuyên khoa
            </Text>

            {dataPK.map((clinic, index) => (
                <div key={index} onClick={() => onSearchPK(clinic._id)} style={{ cursor: 'pointer' }}>
                <Row gutter={16} align="middle">
                    <Col xs={6} sm={5} md={4}>
                    <Image
                        src={`${import.meta.env.VITE_BACKEND_URL}/uploads/${clinic?.image}`}
                        alt={clinic.image}
                        style={{ width: '100%', borderRadius: 8, objectFit: 'cover' }}
                    />
                    </Col>
                    <Col xs={18} sm={19} md={20}>
                    <Title level={4} style={{ marginBottom: 4 }}>
                        {clinic.name}
                    </Title>
                    <Text type="secondary">{clinic.address}</Text>
                    </Col>
                </Row>
                {index !== dataPK.length - 1 && <Divider style={{ margin: '16px 0' }} />}
                </div>
            ))}
        </div>
    )
}
export default PhongKham