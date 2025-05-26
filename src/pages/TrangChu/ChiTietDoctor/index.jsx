import { Row, Col, Typography, Tag, Button, Divider, Card, Space } from 'antd';
import { EnvironmentOutlined, ClockCircleOutlined } from '@ant-design/icons';
import './ChiTietDoctor.css'; // Import CSS file for styling
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { fetchDoctorById, getTimeSlotsByDoctorAndDate } from '../../../services/apiDoctor';
import moment from 'moment';
import BlurText from '../../../components/HieuUng/BlurText/BlurText';
const { Title, Text, Paragraph } = Typography;

const DoctorDetail = () => {

    const [open, setOpen] = useState(false);
    const [placement, setPlacement] = useState('top');
    const [showDetails, setShowDetails] = useState(false);
    const [hoveredIndex, setHoveredIndex] = useState(null); // State để theo dõi index của thẻ đang hover
    const [selectedDate, setSelectedDate] = useState(''); // State để lưu ngày đã chọn 
    const [dataDoctor, setDataDoctor] = useState();    
    const [hienThiTime, setHienThiTime] = useState('Bấm vào đây để xem lịch khám!'); // State để lưu ngày đã chọn  
    const [selectedTimeId, setSelectedTimeId] = useState(null); 
    const [timeGioList, setTimeGioList] = useState([]);    
    const [expanded, setExpanded] = useState(false);
    const navigate = useNavigate()

    let location = useLocation();
    let params = new URLSearchParams(location.search);
    const id = params.get("id"); // Lấy giá trị của tham số "id"

    useEffect(() => {
        fetchADoctorById(id);
    }, [id]);

    useEffect(() => {
        const fetchDoctorTimes = async () => {
            
            const doctorId = id
            const appointmentDate = selectedTimeId 
            if (!appointmentDate) return; // Kiểm tra nếu appointmentDate đã được chọn
            let query = `doctorId=${doctorId}&date=${appointmentDate}`

            const res = await getTimeSlotsByDoctorAndDate(query);
            console.log("res fetch: ", res);
            
            if (res && res.timeGioList) {                    
                setTimeGioList(res.timeGioList)         
            } else {
                // Xử lý lỗi nếu cần
                console.error('Error fetching time slots:', await res.json());
            }
        };
    
        fetchDoctorTimes();
    }, [selectedTimeId]);

    const fetchADoctorById = async (id) => {

        const res = await fetchDoctorById(id)
        console.log("res: ", res);
        if(res && res.data) {
            setDataDoctor(res.data)
        }
    }

    const formatCurrency = (value) => {
        if (value === null || value === undefined) return '';
        return `${value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')} VNĐ`;
    };

    const showDrawer = () => {
        setOpen(true);
    };
    const onClose = () => {
        setOpen(false);
    };
    const toggleDetails = () => {
        setShowDetails(!showDetails);
    };

    const englishToVietnameseDays = {
        "Sunday": "Chủ nhật",
        "Monday": "Thứ 2",
        "Tuesday": "Thứ 3",
        "Wednesday": "Thứ 4",
        "Thursday": "Thứ 5",
        "Friday": "Thứ 6",
        "Saturday": "Thứ 7"
    };   

    // hiển thị trong drawer
    const listTime = dataDoctor?.thoiGianKham.map(item => item.date) || [];        

    console.log("listTime: ",listTime);

    const styleTime = (index) => ({
        cursor: "pointer",
        fontSize: "18px",
        color: hoveredIndex === index ? 'red' : 'black', // Đổi màu chữ khi hover
    });
    
    
    const handleRedirectDoctor = (item, thoiGianKhamBenh, listTime) => {
        navigate(`/dat-lich-checkout?id=${item._id}&idGioKhamBenh=${thoiGianKhamBenh}&ngayKham=${listTime}`)
    }    

  return (
    <div style={{ background: '#f5f5f5', minHeight: '100vh', padding: '24px 0' }}>
    <div style={{
        maxWidth: 1000,
        margin: '0 auto',
        background: '#fff',
        borderRadius: 12,
        padding: 24,
        boxShadow: '0 4px 12px rgba(0,0,0,0.06)',
    }}>
      {/* Tiêu đề + Ảnh + Thông tin cơ bản */}
      <Card>
        <Row gutter={[16, 16]} align="middle">
          <Col xs={24} sm={6}>
            <img
              src={`${import.meta.env.VITE_BACKEND_URL}/uploads/${dataDoctor?.image}`} 
              alt="Doctor"
              style={{ width: '100%', maxWidth: 140, borderRadius: '50%' }}
            />
          </Col>
          <Col xs={24} sm={18}>
            <Title level={3}>
               {dataDoctor?.chucVuId?.[0]?.name} &nbsp;
                {dataDoctor?.lastName} {dataDoctor?.firstName}
            </Title>
            <Space style={{ marginBottom: 8 }}>
              <Tag color="blue">Bác sĩ</Tag>
              <Text>25 năm kinh nghiệm</Text>
            </Space>
            <div className='doctor-detail'>
                <strong>Chuyên khoa:</strong> &nbsp;
                {dataDoctor?.chuyenKhoaId?.map((item, index) => (
                <Tag color="cyan" key={index}>
                    {item?.name}
                </Tag>
                ))}

            </div>
            <div className='doctor-detail'><strong>Chức vụ:</strong> {dataDoctor ? dataDoctor.chucVuId.map(item => item?.name).join(', ') : ''}</div>
            <div className='doctor-detail'><strong>Nơi sinh sống:</strong> {dataDoctor?.address}</div>
          </Col>
        </Row>

        <Divider style={{ margin: '20px 0' }} />

        {/* Lưu ý */}
        <Text type="danger" style={{fontSize: 16, fontWeight: 500}}>
          <strong>⚠️ Lưu ý:</strong> Nếu bệnh nhân không đến khám được vui lòng huỷ lịch đã đặt và chọn ngày khác.
        </Text>
      </Card>

      {/* Đặt khám nhanh */}
      <Card style={{ marginTop: 24 }}>
            <Title level={4}>Chọn ngày khám</Title>
            <Row gutter={[12, 12]} style={{ marginBottom: 12 }}>
                {listTime.length > 0 ? (
                    listTime
                    .sort((a, b) => moment(a).unix() - moment(b).unix())
                    .map((time, index) => {
                        const day = moment(time).format("dddd");
                        const vietnameseDay = englishToVietnameseDays[day];
                        const displayTime = `${vietnameseDay} - ${moment(time).format("DD/MM")}`;

                        return (
                        <Col xs={12} sm={8} md={6} lg={6} key={index}>
                            <Button
                            block
                            type={selectedTimeId === time ? "primary" : "default"}
                            onClick={() => {
                                setHienThiTime(displayTime);
                                setSelectedTimeId(time);
                                setSelectedDate(time);
                                onClose();
                            }}
                            onMouseEnter={() => setHoveredIndex(index)}
                            onMouseLeave={() => setHoveredIndex(null)}
                            style={{
                                height: 60,
                                textAlign: 'left',
                                backgroundColor: selectedTimeId === time ? '#d6f5e3	' : undefined,
                                borderColor: hoveredIndex === index ? '#d6f5e3	' : undefined,
                                boxShadow: hoveredIndex === index ? '0 0 0 2px #e6f4ff' : undefined,
                            }}
                            >
                            <div>
                                <Text strong>{vietnameseDay}</Text>
                                <br />
                                <Text type="secondary">{moment(time).format("DD/MM")}</Text>
                            </div>
                            </Button>
                        </Col>
                        );
                    })
                ) : (
                    <Col span={24}>
                        <BlurText
                            text="⚠ Không có lịch khám nào."
                            delay={150}
                            animateBy="words"
                            direction="top"
                            className="text-2xl mb-8"
                        />
                    </Col>
                )}
            </Row>


            <Text strong style={{ display: 'block', marginBottom: 8, fontSize: 18}}>
            Thời gian khám:
            </Text>

            <Row gutter={[12, 12]} style={{ marginTop: 16 }}>
                {hienThiTime !== 'Bấm vào đây để xem lịch khám!' ? (
                    timeGioList.map((item, index) => (
                    <Col xs={12} sm={8} md={6} lg={4} key={index}>
                        <div
                        className={`lich-kham-item ${selectedTimeId === item._id ? 'active' : ''}`}
                        onClick={() => handleRedirectDoctor(dataDoctor, item._id, selectedDate)}
                        >
                        {item.tenGio}
                        </div>
                    </Col>
                    ))
                ) : (
                    <Col span={24}>                    
                        <BlurText
                            text="⚠ Không có thời gian khám nào. Chọn ngày đi cậu."
                            delay={150}
                            animateBy="words"
                            direction="top"
                            className="text-2xl mb-8"
                        />
                    </Col>
                )}
            </Row>

      </Card>

      {/* Giới thiệu */}
      <Card style={{ marginTop: 24 }}>
        <Title level={4}>Giới thiệu</Title>
        <div
            style={{
            maxHeight: expanded ? 'none' : 120,
            overflow: 'hidden',
            position: 'relative',
            transition: 'max-height 0.3s ease',
            }}
        >
            <div dangerouslySetInnerHTML={{ __html: dataDoctor?.mota }} />
        </div>

        {/* Nút Xem thêm / Ẩn bớt */}
        {dataDoctor?.mota && dataDoctor.mota.length > 300 && (
            <div style={{ marginTop: 8 }}>
            <Button type="link" onClick={() => setExpanded(prev => !prev)}>
                {expanded ? 'Ẩn bớt' : 'Xem thêm'}
            </Button>
            </div>
        )}     
      </Card>

      {/* Chuyên khám + Đặt khám ngay */}
        <Card style={{ marginTop: 24 }}>
            <Row gutter={[16, 16]} align="middle">
                <Col xs={24} sm={16}>
                <Title level={4}>Phòng khám</Title>

                {/* Địa chỉ */}
                <Text style={{ fontSize: 16, color: '#555', display: 'block', marginBottom: 4 }}>
                    <EnvironmentOutlined /> {dataDoctor?.phongKhamId?.name}
                </Text>

                {/* Giá khám */}
                <Text style={{ display: 'block', color: 'red', fontWeight: 500, fontSize: 16 }}>
                    Giá khám (VN): <span style={{ color: '#000' }}>{formatCurrency(dataDoctor?.giaKhamVN) || '---'}</span> &nbsp;|&nbsp;
                    Nước ngoài: <span style={{ color: '#000' }}>{formatCurrency(dataDoctor?.giaKhamNuocNgoai) || '---'}</span>
                </Text>
                </Col>

                {/* <Col xs={24} sm={8} style={{ textAlign: 'right' }}>
                <Button className="dat-kham-ngay" type="primary" size="large">
                    ĐẶT KHÁM NGAY
                </Button>
                </Col> */}
            </Row>
        </Card>

    </div>
    </div>
  );
};

export default DoctorDetail;
