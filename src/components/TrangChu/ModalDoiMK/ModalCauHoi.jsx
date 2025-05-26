import { Button, Checkbox, Col, Divider, Form, Input, message, Modal, Row } from "antd"
import { useEffect, useState } from "react"
import { FaRegCircleQuestion } from "react-icons/fa6"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { fetchAllChuyenKhoa, handleCreateCauHoi } from "../../../services/apiDoctor"
import './css.css'
const ModalCauHoi = (props) => {

    const {openModalCauHoi, setOpenModalCauHoi} = props
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [form] = Form.useForm()
    const [loading, setLoading] = useState(false);
    const [dataChuyenKhoa, setDataChuyenKhoa] = useState([])   

    useEffect(() => {
        fetchAllChuyenKhoaDoctor()
    }, [openModalCauHoi])

    const submitCauHoi = async (values) => {
        const {
            lastName, firstName, email, chuyenKhoaId, cauHoi
        } = values

        console.log("lastName, firstName, email, chuyenKhoaId, cauHoi: ",lastName, firstName, email, chuyenKhoaId, cauHoi);
        setLoading(true)
        let res = await handleCreateCauHoi(email, firstName, lastName, chuyenKhoaId, cauHoi)
        if(res && res.data) {
            message.success(res.message)
            cancel()
        }
        setLoading(false)        
    }

    const cancel = () => {
        setOpenModalCauHoi(false)
        form.resetFields()
    }

    const fetchAllChuyenKhoaDoctor = async () => {
        let query = `page=1&limit=1000`
        let res = await fetchAllChuyenKhoa(query)
        if(res && res.data) {
            setDataChuyenKhoa(res.data)
        }
    }

  return (
    <Modal
        title="📝 Gửi câu hỏi tới bác sĩ"
        open={openModalCauHoi}
        onCancel={cancel}
        footer={null}
        width={700}
        style={{ top: 30 }}
        maskClosable={false}
    >
        <Divider />

        <Form
            form={form}
            layout="vertical"
            onFinish={submitCauHoi}
            colon={false}
        >
            <Row gutter={[15, 5]}>
            {/* Họ */}
            <Col span={12} xs={24} sm={24} md={12}>
                <Form.Item
                label="Họ"
                name="lastName"
                rules={[
                    { required: true, message: 'Vui lòng nhập họ của bạn' },
                    {
                    pattern: /^[A-Za-zÀ-ỹ\s]+$/,
                    message: 'Họ không hợp lệ (chỉ chữ)',
                    },
                ]}
                hasFeedback
                >
                <Input placeholder="Ví dụ: Nguyễn" />
                </Form.Item>
            </Col>

            {/* Tên */}
            <Col span={12} xs={24} sm={24} md={12}>
                <Form.Item
                label="Tên"
                name="firstName"
                rules={[
                    { required: true, message: 'Vui lòng nhập tên của bạn' },
                    {
                    pattern: /^[A-Za-zÀ-ỹ\s]+$/,
                    message: 'Tên không hợp lệ (chỉ chữ)',
                    },
                ]}
                hasFeedback
                >
                <Input placeholder="Ví dụ: An" />
                </Form.Item>
            </Col>

            {/* Email */}
            <Col span={24}>
                <Form.Item
                label="Email liên hệ"
                name="email"
                rules={[
                    { required: true, message: 'Vui lòng nhập email của bạn' },
                    { type: 'email', message: 'Email không hợp lệ' },
                ]}
                hasFeedback
                >
                <Input placeholder="example@gmail.com" />
                </Form.Item>
            </Col>

            {/* Chuyên khoa */}
            <Col span={24}>
                <Form.Item
                label="Chuyên khoa bạn cần tư vấn"
                name="chuyenKhoaId"
                rules={[{ required: true, message: 'Vui lòng chọn chuyên khoa' }]}
                >
                <Checkbox.Group style={{ display: 'flex', flexWrap: 'wrap', gap: 12 }}>
                    {dataChuyenKhoa.map((item) => (
                    <Checkbox key={item._id} value={item._id}>
                        {item.name}
                    </Checkbox>
                    ))}
                </Checkbox.Group>
                </Form.Item>
            </Col>

            {/* Câu hỏi */}
            <Col span={24}>
                <Form.Item
                label="Nội dung câu hỏi"
                name="cauHoi"
                rules={[{ required: true, message: 'Vui lòng nhập câu hỏi' }]}
                >
                <Input.TextArea
                    rows={4}
                    placeholder="Ví dụ: Tôi thường xuyên đau bụng sau khi ăn, có phải là dấu hiệu của viêm loét dạ dày không?"
                />
                </Form.Item>
            </Col>

            {/* Nút gửi */}
            <Col span={24} style={{ textAlign: 'center', marginTop: 8 }}>
                <Button
                className="btn-taocauhoi"
                onClick={() => form.submit()}
                type="primary"
                size="large"
                loading={loading}
                icon={<FaRegCircleQuestion size={20} />}
                >
                Gửi câu hỏi
                </Button>
            </Col>
            </Row>
        </Form>
    </Modal>
  )
}
export default ModalCauHoi