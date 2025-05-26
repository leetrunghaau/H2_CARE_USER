import { Input, Row, Col, Typography, Button, Tag, Space, Divider, Select, Tooltip, Image } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import './SearchAll.css'; // Import CSS cho component
import { IoBagAddSharp } from 'react-icons/io5';
import { PiMapPinAreaFill } from "react-icons/pi";
import { MdOutlineMyLocation } from 'react-icons/md';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { fetchAllChuyenKhoa, fetchAllDoctor, fetchAllPhongKham } from '../../../services/apiDoctor';
import { FaMapLocationDot } from 'react-icons/fa6';

const { Title, Text } = Typography;

const SearchAll = () => {

    const [dataAllChuyenKhoa, setDataAllChuyenKhoa] = useState([])
    const [dataPK, setDataPK] = useState([])
    const [dataAllDoctor, setDataAllDoctor] = useState([])    
    const navigate = useNavigate()

    const [searchText, setSearchText] = useState('');
    const [selectedClinic, setSelectedClinic] = useState(null);
    const [selectedSpecialty, setSelectedSpecialty] = useState(null);
    const [selectedArea, setSelectedArea] = useState(null);


    const location = useLocation();  // Lấy thông tin location hiện tại
    const queryParams = new URLSearchParams(location.search);
    const searchQuery = queryParams.get('query'); 
    const _idChuyenKhoa = queryParams.get('_idChuyenKhoa'); 
    const _idPhongKham = queryParams.get('_idPhongKham'); 

    useEffect(() => {
        fetchListChuyenKhoa()
    }, [])

    useEffect(() => {
        fetchListPK()
    }, [])

    useEffect(() => {
        fetchListDoctor()
    }, [searchText, selectedClinic, selectedSpecialty, searchQuery, selectedArea, _idChuyenKhoa, _idPhongKham])

    useEffect(() => {
        setSearchText(searchQuery || '');
        fetchListDoctor();
    }, [searchQuery, selectedClinic, selectedSpecialty]);

    useEffect(() => {
    if (_idChuyenKhoa) {
        setSelectedSpecialty(_idChuyenKhoa);
    }
    if (_idPhongKham) {
        setSelectedClinic(_idPhongKham);
    }
    }, [_idChuyenKhoa, _idPhongKham]);

    const fetchListDoctor = async () => {

        let query = 'page=1&limit=1000'                
        const keyword = searchQuery?.trim() || searchText?.trim();
        if (keyword) {
            const encoded = encodeURIComponent(keyword);
            query += `&firstName=${encoded}&lastName=${encoded}&address=${encoded}`;
        }
        if (selectedArea) {
            query += `&address=${encodeURIComponent(selectedArea)}`;
        }

        if (selectedClinic) {
            query += `&phongKhamId=${selectedClinic}`;
        }
        if (_idPhongKham) {
            query += `&phongKhamId=${_idPhongKham}`;
        }

        if (selectedSpecialty) {
            query += `&chuyenKhoaId=${selectedSpecialty}`;
        }   
        if (_idChuyenKhoa) {
            query += `&chuyenKhoaId=${_idChuyenKhoa}`;
        }   
        const res = await fetchAllDoctor(query)
        console.log("res all doctor: ", res);
        if(res && res.data) {
            setDataAllDoctor(res.data)
        }
    }

    const fetchListChuyenKhoa = async () => {

        let query = 'page=1&limit=1000'             
        const res = await fetchAllChuyenKhoa(query)
        console.log("res all ChuyenKhoa: ", res);
        if(res && res.data) {
            setDataAllChuyenKhoa(res.data)
        }
    }    

    const fetchListPK = async () => {

        let query = 'page=1&limit=1000'        
        const res = await fetchAllPhongKham(query)
        console.log("res all doctor: ", res);
        if(res && res.data) {
            setDataPK(res.data)
        }
    }


    // const chuyenKhoaOptions = dataAllChuyenKhoa.map(item => ({
    //     value: item._id, 
    //     label: (
    //         <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
    //         <img
    //             src={`${import.meta.env.VITE_BACKEND_URL}/uploads/${item.image}`}
    //             alt={item.name}
    //             style={{ width: 24, height: 24, borderRadius: '50%', objectFit: 'cover' }}
    //         />
    //         <span>{item.name}</span>
    //         </div>
    //     )
    // }));

    // const phongKhamOptions = dataPK.map(item => ({
    //     value: item._id, 
    //     label: (
    //         <Tooltip placement="top" title={`${item.name} (${item.address})`} color='green'>
    //         <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
    //         <Image
    //             src={`${import.meta.env.VITE_BACKEND_URL}/uploads/${item.image}`}
    //             alt={item.name}
    //             style={{ width: 30, height: 30, borderRadius: '10px', objectFit: 'cover' }}
    //         />
    //         <span>{item.name}</span>
    //         (<span>{item.address}</span>)
    //         </div>
    //         </Tooltip>
    //     )
    // }));
    const chuyenKhoaOptions = [
        {
            value: null,
            label: <span>Tất cả chuyên khoa</span>,
        },
        ...dataAllChuyenKhoa.map(item => ({
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

    const phongKhamOptions = [
        {
            value: null,
            label: 'Tất cả phòng khám',
        },
        ...dataPK.map(item => ({
            value: item._id,
            label: (
            <Tooltip placement="top" title={`${item.name} (${item.address})`} color="green">
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <Image
                    src={`${import.meta.env.VITE_BACKEND_URL}/uploads/${item.image}`}
                    alt={item.name}
                    style={{ width: 30, height: 30, borderRadius: '10px', objectFit: 'cover' }}
                />
                <span>{item.name}</span>
                (<span>{item.address}</span>)
                </div>
            </Tooltip>
            ),
        })),
    ];

    const areaOptions = [
        { label: 'TP.HCM', value: 'Hồ Chí Minh' },
        { label: 'Hà Nội', value: 'Hà Nội' },
        { label: 'Đà Nẵng', value: 'Đà Nẵng' },
        { label: 'Cần Thơ', value: 'Cần Thơ' },
        { label: 'Hải Phòng', value: 'Hải Phòng' },
        { label: 'Huế', value: 'Huế' },
        { label: 'Biên Hòa', value: 'Biên Hòa' },
        { label: 'Bình Dương', value: 'Bình Dương' },
        { label: 'Vũng Tàu', value: 'Vũng Tàu' },
        { label: 'Đồng Nai', value: 'Đồng Nai' },
        { label: 'Nha Trang', value: 'Nha Trang' },
        { label: 'Buôn Ma Thuột', value: 'Buôn Ma Thuột' },
        { label: 'Đà Lạt', value: 'Đà Lạt' },
        { label: 'Long An', value: 'Long An' },
        { label: 'Tây Ninh', value: 'Tây Ninh' },
        { label: 'Vĩnh Long', value: 'Vĩnh Long' },
        { label: 'Tiền Giang', value: 'Tiền Giang' },
        { label: 'Bến Tre', value: 'Bến Tre' },
        { label: 'Sóc Trăng', value: 'Sóc Trăng' },
        { label: 'Hậu Giang', value: 'Hậu Giang' },
        { label: 'An Giang', value: 'An Giang' },
        { label: 'Kiên Giang', value: 'Kiên Giang' },
        { label: 'Lâm Đồng', value: 'Lâm Đồng' },
        { label: 'Thanh Hóa', value: 'Thanh Hóa' },
        { label: 'Nghệ An', value: 'Nghệ An' },
        { label: 'Thái Bình', value: 'Thái Bình' },
        { label: 'Bắc Ninh', value: 'Bắc Ninh' },
        { label: 'Quảng Ninh', value: 'Quảng Ninh' },
        { label: 'Lào Cai', value: 'Lào Cai' },
        { label: 'Yên Bái', value: 'Yên Bái' },
        { label: 'Nam Định', value: 'Nam Định' }
    ];

   const handleRedirectDoctor = (item) => {
        navigate(`/chi-tiet-doctor?id=${item}`)
        window.scrollTo({ top: 0, behavior: 'smooth' }); // 👈 Cuộn lên đầu mượt
  }


  return (
    <div style={{ padding: ' 16px', maxWidth: 1150, margin: '0 auto' }}>
      {/* Thanh tìm kiếm */}
        <div className="search-header-sticky">
            <Input
                size="large"
                placeholder="Tìm kiếm bác sĩ, bệnh viện, phòng khám..."
                prefix={<SearchOutlined />}
                style={{ borderRadius: 24, marginBottom: 12 }}
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                onPressEnter={() => {
                    if (searchText.trim()) {
                    navigate(`/search?query=${encodeURIComponent(searchText.trim())}`);
                    } else {
                    navigate('/search'); // Nếu xóa input → clear query param
                    }
                }}
                allowClear 
                onClear={() => {
                    setSearchText('');
                    navigate('/search'); // 👈 trigger lại tìm tất cả
                }}
            />

            <Text type="secondary" style={{ display: 'block', marginBottom: 12 }}>
                ✨ Bạn có thể tìm bác sĩ chuyên khoa nào hoặc ở khu vực nào không? Điều này sẽ giúp thu hẹp phạm vi tìm kiếm đó!
            </Text>
           
            <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
            {/* Nơi khám */}
            <Col xs={24} sm={24} md={12} lg={8}>
                <Select
                size="large"
                suffixIcon={<FaMapLocationDot size={20} />}
                placeholder="Phòng khám, bệnh viện"
                className="filter-select"
                style={{ width: '100%' }}
                options={phongKhamOptions}
                value={selectedClinic}
                onChange={(value) => setSelectedClinic(value)}
                allowClear
                onClear={() => {
                    setSearchText('');
                    navigate('/search'); // 👈 trigger lại tìm tất cả
                }}
                />
            </Col>

            {/* Chuyên khoa */}
            <Col xs={24} sm={24} md={12} lg={6}>
                <Select
                size="large"
                suffixIcon={<IoBagAddSharp size={20} />}
                placeholder="Chọn chuyên khoa"
                className="filter-select"
                style={{ width: '100%' }}
                options={chuyenKhoaOptions}                
                value={selectedSpecialty}
                onChange={(value) => setSelectedSpecialty(value)}
                allowClear
                onClear={() => {
                    setSearchText('');
                    navigate('/search'); // 👈 trigger lại tìm tất cả
                }}
                />
            </Col>

            {/* Khu vực */}
            <Col xs={12} sm={12} md={6} lg={5}>
            <Select
                size="large"
                suffixIcon={<PiMapPinAreaFill size={20} />}
                placeholder="Chọn khu vực"
                className="filter-select"
                style={{ width: '100%' }}
                options={areaOptions}
                allowClear
                onChange={(value) => {
                    setSelectedArea(value); // Tạo state tương ứng nếu chưa có
                }}
                onClear={() => {
                    setSearchText('');
                    navigate('/search'); // 👈 trigger lại tìm tất cả
                }}
            />
            </Col>


            {/* Gần nhất */}
            <Col xs={12} sm={12} md={6} lg={5}>
                <Button
                disabled
                size="large"
                className="filter-btn"
                icon={<MdOutlineMyLocation size={20} />}
                style={{ width: '100%' }}
                >
                Gần nhất
                </Button>
            </Col>
            </Row>


        </div>

        <div
        style={{
            background: '#fff',
            padding: 20,
            borderRadius: 12,
            marginBottom: 16,
            width: '100%',
            boxShadow: '0 8px 18px 12px rgba(0, 0, 0, 0.06)', // 👈 viền bóng mờ
            transition: 'box-shadow 0.3s ease',
            border: '1px solidrgb(0, 0, 0)',
        }}
        >        
            {/* Kết quả */}
            {dataAllDoctor.length > 0 ? <>            
            <Text style={{ display: 'block', marginBottom: 12, fontSize: 18, textAlign: 'center' }}>
            Đã tìm thấy <strong>{dataAllDoctor.length}</strong> bác sĩ phù hợp 
            </Text>
            </> : 
            <Text style={{ display: 'block', marginBottom: 12, fontSize: 18, textAlign: 'center' }}>
            ⚠ Không tìm thấy bác sĩ nào phù hợp 
            </Text>
            }


            <Divider style={{ margin: '10px 0' }} />

            {dataAllDoctor.map((clinic, index) => (
                <div key={clinic._id} style={{ background: '#fff', padding: 16, borderRadius: 12, marginBottom: 16 }}>
                <Row gutter={[16, 16]} align="middle" style={{borderBottom: '1px solid #f0f0f0', paddingBottom: 16}}>
                    {/* Ảnh */}
                    <Col xs={6} sm={4}>
                    <Image
                        src={`${import.meta.env.VITE_BACKEND_URL}/uploads/${clinic?.image}`} 
                        alt={clinic.image}
                        style={{
                        width: '100%',
                        height: 150,
                        objectFit: 'contain',
                        borderRadius: 10,
                        }}
                    />
                    </Col>

                    {/* Nội dung */}
                    <Col xs={16} sm={16}>
                        <Title level={4} style={{ marginBottom: 8 }}>{clinic.lastName} {clinic.firstName}</Title>                  
                        <Text type="black">{clinic.address}</Text> <br/>
                        <Text type="secondary">{clinic ? clinic.chuyenKhoaId.map(item => item?.name).join(', ') : ''}</Text>
                    </Col>

                    {/* Nút đặt khám */}
                    <Col xs={24} sm={4} style={{ textAlign: 'right' }}>
                    <Button                        
                        className='btn-dat-kham'
                        size='large'
                        icon={<IoBagAddSharp size={20} />}
                        onClick={() => handleRedirectDoctor(clinic._id)}
                        type="primary">Đặt khám</Button>
                    </Col>
                </Row>
                </div>
            ))}
        </div>
    </div>
  );
};

export default SearchAll;
