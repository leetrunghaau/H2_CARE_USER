import React, { useRef, useState } from "react";
import { Button, Input, Card, Typography, Divider, Row, Col } from "antd";
import { SendOutlined, MessageOutlined, CheckCircleFilled } from "@ant-design/icons";
import Fuse from "fuse.js";
import "./ChatBot.css";

const { Text, Title } = Typography;

const faq = [
  { question: "Liên hệ cho admin qua đâu để thiết kế website?", answer: "Bạn vui lòng liên hệ Zalo: 0972138493 nhé" },
  { question: "Giờ mở cửa?", answer: "Chúng tôi mở cửa từ 8h00 đến 20h00 mỗi ngày." },
  { question: "Địa chỉ ở đâu?", answer: "Địa chỉ: Nam Từ Liêm, Hà Nội" },
  { question: "Có bác sĩ chuyên khoa không?", answer: "Dạ có, bên em có đầy đủ các chuyên khoa từ nội, ngoại, nhi, da liễu..." },
  { question: "Đặt lịch khám như thế nào?", answer: "Bạn có thể đặt lịch qua trang Đặt Khám hoặc gọi hotline 1900 1234." },
  { question: "Có khám ngoài giờ không?", answer: "Dạ có. Chúng tôi phục vụ ngoài giờ đến 20h00 hằng ngày, kể cả cuối tuần." },
  { question: "Có làm việc cuối tuần không?", answer: "Dạ có, chúng tôi mở cửa cả thứ 7 và Chủ nhật." },
  { question: "Khám có cần đặt trước không?", answer: "Bạn nên đặt trước để giữ chỗ và giảm thời gian chờ đợi." },
  { question: "Thời gian khám mất bao lâu?", answer: "Thông thường 15–30 phút, tùy theo tình trạng cụ thể của bạn." },
  { question: "Chi phí khám bao nhiêu?", answer: "Chi phí khám từ 200.000đ – 500.000đ tùy chuyên khoa." },
  { question: "Có thanh toán bảo hiểm y tế không?", answer: "Hiện tại chúng tôi chưa hỗ trợ BHYT, nhưng có nhiều gói ưu đãi khám tổng quát." },
  { question: "Có dịch vụ lấy mẫu tại nhà không?", answer: "Dạ có, bạn có thể đặt dịch vụ lấy mẫu xét nghiệm tại nhà qua hotline." },
  { question: "Có tiêm ngừa không?", answer: "Hiện tại có dịch vụ tiêm chủng theo yêu cầu, bạn nên gọi trước để đặt lịch." },
  { question: "Lấy kết quả ở đâu?", answer: "Bạn có thể xem kết quả khám và xét nghiệm qua ứng dụng hoặc đến phòng khám." },
  { question: "Có hỗ trợ tư vấn online không?", answer: "Dạ có, bạn có thể đặt lịch tư vấn trực tuyến với bác sĩ qua website hoặc app." },
  { question: "Có bãi giữ xe không?", answer: "Có ạ, phòng khám có bãi giữ xe máy và ô tô miễn phí." }
];

const fuse = new Fuse(faq, {
  keys: ["question"],
  threshold: 0.4,
});

const ChatBot = () => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const bottomRef = useRef(null);

  const handleSend = (text = input) => {
    if (!text.trim()) return;

    const lowerInput = text.toLowerCase();
    const result = fuse.search(lowerInput);

    const botReply = result.length
      ? result[0].item.answer
      : "Xin lỗi, tôi chưa hiểu câu hỏi này. Bạn vui lòng hỏi lại? (Hỏi kèm theo các từ khóa như bên dưới để tôi dễ trả lời hơn nha)";

    setMessages((prev) => [
      ...prev,
      { from: "user", text },
      { from: "bot", text: botReply },
    ]);
    setInput("");

    setTimeout(() => {
      bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  const handleFaqClick = (question) => {
    handleSend(question);
  };

  return (
    <div className="chatbot-container">
      {open && (
        <Row justify="end">
          <Col xs={24} sm={22} md={18} lg={16} xl={14}>
            <Card
                className="chatbot-box"
                title={<Title level={5} style={{ margin: 0 }}>🤖 HỎI ĐÁP CÙNG AI <CheckCircleFilled style={{ color: "#1877F2", fontSize: 16 }} /></Title>}
                extra={<Button onClick={() => setOpen(false)}>Đóng</Button>}
                bodyStyle={{ padding: 0 }}
                style={{ width: "100%", maxWidth: 800 }}
                >
                <div className="chatbot-content-scrollable">
                    <div className="chatbot-messages">
                    {messages.map((msg, i) => (
                        <div key={i} className={`msg ${msg.from}`}>
                        <Text>{msg.text}</Text>
                        </div>
                    ))}
                    <div ref={bottomRef} />
                    </div>

                    <Divider style={{ margin: "8px 16px" }}>❓ Các câu hỏi phổ biến</Divider>

                    <div className="chatbot-faq-bubbles">
                    {faq.map((item, idx) => (
                        <div key={idx} className="faq-bubble" onClick={() => handleFaqClick(item.question)}>
                        {item.question}
                        </div>
                    ))}
                    </div>
                </div>

                <div className="chatbot-footer">
                    <Row gutter={8}>
                    <Col span={20}>
                        <Input
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Nhập câu hỏi của bạn..."
                        onPressEnter={() => handleSend()}
                        />
                    </Col>
                    <Col span={4}>
                        <Button
                        type="primary"
                        icon={<SendOutlined style={{color:"blue"}} />}
                        onClick={() => handleSend()}
                        style={{ width: "100%", height: "100%", backgroundColor:"transparent" }}
                        />
                    </Col>
                    </Row>
                </div>
            </Card>
          </Col>
        </Row>
      )}

      {!open && (
        <Button
          type="primary"
          shape="circle"
          size="large"          
          icon={<MessageOutlined />}
          className="chatbot-toggle"
          onClick={() => setOpen(true)}
        />
      )}
    </div>
  );
};

export default ChatBot;
