import { Row, Col, Typography, Button, Avatar } from 'antd';
import { RightOutlined } from '@ant-design/icons';
import './DoiNguChuyenGia.css'; // nên tách style
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchAllDoctor } from '../../../services/apiDoctor';

const { Title, Text, Paragraph } = Typography;
const securityItems = [
  {
    icon: '/iso-2-1-logo-svgrepo-com.svg',
    label: 'Hạ tầng đạt tiêu chuẩn\nISO 27001:2013',
  },
  {
    icon: '/security-svgrepo-com.svg',
    label: 'Thông tin sức khỏe được\nbảo mật theo quy chuẩn\nHIPAA',
  },
  {
    icon: '/user-scan-svgrepo-com.svg',
    label: 'Thành viên\nVNISA',
  },
  {
    icon: '/medical-examination-male-svgrepo-com.svg',
    label: 'Pentest định kì\nhằng năm',
  },
];

const DoiNguChuyenGia = () => {

    const [dataAllDoctor, setDataAllDoctor] = useState([])    
    const [dataSearch, setDataSearch] = useState('')

    const navigate = useNavigate()
    
    useEffect(() => {
        fetchListDoctor()
    }, [dataSearch])

    const fetchListDoctor = async () => {

        let query = 'page=1&limit=1000'
        if (dataSearch) {
            query += `&firstName=${encodeURIComponent(dataSearch)}`;
        }
        if (dataSearch) {
            query += `&lastName=${encodeURIComponent(dataSearch)}`;
        }
        const res = await fetchAllDoctor(query)
        console.log("res all doctor: ", res);
        if(res && res.data) {
            setDataAllDoctor(res.data)
        }
    }

    const handleRedirectDoctor = (item) => {
        navigate(`/chi-tiet-doctor?id=${item}`)
        window.scrollTo({ top: 0, behavior: 'smooth' }); // 👈 Cuộn lên đầu mượt
    }

  return (
    <div style={{ padding: '40px 16px', maxWidth: 1200, margin: '0 auto' }}>
      <Title level={4}>Đội ngũ chuyên gia</Title>

      <Row gutter={[32, 32]} style={{border: '2px solid #1677FF', padding: 20, borderRadius: 10, width:"100%", margin: '0 auto'}}>
        <Col xs={24} lg={16}>
          <Row gutter={[24, 24]} >
            {dataAllDoctor.slice(0, 6).map((doctor, index) => (
              <Col xs={24} sm={12} key={index} onClick={() => handleRedirectDoctor(doctor._id)} style={{ cursor: 'pointer' }}>
                <div className="chuyen-gia-box">
                  <img
                    width={100}
                    height={100}
                    style={{ borderRadius: '50%' }}
                    src={`${import.meta.env.VITE_BACKEND_URL}/uploads/${doctor.image}`}
                  />
                  <div style={{ marginLeft: 16 }}>
                    <Text strong style={{fontSize: 18}}>{doctor?.lastName} {doctor?.firstName}</Text>
                    <br />
                    <Text type="secondary" style={{fontSize: 15}}>{doctor?.chuyenKhoaId?.map(item => item?.name).join(', ')}</Text>
                  </div>
                </div>
              </Col>
            ))}
          </Row>
        </Col>

        <Col xs={24} lg={8}
            style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center', // căn giữa theo chiều dọc
                height: '100%',            // chiếm toàn bộ chiều cao hàng
                margin: "auto"
            }}
        >
            <Paragraph
                style={{
                fontSize: 18,
                color: '#374151',
                fontWeight: 500,
                lineHeight: '24px',
                marginBottom: 24,
                textAlign: 'justify',
                }}
            >
                Hội đồng tham vấn y khoa cùng đội ngũ biên tập viên là các bác sĩ,
                dược sĩ đảm bảo nội dung chúng tôi cung cấp chính xác về mặt y khoa
                và cập nhật những thông tin mới nhất.
            </Paragraph>

            <Button
                type="primary"
                size="large"
                className="doi-ngu-button"
                icon={<RightOutlined />}
                onClick={() => {
                  navigate('/dat-kham?tab=dat-kham-bac-si')
                  window.scrollTo({ top: 0, behavior: 'smooth' }); // 👈 Cuộn lên đầu mượt
                }}
            >
                Đội ngũ chuyên gia
            </Button>
        </Col>

      </Row>

      {/* Banner chính sách */}
     <div className="chuyen-gia-banner">
        <Row gutter={[24, 24]} align="middle">
            {/* BÊN TRÁI: Text 40% */}
            <Col xs={24} md={10}>
                <Text style={{ color: 'white', fontSize: 25, fontWeight: 500 }}>
                    Tạo nên một nguồn thông tin sức khỏe đáng tin cậy, dễ đọc, dễ hiểu cho mọi đối tượng độc giả
                </Text>                
            </Col>

            {/* BÊN PHẢI: Chính sách 60% */}
            <Col xs={24} md={14}>
                <Row gutter={[16, 16]}>
                    <Col xs={12} md={6}>
                        <img src="promis.svg" alt="" style={{ width: 120 }} />
                        <div style={{ color: 'white', marginTop: 8, fontWeight: 500 }}>
                            Biên soạn bởi Bác sĩ và Dược sĩ                            
                        </div>
                    </Col>
                    <Col xs={12} md={6}>
                        <img src="promis-2.svg" alt="" style={{ width: 120 }} />
                        <div style={{ color: 'white', marginTop: 8, fontWeight: 500 }}>
                            Chính sách biên tập nội dung minh bạch
                        </div>
                    </Col>
                    <Col xs={12} md={6}>
                        <img src="promis-3.svg" alt="" style={{ width: 120 }} />
                        <div style={{ color: 'white', marginTop: 8, fontWeight: 500 }}>
                            Chính sách quảng cáo
                        </div>
                    </Col>
                    <Col xs={12} md={6}>
                        <img src="promis-4.svg" alt="" style={{ width: 120 }} />
                        <div style={{ color: 'white', marginTop: 8, fontWeight: 500 }}>
                            Chính sách bảo mật
                        </div>
                    </Col>
                </Row>
            </Col>
        </Row>
        </div>

        <div className="data-security-wrapper">
          <Title level={2} style={{ textAlign: 'center', marginBottom: 8 }}>
            Bảo mật dữ liệu
          </Title>
          <Text style={{ display: 'block', textAlign: 'center', marginBottom: 32, color: '#777' }}>
            An toàn dữ liệu của bạn là ưu tiên hàng đầu của chúng tôi
          </Text>

          <Row gutter={[32, 32]} justify="center">
            {securityItems.map((item, index) => (
              <Col key={index} xs={24} sm={12} md={6} style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <img src={item.icon} alt="" style={{ width: 64, marginBottom: 16 }} />
                <Text style={{ whiteSpace: 'pre-line', fontWeight: 500, fontSize: 16 }}>{item.label}</Text>
              </Col>
            ))}
          </Row>

          <Paragraph style={{ textAlign: 'center', maxWidth: 800, margin: '40px auto 0', color: '#444', fontSize: 16 }}>
            Với nhiều năm kinh nghiệm trong lĩnh vực Y tế, chúng tôi hiểu rằng, dữ liệu sức khỏe của bạn
            chỉ thuộc về bạn, H2Care tuân thủ các chính sách bảo mật dữ liệu cao nhất trên thế giới.
          </Paragraph>
        </div>
    </div>
  );
};

export default DoiNguChuyenGia;
