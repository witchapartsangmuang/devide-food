import React from 'react'
import { Button, Modal } from 'antd'
const DeleteModal = (props) => {
    const { title, isOpen, onOk, onCancel } = props
    return (
        <Modal
            title={title}
            open={isOpen}
            onCancel={onCancel}
            onOk={onOk}
            footer={[
                <Button onClick={onCancel}>
                    ยกเลิก
                </Button>,
                <Button type="primary" danger onClick={onOk}>
                    ตกลง
                </Button>,
            ]}
        >
        </Modal>
    )
}
export default DeleteModal