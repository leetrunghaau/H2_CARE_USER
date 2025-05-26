// src/components/Footer.jsx
import { Layout, Row, Col, Space } from "antd";
import {
  FacebookFilled,
  YoutubeFilled,
  LinkedinFilled,
} from "@ant-design/icons";
import "./Footer.css";

const { Footer } = Layout;

const AppFooter = () => (
  <Footer className="ym-footer">
    {/* ---- 4 cột trên ---- */}
    <Row gutter={32} className="ym-footer-top">
      <Col xs={24} md={10} lg={8}>
        <h4>CÔNG TY TNHH H2Care VIỆT NAM</h4>
        <p>
          <b>VPĐD:</b>Việt Nam
        </p>
        <p>
          <b>Hotline:</b> 0967.763.8976 (8:00 – 17:30 từ T2 đến T7)
        </p>

        <div className="ym-social">
          <span>Kết nối với chúng tôi</span>
          <Space size="middle">
            <FacebookFilled />
            <YoutubeFilled />
            <LinkedinFilled />
          </Space>
        </div>
      </Col>

      <Col xs={0} md={5} lg={4}>
        <h4>Về H2Care</h4>
        <ul>
          <li>Giới thiệu</li>
          <li>Ban điều hành</li>
          <li>Nhân sự &amp; Tuyển dụng</li>
          <li>Liên hệ</li>
        </ul>
      </Col>

      <Col xs={0} md={5} lg={4}>
        <h4>Dịch vụ</h4>
        <ul>
          <li>
            <a
              href="/dat-kham?tab=dat-kham-bac-si"
              style={{
                color: "inherit",
                textDecoration: "none",
                cursor: "pointer",
              }}>
              Đặt khám bác sĩ
            </a>
          </li>
          <li>
            <a
              href="/dat-kham?tab=dat-kham-phong-kham"
              style={{
                color: "inherit",
                textDecoration: "none",
                cursor: "pointer",
              }}>
              Đặt khám bệnh viện
            </a>
          </li>
        </ul>
      </Col>

      <Col xs={0} md={4} lg={4}>
        <h4>Hỗ trợ</h4>
        <ul>
          <li>
            <a
              href="/cau-hoi-thuong-gap"
              style={{
                color: "inherit",
                textDecoration: "none",
                cursor: "pointer",
              }}>
              Câu hỏi thường gặp
            </a>
          </li>

          <li>CSKH: cskh@H2Care.vn</li>
        </ul>
      </Col>
    </Row>

    {/* ---- dòng kê khai + copyright ---- */}
    <div className="ym-footer-bottom">
      <p>
        Các thông tin trên H2Care chỉ dành cho mục đích học tập, không tra cứu
        và không thay thế cho việc chẩn đoán hoặc điều trị y khoa. Cần tuyệt đối
        tuân theo hướng dẫn của Bác sĩ và Nhân viên y tế.
      </p>
      <p>Copyright © 2018 – 2025 Công ty TNHH H2Care Việt Nam.</p>
    </div>
  </Footer>
);

export default AppFooter;
