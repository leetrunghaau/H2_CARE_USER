import { useEffect, useState } from 'react';
import { Row, Col, Card, Typography, Button } from 'antd';
import { RightOutlined, UpOutlined } from '@ant-design/icons';
import './ChuyenKhoa.css';          // kèm CSS ở cuối
import { useNavigate } from 'react-router-dom';
import { fetchAllChuyenKhoa } from '../../../services/apiDoctor';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

const { Title, Text } = Typography;

const CKhoa = () => {

    const [dataCKhoa, setDataAllCKhoa] = useState([])
    const navigate = useNavigate()
    const [dataSearch, setDataSearch] = useState('')
    const [showAll, setShowAll] = useState(false);          // <-- NEW

    
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

    const handleRedirectChuyenKhoa = (item) => {
        navigate(`/user/view-chuyen-khoa-kham?idChuyenKhoa=${item}`)
    }

    const onSearch = (value) => {
        console.log("value: ",value);
        
        if (value) {
            navigate(`/search?_idChuyenKhoa=${value}`);
            window.scrollTo({ top: 0, behavior: 'smooth' }); // 👈 Cuộn lên đầu mượt
        }
    };

    const visibleList = showAll ? dataCKhoa : dataCKhoa.slice(0, 6);  // <-- filter


    return (
        <section className="specialty-wrapper margin-auto1">
        <header style={{ marginBottom: 28, textAlign: 'center' }}>
            <Title level={2} style={{ marginBottom: 4 }}>Đa dạng chuyên khoa khám</Title>
            <Text type="secondary">Đặt khám dễ dàng và tiện lợi hơn với đầy đủ các chuyên khoa</Text>
        </header>

        {/* Grid chuyên khoa */}
        <Row gutter={[24, 24]} justify="center">           
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
        </section>
    );
};

export default CKhoa;
