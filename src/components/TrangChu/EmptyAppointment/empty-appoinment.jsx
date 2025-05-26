import React from "react";
import { Card, Button, Typography, Row, Col } from "antd";
import {
  CalendarOutlined,
  ClockCircleOutlined,
  MedicineBoxOutlined,
  PlusCircleOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

const { Title, Paragraph } = Typography;

export default function EmptyAppointment() {
  const navigate = useNavigate();

  return (
    <div>
      <div>
        {/* Header */}
        <div style={{ marginBottom: 48 }}>
          <Row align="middle" gutter={12}>
            <Col>
              <div
                style={{
                  width: 40,
                  height: 40,
                  backgroundColor: "#2563eb",
                  borderRadius: 8,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}>
                <CalendarOutlined style={{ color: "white", fontSize: 24 }} />
              </div>
            </Col>
            <Col>
              <Title level={2} style={{ color: "#111827", margin: 0 }}>
                Lịch hẹn đã đặt
              </Title>
            </Col>
          </Row>
          <Paragraph style={{ color: "#4b5563", marginTop: 8 }}>
            Quản lý và theo dõi các cuộc hẹn khám bệnh của bạn
          </Paragraph>
        </div>

        {/* Empty State */}
        <Card
          style={{
            boxShadow: "0 8px 24px rgb(0 0 0 / 0.1)",
            borderRadius: 12,
          }}>
          <div
            style={{ textAlign: "center", padding: 48, position: "relative" }}>
            <div style={{ position: "relative", marginBottom: 32 }}>
              <div
                style={{
                  width: 128,
                  height: 128,
                  margin: "0 auto",
                  borderRadius: "50%",
                  background:
                    "linear-gradient(135deg, #bfdbfe 0%, #6366f1 100%)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: 16,
                }}>
                <div
                  style={{
                    width: 80,
                    height: 80,
                    borderRadius: "50%",
                    backgroundColor: "white",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    boxShadow: "0 4px 12px rgb(0 0 0 / 0.15)",
                    fontSize: 40,
                    color: "#2563eb",
                  }}>
                  <PlusCircleOutlined />
                </div>
              </div>

              {/* Floating icons */}
              <div
                style={{
                  position: "absolute",
                  top: 16,
                  left: 32,
                  width: 32,
                  height: 32,
                  backgroundColor: "#d1fae5",
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#059669",
                  fontSize: 16,
                }}>
                <MedicineBoxOutlined />
              </div>
              <div
                style={{
                  position: "absolute",
                  top: 32,
                  right: 48,
                  width: 24,
                  height: 24,
                  backgroundColor: "#fed7aa",
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#ea580c",
                  fontSize: 12,
                }}>
                <ClockCircleOutlined />
              </div>
            </div>

            {/* Content */}
            <Title level={3} style={{ marginBottom: 16 }}>
              Chưa có lịch khám nào
            </Title>
            <Paragraph
              style={{
                color: "#4b5563",
                maxWidth: 480,
                margin: "0 auto 32px",
              }}>
              Bạn chưa đặt lịch hẹn nào. Hãy bắt đầu bằng cách đặt lịch khám với
              bác sĩ để chăm sóc sức khỏe của mình.
            </Paragraph>

            {/* Action Buttons */}
            <div style={{ maxWidth: 320, margin: "0 auto" }}>
              <Button
                type="primary"
                size="large"
                style={{ width: "100%", marginBottom: 16 }}
                icon={<PlusCircleOutlined />}
                onClick={() => navigate("/dat-kham?tab=dat-kham-phong-kham")}>
                Đặt lịch khám ngay
              </Button>
              <Button
                size="large"
                style={{ width: "100%" }}
                type="default"
                onClick={() => navigate("/dat-kham?tab=dat-kham-bac-si")}>
                Xem danh sách bác sĩ
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
