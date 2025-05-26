import { Row, Col, Input } from "antd";
import "./Banner.css";
import { useNavigate } from "react-router-dom";
import SplitText from "../../HieuUng/SplitText/SplitText";
import AISearch from "./AiSearch";

const { Search } = Input;

const Banner = () => {
  const navigate = useNavigate();

  const onSearch = (value) => {
    console.log("value: ", value);

    if (value) {
      navigate(`/search?query=${value}`);
    }
  };

  return (
    <section className="hero-wrapper">
      <div className="container">
        <Row align="middle" justify="center" gutter={[32, 32]}>
          <Col xs={24} md={12}>
            <h1 className="hero-title">Ứng dụng đặt khám</h1>

            <SplitText
              text="Đặt khám với hơn 1000 bác sĩ, 25 bệnh viện, 100 phòng khám trên
            H2Care để có số thứ tự và khung giờ khám trước."
              className="hero-sub"
              delay={150}
              animationFrom={{ opacity: 0, transform: "translate3d(0,50px,0)" }}
              animationTo={{ opacity: 1, transform: "translate3d(0,0,0)" }}
              easing="easeOutCubic"
              threshold={0.2}
              rootMargin="-50px"
            />

            <AISearch />
          </Col>

          <Col md={12} className="hero-img-col">
            <img
              src="/your-medical-booking.webp"
              alt="Gia đình"
              className="hero-img"
            />
          </Col>
        </Row>
      </div>
    </section>
  );
};

export default Banner;
