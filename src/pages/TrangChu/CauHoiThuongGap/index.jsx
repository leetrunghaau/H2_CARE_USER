import {
  Row,
  Col,
  Button,
  Select,
  Card,
  Typography,
  Avatar,
  Tag,
  Flex,
  Divider,
  Space,
} from "antd";
import { PlusOutlined, UserOutlined, MessageOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import "./CauHoiThuongGap.css";
import { useNavigate } from "react-router-dom";
import { fetchAllChuyenKhoa, getAllCauHoi } from "../../../services/apiDoctor";
import ModalCauHoi from "../../../components/TrangChu/ModalDoiMK/ModalCauHoi";
const { Title, Paragraph, Text } = Typography;

const CauHoiThuongGap = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [dataAllCauHoi, setDataAllCauHoi] = useState([]);
  const navigate = useNavigate();
  const [dataChuyenKhoa, setDataChuyenKhoa] = useState([]);
  const [selectedLocTheoChuyenKhoa, setSelectedLocTheoChuyenKhoa] = useState(
    []
  );
  const [openModalCauHoi, setOpenModalCauHoi] = useState(false);

  useEffect(() => {
    fetchListCauHoi();
  }, [selectedLocTheoChuyenKhoa]);

  useEffect(() => {
    fetchAllChuyenKhoaDoctor();
  }, []);

  const fetchListCauHoi = async () => {
    let query = "";
    if (selectedLocTheoChuyenKhoa && selectedLocTheoChuyenKhoa.length > 0) {
      query += `&locTheoChuyenKhoa=${encodeURIComponent(
        JSON.stringify(selectedLocTheoChuyenKhoa)
      )}`;
    }
    const res = await getAllCauHoi(query);
    console.log("res all cauhoi: ", res);

    if (res && res.data) {
      setDataAllCauHoi(res.data);
    }
  };

  const fetchAllChuyenKhoaDoctor = async () => {
    let query = `page=1&limit=1000`;
    let res = await fetchAllChuyenKhoa(query);
    if (res && res.data) {
      setDataChuyenKhoa(res.data);
    }
  };

  const onChangeTheoChuyenKhoa = (e) => {
    console.log("e: ", e);
    setSelectedLocTheoChuyenKhoa(e);
  };

  const chuyenKhoaOptions = [
    {
      value: null,
      label: <span>Tất cả chuyên khoa</span>,
    },
    ...dataChuyenKhoa.map((item) => ({
      value: item._id,
      label: (
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <img
            src={`${import.meta.env.VITE_BACKEND_URL}/uploads/${item.image}`}
            alt={item.name}
            style={{
              width: 24,
              height: 24,
              borderRadius: "50%",
              objectFit: "cover",
            }}
          />
          <span>{item.name}</span>
        </div>
      ),
    })),
  ];

  return (
    <div style={{ maxWidth: 1100, margin: "0 auto", padding: 24 }}>
      {/* Header */}
      <Row justify="space-between" align="middle" style={{ marginBottom: 24 }}>
        <Col xs={24} sm={16}>
          <Title level={3}>Hỏi đáp cùng bác sĩ</Title>
        </Col>
        <Col xs={24} sm={8} style={{ textAlign: "right" }}>
          <Button
            icon={<PlusOutlined />}
            type="primary"
            size="large"
            className="btn-datcauhoi"
            onClick={() => setOpenModalCauHoi(true)}>
            Đặt câu hỏi
          </Button>
        </Col>
      </Row>

      {/* Select chuyên khoa */}
      <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
        <Col xs={24} sm={12} md={8}>
          <Select
            size="large"
            placeholder="Tìm câu hỏi theo chuyên khoa"
            className="filter-select"
            style={{ width: "100%" }}
            options={chuyenKhoaOptions}
            value={selectedLocTheoChuyenKhoa}
            onChange={(e) => onChangeTheoChuyenKhoa(e)}
            allowClear
            onClear={() => {
              navigate("/cau-hoi-thuong-gap");
            }}
          />
        </Col>
      </Row>

      {/* Danh sách câu hỏi và trả lời */}
      {dataAllCauHoi.length > 0 ? (
        dataAllCauHoi.map((item) => (
          <Card
            key={item.id}
            style={{
              marginBottom: 24,
              borderLeft: "4px solid #3B82F6",
              backgroundColor: "#ffffff",
              borderRadius: 8,
              boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
            }}>
            <Row>
              {/* Nội dung câu hỏi & trả lời */}
              <div style={{ display: "flex", gap: 12 }}>
                <div
                  style={{
                    width: 32,
                    height: 32,
                    backgroundColor: "#DBEAFE",
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}>
                  <MessageOutlined style={{ fontSize: 16, color: "#2563EB" }} />
                </div>

                <div style={{ flex: 1 }}>
                  <Space size="small" style={{ marginBottom: 8 }}>
                    <Text strong style={{ color: "#2563EB", fontSize: 13 }}>
                      Câu hỏi
                    </Text>
                    <Tag color="blue">
                      {Array.isArray(item.chuyenKhoaId)
                        ? item.chuyenKhoaId.map((ck) => ck.name).join(", ")
                        : item.chuyenKhoaId?.name || "Chuyên khoa"}
                    </Tag>
                  </Space>
                  <Title level={5} style={{ margin: 0 }}>
                    {item.cauHoi}
                  </Title>
                </div>
              </div>
              <Divider style={{ margin: "16px 0" }} />

              <Col xs={24}>
                <Row
                  gutter={8}
                  style={{
                    marginTop: "0.5rem",
                    alignContent: "center",
                  }}>
                  <Col>
                    <Avatar
                      size={48}
                      src={`${import.meta.env.VITE_BACKEND_URL}/uploads/${
                        item?.doctors.image
                      }`}
                    />
                  </Col>
                  <Col xs={19} sm={20}>
                    <Flex gap="middle">
                      <Text style={{ fontSize: 16 }} strong>
                        {item?.doctors.lastName} {item?.doctors.firstName}
                      </Text>
                      <Tag color="green" icon={<UserOutlined />}>
                        {item?.doctors.chucVuId
                          .map((item) => item?.name)
                          .join(", ")}
                      </Tag>
                    </Flex>

                    <Card
                      style={{
                        marginTop: 16,
                        borderLeft: "4px solid #52c41a",
                        backgroundColor: "#ffffff",
                        borderRadius: 8,
                      }}>
                      <Text strong style={{ color: "#52c41a" }}>
                        Trả lời:
                      </Text>
                      <div style={{ marginTop: 8 }}>{item?.cauTraLoi}</div>
                    </Card>
                  </Col>
                </Row>
              </Col>
            </Row>
          </Card>
        ))
      ) : (
        <>
          <Card style={{ marginBottom: 24, textAlign: "center" }}>
            <Text type="secondary" style={{ fontSize: 16 }}>
              ⚠ Chưa có câu hỏi nào được đặt
            </Text>
          </Card>
        </>
      )}

      <ModalCauHoi
        openModalCauHoi={openModalCauHoi}
        setOpenModalCauHoi={setOpenModalCauHoi}
      />
    </div>
  );
};

export default CauHoiThuongGap;
