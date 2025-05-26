import React, { useEffect, useState } from "react";
import {
  Row,
  Col,
  Card,
  Avatar,
  Typography,
  Button,
  Divider,
  Radio,
  Input,
  Upload,
  Form,
  notification,
  message,
} from "antd";
import {
  UserOutlined,
  UploadOutlined,
  DownOutlined,
  UpOutlined,
} from "@ant-design/icons";
import './CheckOutDatLich.css'
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { datLichKhamBenh, datLichKhamBenhVnPay, fetchDoctorByNgayGio } from "../../../services/apiDoctor";
import moment from "moment";

const { Title, Text } = Typography;
const { TextArea } = Input;

const CheckOutDatLich = () => {
    const [expandPatient, setExpandPatient] = useState(true);
    const [priceType, setPriceType] = useState(null); // giá khám
    const [reason, setReason] = useState(""); // lý do đi khám
    const location = useLocation(); // Lấy location
    const queryParams = new URLSearchParams(location.search);
    const doctorId = queryParams.get('id');
    const idGioKhamBenh = queryParams.get('idGioKhamBenh');
    const ngayKham = queryParams.get('ngayKham');
    const [paymentMethod, setPaymentMethod] = useState('offline'); // Trạng thái mặc định là thanh toán online

    const [infoDoctorr, setInfoDoctorr] = useState(null)
    const [tenGio, setTenGio] = useState(null)
    const [ngayKhamBenh, setNgayKhamBenh] = useState(null)

    const [value, setValue] = useState(infoDoctorr?.giaKhamVN);
    const [tongtien, setTongTien] = useState(0)
    const [loadingSubmit, setLoadingSubmit] = useState(false)
    const [form] = Form.useForm()

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const isAuthenticated = useSelector(state => state.account.isAuthenticated)
    const acc = useSelector(s => s.account.user)

    

    const handlePaymentChange = (event) => {
        setPaymentMethod(event.target.value);
    };

    useEffect(() => {
        const fetchInfoDoctor = async () => {
            if (doctorId && idGioKhamBenh && ngayKham) {
                // const res = await fetchDoctorByNgayGio(doctorId, idGioKhamBenh, ngayKham);
                const res = await fetchDoctorByNgayGio(location.search);
                console.log("res:", res);
                if (res && res.infoDoctor) {
                    setInfoDoctorr(res.infoDoctor);
                    setTenGio(res.tenGio);
                    setNgayKhamBenh(res.ngayKham);
                }
            }
        }
        fetchInfoDoctor();
    }, [doctorId, idGioKhamBenh, ngayKham])

    useEffect(() => {
        if (infoDoctorr?.giaKhamVN) {
            setPriceType(infoDoctorr.giaKhamVN);
        }
        setPaymentMethod('offline')
    }, [infoDoctorr]);


    const englishToVietnameseDays = {
        'Sunday': 'Chủ nhật',
        'Monday': 'Thứ 2',
        'Tuesday': 'Thứ 3',
        'Wednesday': 'Thứ 4',
        'Thursday': 'Thứ 5',
        'Friday': 'Thứ 6',
        'Saturday': 'Thứ 7'
    };

    const formatDate = (dateString) => {
        const date = moment(dateString);
        const englishDay = date.format('dddd'); // Lấy tên ngày bằng tiếng Anh
        const vietnameseDay = englishToVietnameseDays[englishDay]; // Chuyển sang tiếng Việt
        return `${vietnameseDay} - ${date.format('DD/MM/YYYY')}`;
    }
    const formatDateDatLich = (dateString) => {
        const date = moment(dateString);
        const englishDay = date.format('dddd'); // Lấy tên ngày bằng tiếng Anh
        const vietnameseDay = englishToVietnameseDays[englishDay]; // Chuyển sang tiếng Việt
        return `${date.format('DD/MM/YYYY')}`;
    }


    const onChange = (e) => {
        console.log('radio checked', e.target.value);
        setValue(e.target.value);
    };
    const formatCurrency = (value) => {
        if (value === null || value === undefined) return '';
        return `${value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')} VNĐ`;
    };

    const handleDatLich = async (values) => {
        // const { _idDoctor, _idTaiKhoan, patientName, email,
        //     gender, phone, dateBenhNhan, address, lidokham,
        //     hinhThucTT, tenGioKham, ngayKhamBenh, giaKham
        // } = values

        const bookingData = {
            _idDoctor: infoDoctorr?._id,
            _idTaiKhoan: acc?._id,
            patientName: acc?.lastName + " " + acc?.firstName,
            email: acc?.email,
            gender: acc?.gender,
            phone: acc?.phone,
            dateBenhNhan: new Date().toLocaleDateString('en-CA'), // Nếu không có, dùng ngày hiện tại 
            address: acc?.address,
            lidokham: reason,
            hinhThucTT: paymentMethod,
            tenGioKham: tenGio?.tenGio || "",
            ngayKhamBenh: formatDateDatLich(ngayKhamBenh),         
            giaKham: priceType,
        };

        console.log("bookingData: ",bookingData);
        

        if (!reason.trim()) {
            notification.error({
                message: 'Đã có lỗi xảy ra',
                description: "Vui lòng điền lý do khám"
            })
            return; // dừng xử lý nếu chưa nhập lý do
        }
       
        if (paymentMethod === 'online') {
            setLoadingSubmit(true)
            const res = await datLichKhamBenhVnPay(
                bookingData
            )
            console.log("res dat lich: ", res);


            if (res && res.data && res.paymentUrl) {
                message.success(res.message);
                // form.resetFields()
                window.open(res.paymentUrl, '_blank');
                navigate('/')
            } else {
                notification.error({
                    message: 'Đã có lỗi xảy ra',
                    description: res.message
                })
            }
            setLoadingSubmit(false)

        } else {
            setLoadingSubmit(true)
            const res = await datLichKhamBenh(
               bookingData
            )
            console.log("res dat lich: ", res);


            if (res && res.data) {
                message.success(res.message);
                // form.resetFields()
                navigate('/')
            } else {
                notification.error({
                    message: 'Đã có lỗi xảy ra',
                    description: res.message
                })
            }
            setLoadingSubmit(false)
        }
    }
    const dateFormatList = ['DD/MM/YYYY', 'DD/MM/YY', 'DD-MM-YYYY', 'DD-MM-YY'];
    const idKH = acc?._id
    useEffect(() => {
        if (infoDoctorr) {
            form.setFieldsValue({
                // thongTinDoctor: `${infoDoctorr.chucVuId.map(item => item?.name).join(', ')} - ${infoDoctorr.lastName} ${infoDoctorr.firstName}`,
                // noiKham: `${infoDoctorr?.phongKhamId.name}`,
                // diaChiKham: `${infoDoctorr?.phongKhamId.address}`,
                // avtDoctor: `${infoDoctorr?.image}`,
                tenGioKham: `${tenGio?.tenGio}`,
                ngayKhamBenh: `${formatDateDatLich(ngayKhamBenh)}`,
                _idTaiKhoan: `${idKH}`,
                _idDoctor: `${infoDoctorr?._id}`
            });
        }
    }, [infoDoctorr, idKH]);

    const [openModalLogin, setOpenModalLogin] = useState(false);

    const notificationContent = () => (
        <div>
            <span>
                Vui lòng đăng nhập trước khi đặt lịch! <br /> Bấm vào đây để
            </span>
            <Button
                type="link"
                style={{ marginLeft: '8px' }}
                onClick={() => {
                    // navigator('/admin/ke-hoach-doctor')
                    setOpenModalLogin(true)
                }}
            >
                Tiến hành đăng nhập
            </Button>
        </div>
    );

    const patientInfo = {
        code: "YMP252210865",
        name: "Khắc Tú",
        gender: "Nam",
        dob: "18/02/2002",
        phone: "0972138493",
        avatar: null,
        isSelf: true,
    };

  return (
    <Row
      gutter={[24, 24]}
      style={{ padding: 24, background: "#f0f2f5", minHeight: "100vh" }}
    >
      {/* Left Side: Form */}
      <Col xs={24} md={16}>
        <Card
          title="1. Ngày và giờ khám"
          style={{ marginBottom: 24 }}
          bordered={false}
        >
          <Row>
            <Col span={12}>
              <Text className="txt-tt-info" strong>Ngày khám</Text>
            </Col>
            <Col span={12}>
              <Text className="txt-tt-info">{formatDate(ngayKhamBenh)}</Text>
            </Col>
          </Row>
          <Row>
            <Col span={12}>
              <Text className="txt-tt-info" strong>Khung giờ</Text>
            </Col>
            <Col span={12}>
              <Text className="txt-tt-info">{tenGio?.tenGio}</Text>
            </Col>
          </Row>
        </Card>

        <Card
            title="2. Hồ sơ bệnh nhân"
            bordered={false}            
            extra={
                <Button
                type="link"
                onClick={() => setExpandPatient(!expandPatient)}
                style={{ padding: 0 }}
                >
                {expandPatient ? (
                    <>
                    Thu gọn <UpOutlined />
                    </>
                ) : (
                    <>
                    Mở rộng <DownOutlined />
                    </>
                )}
                </Button>
            }
        >
          {expandPatient && (
            isAuthenticated ? (
              <>
                <Card
                  type="inner"
                  bordered={true}
                  style={{ border: "2px solid #1890ff", borderRadius: 8, marginBottom: 16 }}
                  bodyStyle={{ padding: 40 }}
                >
                  <Row gutter={16} align="middle">
                    <Col>
                      <Avatar
                        src={`${import.meta.env.VITE_BACKEND_URL}/uploads/${acc?.image}`}
                        size={64}
                        icon={<UserOutlined />}
                      />
                    </Col>
                    <Col flex="auto">
                      <Title level={4} style={{ marginBottom: 4 }}>
                        {acc?.lastName} {acc?.firstName}
                        <Text
                          style={{
                            fontSize: 12,
                            color: "#096dd9",
                            border: "1px solid #bae7ff",
                            borderRadius: 4,
                            padding: "0 6px",
                            marginLeft: 8,
                          }}
                        >
                          Tôi
                        </Text>
                      </Title>
                      <Text style={{ fontSize: 16 }} type="secondary">
                        {acc?.address}
                      </Text>
                    </Col>
                  </Row>

                  <Divider style={{ margin: "16px 0" }} />

                  <Row>
                    <Col span={12}>
                      <Text className="txt-tt-info" strong>
                        Họ và tên
                      </Text>
                    </Col>
                    <Col span={12}>
                      <Text className="txt-tt-info">
                        {acc?.lastName} {acc?.firstName}
                      </Text>
                    </Col>
                  </Row>
                  <Row>
                    <Col span={12}>
                      <Text className="txt-tt-info" strong>
                        Giới tính
                      </Text>
                    </Col>
                    <Col span={12}>
                      <Text className="txt-tt-info">{acc?.gender ? "Nam" : "Nữ"}</Text>
                    </Col>
                  </Row>
                  <Row>
                    <Col span={12}>
                      <Text className="txt-tt-info" strong>
                        Email
                      </Text>
                    </Col>
                    <Col span={12}>
                      <Text className="txt-tt-info">{acc?.email}</Text>
                    </Col>
                  </Row>
                  <Row>
                    <Col span={12}>
                      <Text className="txt-tt-info" strong>
                        Số điện thoại
                      </Text>
                    </Col>
                    <Col span={12}>
                      <Text className="txt-tt-info">{acc?.phone}</Text>
                    </Col>
                  </Row>
                  <Row>
                    <Col span={12}>
                      <Text className="txt-tt-info" strong>
                        Địa chỉ
                      </Text>
                    </Col>
                    <Col span={12}>
                      <Text className="txt-tt-info">{acc?.address}</Text>
                    </Col>
                  </Row>
                </Card>
              </>
            ) : (
              <></>
            )
          )}


          <div style={{ marginTop: 16 }}>
            <Text>Lý do đi khám</Text>
            <TextArea
              rows={4}
              placeholder="Triệu chứng, thuốc đang dùng, tiền sử, ..."
              style={{ marginTop: 8 }}
              onChange={(e) => setReason(e.target.value)}
            />
          </div>         
         
          {/* Bổ sung Radio chọn giá */}
          <Divider style={{ marginTop: 48, marginBottom: 16 }} />
          <Title level={5}>Chọn Giá</Title>
          <Radio.Group
            onChange={(e) => setPriceType(e.target.value)}
            value={priceType}
            style={{ marginBottom: 24, }}
          >
            <Radio style={{fontSize: 17, color: 'red'}} value={infoDoctorr?.giaKhamVN}>Giá trong nước: {formatCurrency(infoDoctorr?.giaKhamVN)}</Radio>
            <Radio style={{fontSize: 17, color: 'red'}} value={infoDoctorr?.giaKhamNuocNgoai}>
              Giá ngoài nước: {formatCurrency(infoDoctorr?.giaKhamNuocNgoai)}
            </Radio>
          </Radio.Group>

          {/* Bổ sung Radio chọn phương thức thanh toán */}
          <Divider style={{ marginBottom: 16 }} />
          <Title level={5}>Phương thức thanh toán</Title>
          <Radio.Group
            onChange={(e) => setPaymentMethod(e.target.value)}
            value={paymentMethod}
            style={{ marginBottom: 24 }}
          >
            <Radio style={{fontSize: 17, color: 'navy'}} value="offline">Tiền mặt</Radio>            
            <Radio style={{fontSize: 17, color: 'navy'}} value="online">
              Chuyển khoản trực tuyến
            </Radio>
          </Radio.Group>
        </Card>
      </Col>

      {/* Right Side: Booking info */}
      <Col xs={24} md={8}>
        <Card bordered={false}>
          <Row gutter={[16, 16]} align="middle">
            <Col>
              <Avatar size={64} src={`${import.meta.env.VITE_BACKEND_URL}/uploads/${infoDoctorr?.image}`} icon={<UserOutlined />} />
            </Col>
            <Col flex="auto">
              <Title level={5} style={{ marginBottom: 0 }}>
                {infoDoctorr?.lastName} {infoDoctorr?.firstName}
              </Title>
              <Text type="secondary">{infoDoctorr?.address}</Text>
            </Col>
          </Row>

          <Divider />

          <Row>
            <Col span={12}>
              <Text className="txt-tt-info" strong>Ngày khám</Text>
            </Col>
            <Col span={12}>
              <Text className="txt-tt-info">{formatDate(ngayKhamBenh)}</Text>
            </Col>
          </Row>
          <Row>
            <Col span={12}>
              <Text className="txt-tt-info" strong>Khung giờ</Text>
            </Col>
            <Col span={12}>
              <Text className="txt-tt-info">{tenGio?.tenGio}</Text>
            </Col>
          </Row>
          <Row>
            <Col span={12}>
              <Text className="txt-tt-info" strong>Bệnh nhân</Text>
            </Col>
            <Col span={12}>
              <Text className="txt-tt-info">{acc?.lastName} {acc?.firstName}</Text>
            </Col>
          </Row>
          {isAuthenticated ? <>
          <Button onClick={handleDatLich} loading={loadingSubmit} className="btn-dat-lich-ne" type="primary" block style={{ marginTop: 24 }}>
            Đặt lịch
          </Button>
          </> : <>
           <Button onClick={() => message.error('Vui lòng đăng nhập!')} loading={loadingSubmit} className="btn-dat-lich-ne" type="primary" block style={{ marginTop: 24 }}>
            Đặt lịch
          </Button>
          </>}

          <Text type="dancer" style={{ marginTop: 8, display: "block", color:'navy' }}>
            Bằng cách nhấn nút xác nhận, bạn đã đồng ý với các điều khoản và điều kiện đặt khám
          </Text>
        </Card>
      </Col>
    </Row>
  );
};

export default CheckOutDatLich;
