import React, { useEffect, useState } from "react";
import {
  Row,
  Col,
  Avatar,
  Typography,
  Space,
  Button,
  message,
  notification,
  Popconfirm,
  Card,
  Divider,
  Flex,
} from "antd";
import {
  ClockCircleOutlined,
  CalendarOutlined,
  CheckCircleOutlined,
  ExclamationCircleOutlined,
  EyeOutlined,
  CloseOutlined,
} from "@ant-design/icons";
import { useLocation } from "react-router-dom";
import { fetchLichKham, handleHuyOrder } from "../../../services/apiDoctor";
import ModalLichHen from "./ModalLichHen";
import EmptyAppointment from "../../../components/TrangChu/EmptyAppointment/empty-appoinment";

const { Text, Title, Link } = Typography;

const LichHen = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const idKhachHang = params.get("idKhachHang");

  const [dataLichHen, setDataLichHen] = useState([]);
  const [openModalId, setOpenModalId] = useState(null);

  const handleModalOpen = (id) => setOpenModalId(id);
  const handleModalClose = () => setOpenModalId(null);

  useEffect(() => {
    fetchLichHenByIdKH();
  }, [idKhachHang]);

  const fetchLichHenByIdKH = async () => {
    const res = await fetchLichKham(idKhachHang);
    if (res && res.data) {
      setDataLichHen(res.data);
    }
  };

  const handleHuyLich = async (id) => {
    const res = await handleHuyOrder(id);
    if (res && res.data) {
      message.success(res.message);
      await fetchLichHenByIdKH();
    } else {
      notification.error({
        message: "Hủy lịch hẹn không thành công!",
        description: res.message,
      });
    }
  };

  return (
    <div style={{ padding: 24, background: "#f0f2f5", minHeight: "100vh" }}>
      {dataLichHen?.some((item) => item?.trangThaiHuyDon === "Không Hủy") ? (
        dataLichHen.map(
          (item) =>
            item?.trangThaiHuyDon === "Không Hủy" && (
              <Card
                key={item._id}
                style={{
                  maxWidth: 800,
                  margin: "16px auto",
                  borderRadius: 12,
                  boxShadow: "0 3px 8px rgba(0,0,0,0.1)",
                }}>
                <Title level={3} style={{ textAlign: "center" }}>
                  Lịch hẹn đã đặt
                </Title>

                <Row gutter={[24, 24]} justify="space-between" align="middle">
                  {/* Avatar and Time */}
                  <Col xs={24} sm={6} md={5} style={{ textAlign: "center" }}>
                    <Avatar
                      src={`${import.meta.env.VITE_BACKEND_URL}/uploads/${
                        item?._idDoctor.image
                      }`}
                      size={96}
                      style={{ border: "2px solid #40a9ff" }}
                    />
                    <Space
                      direction="vertical"
                      size="small"
                      style={{ marginTop: 16, color: "#40a9ff" }}>
                      <Text strong>Thời Gian Khám</Text>
                      <Space>
                        <ClockCircleOutlined style={{ color: "#40a9ff" }} />
                        <Text style={{ color: "#40a9ff" }}>
                          {item.tenGioKham}
                        </Text>
                      </Space>
                      <Space>
                        <CalendarOutlined style={{ color: "#40a9ff" }} />
                        <Text style={{ color: "#40a9ff" }}>
                          {item.ngayKhamBenh}
                        </Text>
                      </Space>
                    </Space>
                  </Col>

                  {/* Appointment Info */}
                  <Col xs={24} sm={18} md={18}>
                    <Flex style={{ gap: 4 }}>
                      <Text strong>Bệnh nhân: </Text>
                      <Text>{item.patientName}</Text>
                    </Flex>
                    <Flex style={{ gap: 4 }}>
                      <Text strong>Bác sĩ:</Text>
                      <Link href="#" style={{ color: "#40a9ff" }}>
                        {item._idDoctor?.lastName} {item._idDoctor?.firstName}
                      </Link>
                    </Flex>
                    <br />
                    <Flex style={{ gap: 4 }}>
                      <Text strong>Nơi khám:</Text>
                      <Text>{item._idDoctor?.phongKhamId?.name}</Text>
                    </Flex>
                    <Flex style={{ gap: 4 }}>
                      <Text strong>Địa chỉ:</Text>
                      <Text>{item._idDoctor?.phongKhamId?.address}</Text>
                    </Flex>

                    <br />
                    <Flex style={{ gap: 4 }}>
                      <Text strong>Lý do khám:</Text>
                      <Text>{item.lidokham}</Text>
                    </Flex>

                    <Divider />

                    {/* Status Buttons */}
                    <Row gutter={[12, 12]} justify="start" align="middle">
                      {item.trangThaiXacNhan ? (
                        <Col xs={24} md={8} sm="auto">
                          <Button
                            type="default"
                            icon={<CheckCircleOutlined />}
                            style={{
                              borderColor: "#52c41a",
                              color: "#52c41a",
                              width: "100%",
                            }}>
                            Đã xác nhận
                          </Button>
                        </Col>
                      ) : (
                        <Col xs={24} md={8} sm="auto">
                          <Button
                            danger
                            icon={<ExclamationCircleOutlined />}
                            style={{
                              borderColor: "orange",
                              color: "orange",
                              width: "100%",
                            }}>
                            Chờ xác nhận
                          </Button>
                        </Col>
                      )}

                      {item.trangThaiThanhToan ? (
                        <Col xs={24} md={8} sm="auto">
                          <Button
                            danger
                            icon={<CheckCircleOutlined />}
                            style={{
                              borderColor: "#52c41a",
                              color: "#52c41a",
                              width: "100%",
                            }}>
                            Đã thanh toán
                          </Button>
                        </Col>
                      ) : (
                        <Col xs={24} md={8} sm="auto">
                          <Button
                            danger
                            icon={<ExclamationCircleOutlined />}
                            style={{
                              borderColor: "#f5222d",
                              color: "#f5222d",
                              width: "100%",
                            }}>
                            Chưa thanh toán
                          </Button>
                        </Col>
                      )}

                      {item.trangThaiKham ? (
                        <Col xs={24} md={8} sm="auto">
                          <Button
                            type="default"
                            icon={<EyeOutlined />}
                            style={{
                              borderColor: "#52c41a",
                              color: "#52c41a",
                              width: "100%",
                            }}
                            onClick={() => handleModalOpen(item._id)}>
                            Xem bệnh án
                          </Button>
                        </Col>
                      ) : (
                        <Col xs={24} sm="auto">
                          <Popconfirm
                            title={`Huỷ lịch này`}
                            description="Bạn có chắc chắn muốn hủy?"
                            onConfirm={() => handleHuyLich(item._id)}
                            onCancel={() => message.error("Không hủy")}
                            okText="Xác nhận hủy"
                            cancelText="Không hủy">
                            <Button
                              type="primary"
                              danger
                              icon={<CloseOutlined />}
                              style={{ width: "100%" }}>
                              Hủy lịch
                            </Button>
                          </Popconfirm>
                        </Col>
                      )}
                    </Row>
                  </Col>
                </Row>

                <ModalLichHen
                  isModalOpen={openModalId === item._id}
                  setIsModalOpen={handleModalClose}
                  item={item}
                />
              </Card>
            )
        )
      ) : (
        <EmptyAppointment />
      )}
    </div>
  );
};

export default LichHen;
