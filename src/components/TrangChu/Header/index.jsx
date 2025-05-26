import { useState } from "react";
import {
  Layout,
  Menu,
  Button,
  Dropdown,
  Space,
  Row,
  Col,
  Drawer,
  message,
  Avatar,
  Typography,
} from "antd";
import { DownOutlined, MenuOutlined, UserOutlined } from "@ant-design/icons";
import GradientText from "../../HieuUng/GradientText/GradientText";
import "./Header.css";
import { useLocation, useNavigate } from "react-router-dom";
import { callLogoutBenhNhan } from "../../../services/api";
import { useDispatch, useSelector } from "react-redux";
import { doLogoutAction } from "../../../redux/account/accountSlice";
import LoginPage from "../Login/Login";
import ModalDoiMK from "../ModalDoiMK/ModalDoiMK";
const { Title, Text, Paragraph } = Typography;
const { Header: AntHeader } = Layout;

const AppHeader = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const [openModalDoiMK, setOpenModalDoiMK] = useState(false);
  const [openModalLogin, setOpenModalLogin] = useState(false);
  const dispatch = useDispatch();
  const currentPath = location.pathname;
  const isAuthenticated = useSelector((state) => state.account.isAuthenticated);
  const acc = useSelector((state) => state.account.user);
  console.log("isAuthenticated: ", isAuthenticated);

  const handleMenuClick = (key) => {
    navigate(`/dat-kham?tab=${key}`);
    setOpen(false);
  };

  const getSelectedKey = () => {
    if (currentPath.startsWith("/cau-hoi-thuong-gap")) return "cauhoithuonggap";
    if (currentPath.startsWith("/tuvan")) return "tuvan";
    if (currentPath.startsWith("/timyte")) return "timyte";
    if (currentPath.startsWith("/dat-kham")) return "datkham";
    return ""; // fallback
  };

  const handleLogout = async () => {
    try {
      const res = await callLogoutBenhNhan();
      localStorage.removeItem("access_tokenBenhNhan");

      if (res) {
        message.success("Đăng xuất thành công!");
        dispatch(doLogoutAction());
        navigate("/");
      }
    } catch (error) {
      console.error("Có lỗi xảy ra khi đăng xuất", error);
      message.error("Đăng xuất không thành công!");
    }
  };

  const handleRedirectLichHen = (item) => {
    navigate(`/lich-hen?idKhachHang=${item}`);
  };

  const datKhamMenuItems = [
    {
      key: "dat-kham-bac-si",
      label: (
        <div
          onClick={() => {
            handleMenuClick("dat-kham-bac-si");
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
          className="dk-item">
          Đặt khám bác sĩ
          <br />
          <span className="txt-nho">Đặt lịch khám không chờ đợi</span>
        </div>
      ),
    },
    {
      key: "dat-kham-benh-vien",
      label: (
        <div
          onClick={() => {
            handleMenuClick("dat-kham-benh-vien");
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
          className="dk-item">
          Đặt khám bệnh viện
          <br />
          <span className="txt-nho">Đặt khám, thanh toán, nhận kết quả</span>
        </div>
      ),
    },
    {
      key: "dat-kham-phong-kham",
      label: (
        <div
          onClick={() => {
            handleMenuClick("dat-kham-phong-kham");
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
          className="dk-item">
          Đặt khám phòng khám
          <br />
          <span className="txt-nho">Đa dạng chuyên khoa và dịch vụ</span>
        </div>
      ),
    },
    {
      key: "dat-lich-tiem-chung",
      label: (
        <div
          onClick={() => {
            handleMenuClick("dat-lich-tiem-chung");
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
          className="dk-item">
          Đặt khám tiêm chủng
          <br />
          <span className="txt-nho">Trung tâm tiêm chủng uy tín</span>
        </div>
      ),
    },
    { type: "divider" },
    {
      key: "ho-tro",
      disabled: true,
      label: (
        <a href="#" className="dk-item">
          Bạn cần hỗ trợ? Gọi&nbsp;0972.138.493
        </a>
      ),
    },
  ];

  /* ——— Drawer menu cho mobile ——— */
  const mobileNav = (
    <Menu
      mode="inline" /*  <-- đổi từ vertical sang inline */
      selectable={false}
      style={{ borderRight: 0 }}
      selectedKeys={[getSelectedKey()]}>
      <Menu.SubMenu key="datkham" title={<Space>Đặt khám</Space>}>
        {datKhamMenuItems.map((item) =>
          item.type === "divider" ? (
            <Menu.Divider key="divider" />
          ) : (
            <Menu.Item key={item.key} disabled={item.disabled}>
              {item.label}
            </Menu.Item>
          )
        )}
      </Menu.SubMenu>

      <Menu.Item key="tuvan">Tư vấn trực tuyến</Menu.Item>
      <Menu.Item key="timyte" onClick={() => navigate("/search")}>
        Tìm Y tế
      </Menu.Item>
      <Menu.Item
        key="cauhoithuonggap"
        onClick={() => navigate("/cau-hoi-thuong-gap")}>
        Câu hỏi thường gặp
      </Menu.Item>
    </Menu>
  );

  const items = [
    {
      key: "1",
      label: (
        <label
          style={{ cursor: "pointer", fontSize: 17 }}
          onClick={() => setOpenModalDoiMK(true)}>
          Tài khoản của tôi
        </label>
      ),
    },
    {
      key: "2",
      label: (
        <label
          style={{ cursor: "pointer", fontSize: 17 }}
          onClick={() => handleRedirectLichHen(acc?._id)}>
          Lịch hẹn
        </label>
      ),
    },
    {
      key: "4",
      danger: true,
      label: (
        <label
          style={{ cursor: "pointer", fontSize: 17 }}
          onClick={() => handleLogout()}>
          Đăng xuất
        </label>
      ),
    },
  ];

  return (
    <>
      <AntHeader className="app-header">
        <Row align="middle" style={{ width: "100%" }}>
          {/* Logo */}
          <Col xs={20} sm={6} className="logo" onClick={() => navigate("/")}>
            <GradientText
              colors={["red", "yellow", "green", "blue", "purple", "orange"]}
              animationSpeed={3}>
              H2Care
            </GradientText>
          </Col>

          {/* Menu desktop */}
          <Col sm={12} className="desktop-nav">
            <Menu
              mode="horizontal"
              selectable={false}
              className="menuHeader"
              selectedKeys={[getSelectedKey()]}>
              <Menu.Item key="datkham">
                <Dropdown
                  menu={{ items: datKhamMenuItems }}
                  trigger={["click"]}>
                  <a
                    className="ant-dropdown-link"
                    onClick={(e) => e.preventDefault()}>
                    <Space>
                      Đặt khám
                      <DownOutlined />
                    </Space>
                  </a>
                </Dropdown>
              </Menu.Item>
              <Menu.Item key="tuvan">Tư vấn trực tuyến</Menu.Item>
              <Menu.Item key="timyte" onClick={() => navigate("/search")}>
                Tìm Y tế
              </Menu.Item>
              <Menu.Item
                key="cauhoithuonggap"
                onClick={() => navigate("/cau-hoi-thuong-gap")}>
                Câu hỏi thường gặp
              </Menu.Item>
            </Menu>
          </Col>

          {/* Button login (ẩn trên mobile) */}
          <Col sm={4} className="desktop-nav" style={{ textAlign: "right" }}>
            {isAuthenticated ? (
              <>
                <Dropdown
                  menu={{
                    items,
                  }}>
                  <div style={{ cursor: "pointer" }}>
                    <Avatar
                      src={`${import.meta.env.VITE_BACKEND_URL}/uploads/${
                        acc.image
                      }`}
                      style={{ cursor: "pointer" }}
                      size={35}
                      icon={<UserOutlined />}
                    />{" "}
                    &nbsp;
                    <span style={{ fontSize: 18 }}>
                      {acc.lastName} {acc.firstName}
                    </span>{" "}
                    <DownOutlined />
                  </div>
                </Dropdown>
              </>
            ) : (
              <>
                <Button
                  className="login-button"
                  size="large"
                  onClick={() => setOpenModalLogin(true)}>
                  Đăng nhập
                </Button>
              </>
            )}
          </Col>

          {/* Nút hamburger cho mobile */}
          <Col xs={4} className="mobile-nav" style={{ textAlign: "right" }}>
            <Button
              type="text"
              icon={<MenuOutlined style={{ fontSize: 24 }} />}
              onClick={() => setOpen(true)}
            />
          </Col>
        </Row>
      </AntHeader>

      {/* Drawer hiển thị trên mobile */}
      <Drawer
        placement="left"
        width={260}
        onClose={() => setOpen(false)}
        open={open}
        bodyStyle={{ padding: 0 }}>
        {mobileNav}
        {isAuthenticated ? (
          <div style={{ padding: "16px 24px", borderTop: "1px solid #f0f0f0" }}>
            <Dropdown menu={{ items }} placement="bottomLeft" arrow>
              <a
                href="#!"
                onClick={(e) => e.preventDefault()}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                  cursor: "pointer",
                }}>
                <Avatar
                  size={40}
                  src={`${import.meta.env.VITE_BACKEND_URL}/uploads/${
                    acc.image
                  }`}
                  icon={<UserOutlined />}
                />
                <Space
                  direction="vertical"
                  size={0}
                  style={{ flex: 1, minWidth: 0 }}>
                  <Text strong ellipsis style={{ maxWidth: 140 }}>
                    {acc.lastName} {acc.firstName}
                  </Text>
                  <Text type="secondary" style={{ fontSize: 12 }}>
                    Tài khoản của bạn
                  </Text>
                </Space>
                <DownOutlined style={{ fontSize: 16, color: "#1890ff" }} />
              </a>
            </Dropdown>
          </div>
        ) : (
          <div style={{ padding: 16 }}>
            <Button
              block
              type="primary"
              style={{
                background: "linear-gradient(90deg, #0004ff 0%, #ff0000 100%)",
              }}
              onClick={() => setOpenModalLogin(true)}>
              Đăng nhập
            </Button>
          </div>
        )}
      </Drawer>

      <LoginPage
        openModalLogin={openModalLogin}
        setOpenModalLogin={setOpenModalLogin}
      />

      <ModalDoiMK
        openModalDoiMK={openModalDoiMK}
        setOpenModalDoiMK={setOpenModalDoiMK}
      />
    </>
  );
};

export default AppHeader;
