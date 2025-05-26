import React, { useEffect, useState } from 'react';
import { Card, Button, Typography, Space, Image } from 'antd'; // Giữ lại các component Ant Design cần thiết
import { RightOutlined } from '@ant-design/icons';
import Slider from "react-slick"; // Import Slider
import "slick-carousel/slick/slick.css"; // Import CSS của slick-carousel
import "slick-carousel/slick/slick-theme.css"; // Import theme CSS của slick-carousel
import './DoctorListSlider.css'; // Import file CSS để tùy chỉnh giao diện
import { useNavigate } from 'react-router-dom';
import { fetchAllDoctor } from '../../../services/apiDoctor';

const { Title, Text, Paragraph } = Typography;

const DoctorListSlider = () => {

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
   
  // Cấu hình settings cho Slider
  const settings = {
    dots: false, // Hiển thị dấu chấm điều hướng
    infinite: true, // Lặp vô hạn
    speed: 500, // Tốc độ chuyển slide
    slidesToShow: 4, // Số slide hiển thị trên mỗi lần
    slidesToScroll: 1, // Số slide cuộn mỗi lần
    autoplay: true, // Tự động chạy slider
    autoplaySpeed: 3000, // Tốc độ tự động chạy (ms)
    responsive: [ // Cấu hình responsive
      {
        breakpoint: 1200, // Màn hình <= 1200px
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 992, // Màn hình <= 992px
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          initialSlide: 2
        }
      },
      {
        breakpoint: 768, // Màn hình <= 768px
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };

  const handleRedirectDoctor = (item) => {
        navigate(`/chi-tiet-doctor?id=${item}`)
        window.scrollTo({ top: 0, behavior: 'smooth' }); // 👈 Cuộn lên đầu mượt
  }

  return (
    <div className="doctor-list-container">
        {/* Thêm hai tiêu đề chính */}
        <div className="main-titles">
            <Title level={2} style={{ textAlign: 'center', marginBottom: '5px' }}>Đặt lịch khám trực tuyến</Title>
            <Text type="secondary" style={{ textAlign: 'center', display: 'block', marginBottom: '20px' }}>Tìm Bác sĩ chính xác - Đặt lịch khám dễ dàng</Text>
        </div>
        
        <div className="section-header margin-auto">
            <Title level={3}>
                Đặt khám bác sĩ
                {/* <Text type="secondary" style={{ textAlign: 'center', display: 'block', marginTop: '10px' }}>Phiếu khám kèm số thứ tự và thời gian của bạn được xác nhận.</Text> */}
            </Title> 
            <Button type="link" className="view-more-button" onClick={() => {
                navigate('/dat-kham?tab=dat-kham-bac-si')
                window.scrollTo({ top: 0, behavior: 'smooth' }); // 👈 Cuộn lên đầu mượt
            }
            }>
            Xem thêm <RightOutlined />
            </Button>
        </div>

        {/* Sử dụng Slider component */}
        <div className="slider-container margin-auto"> {/* Thêm container cho slider để dễ tùy chỉnh CSS */}
            <Slider {...settings}>
            {dataAllDoctor.map(doctor => (
                <div key={doctor._id} className="doctor-slide"> {/* Mỗi item trong slider cần bọc trong div */}
                <Card
                    hoverable
                    className="doctor-card"
                    cover={<Image height={300} alt={`${doctor?.lastName} ${doctor?.firstName}`} src={`${import.meta.env.VITE_BACKEND_URL}/uploads/${doctor?.image}`}  className="doctor-image" />}
                >
                    <Card.Meta
                    title={`${doctor?.lastName} ${doctor?.firstName}`}
                    description={
                        <>
                        <Paragraph
                            ellipsis={{ rows: 1, tooltip: true }}  // hàng 1 + tooltip đầy đủ
                            style={{ marginBottom: 0 }}
                        >
                            {doctor?.chucVuId?.map(item => item?.name).join(', ')}
                        </Paragraph>

                        <Paragraph
                            type="secondary"
                            ellipsis={{ rows: 1, tooltip: true }}  // hàng 1 + tooltip
                            style={{ marginBottom: 0 }}
                        >
                            {doctor?.chuyenKhoaId?.map(item => item?.name).join(', ')}
                        </Paragraph>
                        </>
                    }
                    onClick={() => handleRedirectDoctor(doctor._id)}
                    />
                    <Button
                    type="primary"
                    block
                    className="book-btn--square"
                    size="large"          // cao & chữ to hơn
                    style={{ marginTop: 16 }}
                    onClick={() => handleRedirectDoctor(doctor._id)}
                    >
                    Đặt lịch khám
                    </Button>

                </Card> 
                </div>
            ))}
            </Slider>
        </div>
    </div>
  );
};

export default DoctorListSlider;
