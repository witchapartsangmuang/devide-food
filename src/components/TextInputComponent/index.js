import React from 'react'
import { Col, Row, Button, Input } from 'antd'
import './index.css'
const TextInputComponent = (props) => {
    const { value, placeholder, funcOnChange, funcOnClick, buttonLabel } = props
    return (
        <Row className='margin-bottom-10'>
            <Col span={16}><Input value={value} placeholder={placeholder} onChange={(e) => { funcOnChange(e.target.value) }} /></Col>
            <Col span={1}></Col>
            <Col span={7}><Button className='width100 text-align-center' type="primary" onClick={(e) => { funcOnClick(e.target.value) }}>{buttonLabel}</Button></Col>
        </Row>
    )
}
export default TextInputComponent