import { useEffect, useState } from 'react';
import { Row, Col, Card, Typography, Button } from 'antd';
import { RightOutlined, UpOutlined } from '@ant-design/icons';
import './ChuyenKhoa.css';          // kèm CSS ở cuối
import { useNavigate } from 'react-router-dom';
import { fetchAllChuyenKhoa } from '../../../services/apiDoctor';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

const { Title, Text } = Typography;

const ChuyenKhoa = () => {

    const [dataCKhoa, setDataAllCKhoa] = useState([])
    const navigate = useNavigate()
    const [dataSearch, setDataSearch] = useState('')
    const [showAll, setShowAll] = useState(false);          // <-- NEW

    const onSearch = (value) => {
        console.log("value: ",value);
        
        if (value) {
            navigate(`/search?_idChuyenKhoa=${value}`);
            window.scrollTo({ top: 0, behavior: 'smooth' }); // 👈 Cuộn lên đầu mượt
        }
    };    
    
    useEffect(() => {
        fetchListCKhoa()
    }, [dataSearch])

    const fetchListCKhoa = async () => {

        let query = 'page=1&limit=1000'
        if (dataSearch) {
            query += `&name=${encodeURIComponent(dataSearch)}`;
        }
        const res = await fetchAllChuyenKhoa(query)
        console.log("res all CKhoa: ", res);
        if(res && res.data) {
            setDataAllCKhoa(res.data)
        }
    }   

    const visibleList = showAll ? dataCKhoa : dataCKhoa.slice(0, 6);  // <-- filter


    return (
        <section className="specialty-wrapper margin-auto">
        <header style={{ marginBottom: 28 }}>
            <Title level={3} style={{ marginBottom: 4 }}>Đặt lịch theo Chuyên khoa</Title>
            <Text type="secondary">Danh sách bác sĩ, bệnh viện, phòng khám theo chuyên khoa</Text>
        </header>

        {/* Grid chuyên khoa */}
        <Row gutter={[24, 24]} justify="center">
            {/* {visibleList.map(item => (
            <Col
                key={item.id}
                xs={12} sm={8} md={6} lg={4} xl={4}          // 2-3-4-3-3 cột tùy breakpoint
            >
                <Card
                hoverable
                className="specialty-card"
                bodyStyle={{ padding: 10, textAlign: 'center' }}
                >
                <img
                    src={`${import.meta.env.VITE_BACKEND_URL}/uploads/${item?.image}`}
                    alt={item?.image}
                    className="specialty-icon"
                />
                <Text style={{fontWeight:"500"}}>{item.name}</Text>
                </Card>
            </Col>
            ))} */}
            <TransitionGroup component={null}>
                {visibleList.map(item => (
                    <CSSTransition key={item._id} timeout={600} classNames="specialty-fade">
                        <Col
                            xs={12} sm={8} md={6} lg={4} xl={4}
                            style={{ display: 'flex', justifyContent: 'center' }}
                        >
                            <Card
                                hoverable
                                className="specialty-card"
                                bodyStyle={{ padding: 10, textAlign: 'center' }}
                                onClick={() => onSearch(item._id)}                                
                            >
                                <img
                                    src={`${import.meta.env.VITE_BACKEND_URL}/uploads/${item?.image}`}
                                    alt={item?.image}
                                    className="specialty-icon"
                                />
                                <Text className='txt-name' style={{ fontWeight: "500" }}>{item.name}</Text>
                            </Card>
                        </Col>
                    </CSSTransition>
                ))}
            </TransitionGroup>

        </Row>

        {/* Nút xem thêm */}
        {/* Toggle button – chỉ hiển thị nếu có >6 mục */}
        {/* {dataCKhoa.length > 6 && (
            <div style={{ textAlign: 'center', marginTop: 32 }}>
            <Button
                type="primary"
                size="large"
                className="see-more-btn"
                onClick={() => setShowAll(prev => !prev)}
            >
                {showAll ? 'Ẩn bớt' : 'Xem thêm'}{' '}
                {showAll ? <UpOutlined /> : <RightOutlined />}
            </Button>
            </div>
        )} */}
        <CSSTransition
            in={dataCKhoa.length > 6}
            timeout={400}
            classNames="fade-btn"
            unmountOnExit
        >
            <div style={{ textAlign: 'center', marginTop: 32 }}>
                <Button
                    type="primary"
                    size="large"
                    className="see-more-btn"
                    onClick={() => setShowAll(prev => !prev)}
                >
                    {showAll ? 'Ẩn bớt' : 'Xem thêm'}{' '}
                    {showAll ? <UpOutlined /> : <RightOutlined />}
                </Button>
            </div>
        </CSSTransition>

        <br/>
        <br/>
        </section>
    );
};

export default ChuyenKhoa;
