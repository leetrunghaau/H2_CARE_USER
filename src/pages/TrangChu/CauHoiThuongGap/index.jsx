import { Row, Col, Button, Select, Card, Typography, Avatar, Space } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { useEffect, useState } from 'react';
import './CauHoiThuongGap.css';
import { useNavigate } from 'react-router-dom';
import { fetchAllChuyenKhoa, getAllCauHoi } from '../../../services/apiDoctor';
import { IoBagAddSharp } from 'react-icons/io5';
import ModalCauHoi from '../../../components/TrangChu/ModalDoiMK/ModalCauHoi';
const { Title, Paragraph, Text } = Typography;

const questionCategories = [
  { label: 'Tất cả', value: 'all' },
  { label: 'Tiêu hóa', value: 'tieuhoa' },
  { label: 'Tim mạch', value: 'timmach' },
  { label: 'Nhi khoa', value: 'nhi' },
  { label: 'Da liễu', value: 'dalieu' },
];

const mockAnswers = [
  {
    id: 1,
    question: 'Tôi thường xuyên bị đau bụng sau ăn tối, nguyên nhân là gì?',
    answer:
      'Triệu chứng này có thể liên quan đến rối loạn tiêu hóa hoặc viêm loét dạ dày. Bạn nên đi nội soi tiêu hóa sớm để kiểm tra chính xác.',
    doctor: {
      name: 'TS. BS. Nguyễn Văn A',
      title: 'Chuyên khoa Tiêu hóa',
      avatar: '/images/bs1.jpg',
    },
  },
  {
    id: 2,
    question: 'Bé nhà tôi 3 tuổi bị sốt nhẹ và ho, tôi nên làm gì?',
    answer:
      'Bạn nên theo dõi nhiệt độ và cho bé uống đủ nước. Nếu ho kéo dài hoặc sốt trên 38.5°C nhiều lần/ngày, nên đưa bé đi khám bác sĩ nhi.',
    doctor: {
      name: 'BS. Trần Thị B',
      title: 'Chuyên khoa Nhi',
      avatar: '/images/bs2.jpg',
    },
  },
];

const CauHoiThuongGap = () => {
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [dataAllCauHoi, setDataAllCauHoi] = useState([])
    const navigate = useNavigate()
    const [dataChuyenKhoa, setDataChuyenKhoa] = useState([])   
    const [selectedLocTheoChuyenKhoa, setSelectedLocTheoChuyenKhoa] = useState([]);
    const [openModalCauHoi, setOpenModalCauHoi] = useState(false);

    useEffect(() => {
        fetchListCauHoi()
    }, [selectedLocTheoChuyenKhoa])

    useEffect(() => {
        fetchAllChuyenKhoaDoctor()
    }, [])

    const fetchListCauHoi = async () => {

        let query = ''
        if (selectedLocTheoChuyenKhoa && selectedLocTheoChuyenKhoa.length > 0) {
            query += `&locTheoChuyenKhoa=${encodeURIComponent(JSON.stringify(selectedLocTheoChuyenKhoa))}`;
        }
        const res = await getAllCauHoi(query)
        console.log("res all cauhoi: ", res);
        if(res && res.data) {
            setDataAllCauHoi(res.data)
        }
    }

    const fetchAllChuyenKhoaDoctor = async () => {
        let query = `page=1&limit=1000`
        let res = await fetchAllChuyenKhoa(query)
        if(res && res.data) {
            setDataChuyenKhoa(res.data)
        }
    }   

    const onChangeTheoChuyenKhoa = (e) => {
        console.log("e: ", e);
        setSelectedLocTheoChuyenKhoa(e)
    };

    const chuyenKhoaOptions = [
        {
            value: null,
            label: <span>Tất cả chuyên khoa</span>,
        },
        ...dataChuyenKhoa.map(item => ({
            value: item._id,
            label: (
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <img
                src={`${import.meta.env.VITE_BACKEND_URL}/uploads/${item.image}`}
                alt={item.name}
                style={{ width: 24, height: 24, borderRadius: '50%', objectFit: 'cover' }}
                />
                <span>{item.name}</span>
            </div>
            ),
        })),
    ];

  return (
    <div style={{ maxWidth: 1100, margin: '0 auto', padding: 24 }}>
      {/* Header */}
      <Row justify="space-between" align="middle" style={{ marginBottom: 24 }}>
        <Col xs={24} sm={16}>
          <Title level={3}>Hỏi đáp cùng bác sĩ</Title>
        </Col>
        <Col xs={24} sm={8} style={{ textAlign: 'right' }}>
          <Button icon={<PlusOutlined />} type="primary" size="large" className='btn-datcauhoi' onClick={() => setOpenModalCauHoi(true)}>
            Đặt câu hỏi
          </Button>
        </Col>
      </Row>

      {/* Select chuyên khoa */}
      <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
        <Col xs={24} sm={12} md={8}>            
            <Select
                size="large"
                suffixIcon={<IoBagAddSharp size={20} />}
                placeholder="Tìm câu hỏi theo chuyên khoa"
                className="filter-select"
                style={{ width: '100%' }}
                options={chuyenKhoaOptions}                
                value={selectedLocTheoChuyenKhoa}
                onChange={(e) => onChangeTheoChuyenKhoa(e)}
                allowClear
                onClear={() => {
                    navigate('/cau-hoi-thuong-gap'); // 👈 trigger lại tìm tất cả
                }}
            />
        </Col>
      </Row>

      {/* Danh sách câu hỏi và trả lời */}
      { dataAllCauHoi.length > 0 ?
        dataAllCauHoi.map((item) => (
            <Card key={item.id} style={{ marginBottom: 24 }}>
            <Row gutter={[16, 16]}>
                {/* Nội dung câu hỏi & trả lời */}
                <Col xs={24}>
                <Text strong style={{ fontSize: 16, color: '#1677ff' }}>❓ Câu hỏi:</Text>
                <Paragraph style={{ marginBottom: 16, marginLeft: 18, fontSize: 18 }}>{item.cauHoi}</Paragraph>

                <Text strong style={{ fontSize: 16, color: '#52c41a' }}>💬 Được trả lời bởi:</Text>
                <Row gutter={16} align="middle">
                    <Col xs={5} sm={3}>
                    <Avatar size={64} src={`${import.meta.env.VITE_BACKEND_URL}/uploads/${item?.doctors.image}`} />
                    </Col>
                    <Col xs={19} sm={20}>
                    <Space direction="vertical" size={0}>
                        <Text style={{fontSize: 18}} strong>{item?.doctors.chucVuId.map(item => item?.name).join(', ')}</Text>
                        <Text style={{ fontSize: 16 }}>{item?.doctors.lastName} {item?.doctors.firstName}</Text>
                    </Space>
                    <Paragraph style={{ marginTop: 8, fontSize: 16, color:'blue' }}>💬 Trả lời: {item.cauTraLoi}</Paragraph>
                    </Col>
                </Row>
                </Col>
            </Row>
            </Card>
        )) : <>
            <Card style={{ marginBottom: 24, textAlign: 'center' }}>
                <Text type="secondary" style={{ fontSize: 16 }}>⚠ Chưa có câu hỏi nào được đặt</Text>
            </Card>
      </>
    }

    <ModalCauHoi
        openModalCauHoi={openModalCauHoi}
        setOpenModalCauHoi={setOpenModalCauHoi}
    /> 
    </div>
  );
};

export default CauHoiThuongGap;
