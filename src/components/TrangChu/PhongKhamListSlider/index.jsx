import React, { useEffect, useState } from 'react';
import { Card, Button, Typography, Space, Image } from 'antd'; // Giữ lại các component Ant Design cần thiết
import { RightOutlined } from '@ant-design/icons';
import Slider from "react-slick"; // Import Slider
import "slick-carousel/slick/slick.css"; // Import CSS của slick-carousel
import "slick-carousel/slick/slick-theme.css"; // Import theme CSS của slick-carousel
import './PhongKhamListSlider.css'; // Import file CSS để tùy chỉnh giao diện
import { useNavigate } from 'react-router-dom';
import { fetchAllDoctor, fetchAllPhongKham } from '../../../services/apiDoctor';

const { Title, Text, Paragraph } = Typography;

// Mock data cho danh sách bác sĩ
const doctors = [
  {
    id: 1,
    name: 'BS. CK2 Lê Thị Minh Hồng',
    specialty: 'Nhi khoa',
    hospital: 'Bệnh viện Nhi Đồng 2',
    image: 'https://cdn.H2Care.vn/photos/09f68f6c-131b-45ed-97d6-afdc89fa51e3.jpg?width=100&aspect_ratio=1:1', // Placeholder image, adjusted size for slider
  },
  {
    id: 2,
    name: 'PGS. TS. BS Lâm Việt Trung',
    specialty: 'Tiêu hoá',
    hospital: 'Bệnh viện Chợ Rẫy',
    image: 'https://website-ca-nhan.vercel.app/452000390_1707566876648007_4926589300158667499_n.jpg', // Placeholder image, adjusted size for slider
  },
  
];

const PhongKhamListSlider = () => {

    const [dataPK, setDataPK] = useState([])
    const navigate = useNavigate()
    const [dataSearch, setDataSearch] = useState('')

    useEffect(() => {
        fetchListPK()
    }, [dataSearch])

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
        }
    };
    

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

  return (
    <div className="doctor-list-container">
       
        <div className="section-header margin-auto">
            <Title level={3}>
                Đặt khám phòng khám
                {/* <Text type="secondary" style={{ textAlign: 'center', display: 'block', marginTop: '10px' }}>Phiếu khám kèm số thứ tự và thời gian của bạn được xác nhận.</Text> */}
            </Title> 
            <Button type="link" className="view-more-button"  onClick={() => {
              navigate('/dat-kham?tab=dat-kham-phong-kham')
              window.scrollTo({ top: 0, behavior: 'smooth' }); // 👈 Cuộn lên đầu mượt
            }}>
            Xem thêm <RightOutlined />
            </Button>
        </div>

        {/* Sử dụng Slider component */}
        <div className="slider-container margin-auto"> {/* Thêm container cho slider để dễ tùy chỉnh CSS */}
            <Slider {...settings}>
            {dataPK.map(item => (
                <div key={item._id} className="doctor-slide"> {/* Mỗi item trong slider cần bọc trong div */}
                <Card
                    hoverable
                    onClick={() => onSearchPK(item._id)}     
                    className="doctor-card"
                    cover={<Image height={300} alt={`${item?.name}`} src={`${import.meta.env.VITE_BACKEND_URL}/uploads/${item?.image}`}  className="doctor-image" />}
                >
                    <Card.Meta
                    title={
                       <Paragraph
                        ellipsis={{ rows: 1, tooltip: true }}  // hàng 1 + tooltip đầy đủ
                        style={{ marginBottom: 0, fontSize: '16px' }}
                    >
                        {item.name}
                    </Paragraph> 
                    }                                    
                    />  
                    <Card.Meta
                    title={
                       <Paragraph
                        ellipsis={{ rows: 1, tooltip: true }}  // hàng 1 + tooltip đầy đủ
                        style={{ marginBottom: 0, fontSize: '14px', fontWeight: '400' }}
                    >
                        {item.address}
                    </Paragraph> 
                    }                                    
                    />    
                                 
                </Card> 
                </div>
            ))}
            </Slider>
        </div>
    </div>
  );
};

export default PhongKhamListSlider;
