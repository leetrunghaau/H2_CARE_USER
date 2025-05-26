// src/components/Footer.jsx
import { Layout, Row, Col, Space } from 'antd';
import {
  FacebookFilled,
  YoutubeFilled,
  LinkedinFilled,
} from '@ant-design/icons';
import './Footer.css';

const { Footer } = Layout;

const AppFooter = () => (
  <Footer className="ym-footer">
    {/* ---- 4 cột trên ---- */}
    <Row gutter={32} className="ym-footer-top">
      <Col xs={24} md={10} lg={8}>
        <h4>CÔNG TY TNHH H2Care VIỆT NAM</h4>
        <p><b>VPĐD:</b> Hà Nội, Việt Nam</p>
        <p><b>Hotline:</b> 0972.138.493 (8:00 – 17:30 từ T2 đến T7)</p>
        <p>Số ĐKKD 0315268642 do Sở KH-ĐT TP.HCM cấp ngày 14/09/2018.</p>
        <p>Chịu trách nhiệm nội dung: Admin.</p>

        <div className="ym-social">
          <span>Kết nối với chúng tôi</span>
          <Space size="middle">
            <FacebookFilled />
            <YoutubeFilled />
            <LinkedinFilled />
            <img src="/zalo.svg" alt="Zalo" height={20} />
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
          <li>Đặt khám bác sĩ</li>
          <li>Đặt khám bệnh viện</li>
          <li>Đặt khám phòng khám</li>
          <li>Y360</li>
          <li>H2Care Clinic</li>
        </ul>
      </Col>

      <Col xs={0} md={4} lg={4}>
        <h4>Hỗ trợ</h4>
        <ul>
          <li>Câu hỏi thường gặp</li>
          <li>Điều khoản sử dụng</li>
          <li>Chính sách bảo mật</li>
          <li>Giải quyết khiếu nại</li>
          <li>CSKH: cskh@H2Care.vn</li>
        </ul>
      </Col>

     
    </Row>

    {/* ---- dòng kê khai + copyright ---- */}
    <div className="ym-footer-bottom">
      <p>
        Các thông tin trên H2Care chỉ dành cho mục đích tham khảo, tra cứu và
        không thay thế cho việc chẩn đoán hoặc điều trị y khoa. Cần tuyệt đối
        tuân theo hướng dẫn của Bác sĩ và Nhân viên y tế.
      </p>
      <p>Copyright © 2018 – 2025 Công ty TNHH H2Care Việt Nam.</p>
    </div>
  </Footer>
);

export default AppFooter;
