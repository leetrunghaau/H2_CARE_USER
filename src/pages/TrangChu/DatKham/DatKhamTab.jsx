import { Tabs, Row, Typography } from "antd";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import "slick-carousel/slick/slick.css"; // Import CSS của slick-carousel
import "slick-carousel/slick/slick-theme.css"; // Import theme CSS của slick-carousel
import "./DoctorListSlider.css";
import Doctor from "./Doctor";
import PhongKham from "./PhongKham";
const { Title, Text, Paragraph } = Typography;

const DatKhamTabs = () => {
  const [searchParams] = useSearchParams();
  const defaultTab = searchParams.get("tab") || "dat-kham-bac-si";
  const [activeKey, setActiveKey] = useState(defaultTab);

  useEffect(() => {
    // Cập nhật lại activeKey nếu người dùng đổi URL
    setActiveKey(defaultTab);
  }, [defaultTab]);

  const tabItems = [
    {
      key: "dat-kham-bac-si",
      // label: 'Đặt khám Bác sĩ',
      label: (
        <span
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 8, // khoảng cách giữa icon và chữ
            lineHeight: 1, // tránh đẩy lệch
          }}>
          <img
            src="/medical-outline.svg"
            alt="icon"
            style={{
              width: 20,
              height: 20,
              display: "block",
            }}
            className="icon-tab"
          />
          Đặt khám Bác sĩ
        </span>
      ),
      children: (
        <>
          <Row
            justify="space-between"
            align="middle"
            style={{ margin: "24px 0" }}>
            <Title level={4} style={{ margin: 0 }}>
              Đặt khám bác sĩ
            </Title>
            {/* <Button type="link" className="view-more-button">
                Xem thêm <RightOutlined />
                </Button> */}
          </Row>

          <Doctor />
        </>
      ),
    },

    {
      key: "dat-kham-phong-kham",
      label: (
        <span
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 8, // khoảng cách giữa icon và chữ
            lineHeight: 1, // tránh đẩy lệch
          }}>
          <img
            src="/medkit-outline.svg"
            alt="icon"
            style={{
              width: 20,
              height: 20,
              display: "block",
            }}
            className="icon-tab"
          />
          Đặt khám Phòng khám
        </span>
      ),
      children: <PhongKham />,
    },

    // {
    //     key: 'dat-kham-benh-vien',
    //     label: (
    //     <span
    //         style={{
    //         display: 'inline-flex',
    //         alignItems: 'center',
    //         gap: 8, // khoảng cách giữa icon và chữ
    //         lineHeight: 1, // tránh đẩy lệch
    //         }}
    //     >
    //         <img
    //         src="/business-outline.svg"
    //         alt="icon"
    //         style={{
    //             width: 20,
    //             height: 20,
    //             display: 'block',
    //         }}
    //         className='icon-tab'
    //         />
    //         Đặt khám Bệnh viện
    //     </span>
    // ),
    //     children: <p style={{color:"red"}}>Danh sách bệnh viện (SẮP CÓ)</p>,
    // },

    // {
    //     key: 'dat-lich-tiem-chung',
    //     label: (
    //     <span
    //         style={{
    //         display: 'inline-flex',
    //         alignItems: 'center',
    //         gap: 8, // khoảng cách giữa icon và chữ
    //         lineHeight: 1, // tránh đẩy lệch
    //         }}
    //     >
    //         <img
    //         src="/flask-outline.svg"
    //         alt="icon"
    //         style={{
    //             width: 20,
    //             height: 20,
    //             display: 'block',
    //         }}
    //         className='icon-tab'
    //         />
    //         Đặt lịch tiêm chủng
    //     </span>
    //     ),
    //     children: <p style={{color:"red"}}>Thông tin tiêm chủng (SẮP CÓ)</p>,
    // },
  ];

  return (
    <div style={{ padding: "0 20px 20px", maxWidth: 1200, margin: "0 auto" }}>
      <Tabs
        // defaultActiveKey="dat-kham-bac-si"
        activeKey={activeKey}
        onChange={(key) => {
          setActiveKey(key);
          navigate(`/dat-kham?tab=${key}`);
        }}
        centered
        items={tabItems}
        tabBarGutter={80}
        size="large"
      />
    </div>
  );
};

export default DatKhamTabs;
