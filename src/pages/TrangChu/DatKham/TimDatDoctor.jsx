import { useState, useEffect } from 'react';
import { Row, Col, Typography, Divider } from 'antd';
import './TimDatDoctor.css'; // CSS riêng

const { Title, Text, Paragraph } = Typography;

const images = [
  {
    key: 0,
    src: '/Feature1.webp',
    title: 'Đội ngũ bác sĩ',
    description:
      'Tất cả các bác sĩ đều có liên kết chính thức với H2Care để bảo đảm lịch đặt khám của bạn được xác nhận.',
  },
  {
    key: 1,
    src: '/Feature2.webp',
    title: 'Đặt khám dễ dàng, nhanh chóng, chủ động',
    description:
      'Chỉ với 1 phút, bạn có thể đặt khám thành công với bác sĩ. Phiếu khám bao gồm số thứ tự và khung thời gian dự kiến.',
  },
];

const TimDatDoctor = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  // Tự động chuyển ảnh sau 5 giây
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex(prev => (prev === 0 ? 1 : 0));
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="datbacsi-section">
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
            <Title level={2}>An tâm tìm và đặt bác sĩ</Title>
            <Text type="secondary" style={{ display: 'block', marginBottom: 32 }}>
            Hơn 600 bác sĩ liên kết chính thức với H2Care
            </Text>
        </div>
      <Row gutter={[32, 32]} align="middle">
        {/* Cột ảnh */}
        <Col xs={24} md={10} style={{ textAlign: 'center',  }}>
          <div className="image-container fade-effect">
            <img
              src={images[activeIndex].src}
              alt="booking"
              className="booking-image"
              width={500}
            />
          </div>
        </Col>

        {/* Cột nội dung */}
        <Col xs={24} md={14}>          

          {images.map((item, index) => (
            <div
              key={item.key}
              className={`info-box ${activeIndex === index ? 'active' : ''}`}
              onClick={() => setActiveIndex(index)}
            >
              <Title className='info-box-txt' level={4} style={{ marginBottom: 8 }}>
                {item.title}
              </Title>
              <Paragraph>{item.description}</Paragraph>
              {index === 0 && <Divider />}
            </div>
          ))}
        </Col>
      </Row>
    </div>
  );
};

export default TimDatDoctor;
