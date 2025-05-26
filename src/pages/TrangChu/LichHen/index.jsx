import React, { useEffect, useState } from "react";
import {
  Row,
  Col,
  Avatar,
  Typography,
  Space,
  Button,
  Modal,
  Divider,
  message,
  notification,
  Popconfirm,
} from "antd";
import {
  ClockCircleOutlined,
  CalendarOutlined,
  CheckCircleOutlined,
  ExclamationCircleOutlined,
  EyeOutlined,
} from "@ant-design/icons";
import { useLocation } from "react-router-dom";
import { fetchLichKham, handleHuyOrder } from "../../../services/apiDoctor";
import ModalLichHen from "./ModalLichHen";

const { Text, Title, Link } = Typography;

const LichHen = () => {
    let location = useLocation();
    let params = new URLSearchParams(location.search);
    const idKhachHang = params.get("idKhachHang"); // Lấy giá trị của tham số "idKhachHang"
    const [dataLichHen, setDataLichHen] = useState([])

    const [openModalId, setOpenModalId] = useState(null); // Track which modal is open
    const handleModalOpen = (id) => {
        setOpenModalId(id); // Open specific modal
    }

    const handleModalClose = () => {
        setOpenModalId(null); // Close the modal
    }

    useEffect(() => {
        fetchLichHenByIdKH();
    }, [idKhachHang]);

    const fetchLichHenByIdKH = async () => {

        const res = await fetchLichKham(idKhachHang)
        console.log("res: ", res);
        if (res && res.data) {
            setDataLichHen(res.data)
        }
    }

    const handleHuyLich = async (id) => {
        console.log("id huy: ", id);
        let res = await handleHuyOrder(id)
        if (res && res.data) {
            message.success(res.message)
            await fetchLichHenByIdKH()
        } else {
            notification.error({
                message: 'Hủy lịch hẹn không thành công!',
                description: res.message
            })
        }
    }

    // Dữ liệu ví dụ
    const appointmentData = {
        patientName: "Khắc Tú",
        doctorTitle: "Thạc sĩ, Bác sĩ trưởng, Chuyên khoa nội",
        doctorName: "Nguyễn Thị Thanh Nhàn",
        doctorAvatar: "/path-to-avatar.jpg", // Thay link ảnh thật
        time: "18:00 - 19:00",
        date: "07/12/2024",
        clinic: "Cơ xương khớp",
        address: "182b Lê Văn Sỹ, Phường 10, Quận Phú Nhuận, Thành phố Hồ Chí Minh",
        reason: "khám mông",
        medicalRecord: {
        diagnosis: "Viêm cơ xương khớp mãn tính",
        symptoms: "Đau nhức vùng mông, khó vận động",
        treatment: "Dùng thuốc giảm đau, vật lý trị liệu",
        notes: "Theo dõi sau 2 tuần, nếu không cải thiện cần xét nghiệm thêm",
        },
    };  

  return (
    <div style={{ padding: 24, background: "#f0f2f5", minHeight: "100vh" }}>
      <Title level={1} style={{ marginBottom: 24, textAlign:'center' }}>
        Lịch hẹn đã đặt
      </Title>
       {dataLichHen?.some(item => item?.trangThaiHuyDon === 'Không Hủy') ? (
            dataLichHen.map((item, index) => (
                item?.trangThaiHuyDon === 'Không Hủy' ? (
        <Row
            gutter={[24, 24]}
            style={{
                background: "#fff",
                padding: 24,
                borderRadius: 12,
                boxShadow: "0 3px 8px rgba(0,0,0,0.1)",
                maxWidth: 800,
                margin: "10px auto",

            }}
            justify="space-between"
            align="middle"
        >
            {/* Avatar & Thời gian */}
            <Col xs={24} sm={6} md={5} style={{ textAlign: "center" }}>
            <Avatar
                src={`${import.meta.env.VITE_BACKEND_URL}/uploads/${item?._idDoctor.image}`}
                size={96}
                style={{ border: "2px solid #f5222d" }}
            />
            <Space
                direction="vertical"
                size="small"
                style={{ marginTop: 16, color: "#40a9ff" }}
            >
                <Text strong>Thời Gian Khám</Text>
                <Space>
                <ClockCircleOutlined style={{ color: "#faad14" }} />
                <Text style={{ color: "#faad14" }}>{item.tenGioKham}</Text>
                </Space>
                <Space>
                <CalendarOutlined style={{ color: "#faad14" }} />
                <Text style={{ color: "#faad14" }}>{item.ngayKhamBenh}</Text>
                </Space>
            </Space>
            </Col>

            {/* Thông tin bệnh nhân */}
            <Col xs={24} sm={18} md={18}>
            <Title level={5}>
                Bệnh nhân: <Text strong>{item.patientName}</Text>
            </Title>
            <Text type="secondary" style={{ display: "block", marginBottom: 6 }}>
               {item._idDoctor ? item._idDoctor.chucVuId.map(items => items?.name).join(', ') : ''}
            </Text>
            <Text>
                Bác sĩ:{" "}
                <Link href="#" style={{ color: "#40a9ff" }}>
                {item._idDoctor?.lastName} {item._idDoctor?.firstName}
                </Link>
            </Text>
            <br />
            <Text>
                Nơi khám: <Text strong>{item._idDoctor?.phongKhamId?.name}</Text>
            </Text>
            <br />
            <Text>
                Địa chỉ: <Text strong>{item._idDoctor?.phongKhamId?.address}</Text>
            </Text>
            <br />
            <Text>
                Lý do khám: <Text strong>{item.lidokham}</Text>
            </Text>

                <Row gutter={[12, 12]} style={{ marginTop: 16 }}>
                    {item.trangThaiXacNhan ? <>                        
                        <Col xs={24} md={8} sm="auto">
                            <Button
                            type="default"
                            icon={<CheckCircleOutlined />}
                            style={{ borderColor: "#52c41a", color: "#52c41a", width: "100%" }}
                            >
                            Đã xác nhận
                            </Button>
                        </Col>
                    </> : <>                       
                        <Col xs={24} md={8} sm="auto">
                            <Button
                            danger
                            loading={true}
                            style={{ borderColor: "orange", color: "orange", width: "100%" }}
                            >
                            Chờ xác nhận
                            </Button>
                        </Col>
                    </>}

                    {item.trangThaiThanhToan ? <>                       
                        <Col xs={24} md={8} sm="auto">
                            <Button
                            danger
                            icon={<CheckCircleOutlined />}
                            style={{ borderColor: "#52c41a", color: "#52c41a", width: "100%" }}
                            >
                            Đã thanh toán
                            </Button>
                        </Col>
                    </> : <>
                        <Col xs={24} md={8} sm="auto">
                            <Button
                            danger
                            icon={<ExclamationCircleOutlined />}
                            style={{ borderColor: "#f5222d", color: "#f5222d", width: "100%" }}
                            >
                            Chưa thanh toán
                            </Button>
                        </Col>
                    </>}
                    
                    
                    

                    {item.trangThaiKham ? <>                        
                        <Col xs={24} md={8} sm="auto">
                            <Button
                            key={index}
                            type="default"
                            icon={<EyeOutlined />}
                            style={{ borderColor: "#52c41a", color: "#52c41a", width: "100%" }}
                            onClick={() => handleModalOpen(item._id)}
                            >
                            Xem bệnh án
                            </Button>
                        </Col>
                    </> : ''}

                    {!item?.trangThaiKham ? <>                       
                        <Col xs={24} sm="auto">
                            <Popconfirm
                                title={`Huỷ lịch này`}
                                description="Bạn có chắc chắn muốn hủy?"
                                onConfirm={() => handleHuyLich(item._id)}
                                onCancel={() => message.error('Không hủy')}
                                okText="Xác nhận hủy"
                                cancelText="Không hủy"
                            >
                                {/* <CloseOutlined style={{ cursor: "pointer", color: "red", fontSize: "20px" }} /> */}
                                <Button
                                    type="default"
                                    danger
                                    style={{ width: "100%" }}
                                >
                                Hủy lịch
                                </Button>
                            </Popconfirm>
                        </Col>
                    </> : ''}
                    

                    <ModalLichHen
                        isModalOpen={openModalId === item._id}
                        setIsModalOpen={handleModalClose}
                        item={item}
                    />
                </Row>

            </Col>
        </Row>
        ) : null
            ))
        ) : (
            <Col md={24} className="box-lich-kham">
                <p style={{ textAlign: "center", color: "red", fontSize: "30px" }}>Chưa có lịch khám nào.</p>
            </Col>
        )}    
    </div>
  );
};

export default LichHen;
