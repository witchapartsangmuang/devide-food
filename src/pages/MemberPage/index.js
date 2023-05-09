import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Card, Col, Row, Button, Input, Form, Radio, Tag } from 'antd'
import TextInputComponent from '../../components/TextInputComponent'
import { addMemberToList, removeMemberFromList, removeAllMemberFromList } from '../../stores/features/MemberListSlice'
import { updateAfterRemoveMember } from '../../stores/features/ExpenseListSlice'
import DeleteModal from '../../components/DeleteModal'
import css from './index.css'
const MemberPage = () => {
    const dispatch = useDispatch()
    const memberList = useSelector((state) => state.memberListManage.memberList)
    const [memberName, setMemberName] = useState('')
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
    const colorPresets = ["magenta", "volcano", "orange", "gold", "lime", "green", "cyan", "geekblue", "purple"]
    const addNewMember = () => {
        const newMember = {
            key: memberList.length,
            name: memberName,
            color: colorPresets[Math.floor(Math.random() * colorPresets.length)]
        }
        dispatch(addMemberToList(newMember))
        setMemberName('')
    }
    const removeMember = (key) => {
        dispatch(removeMemberFromList(memberList.filter((member) => (member.key !== key))))
        dispatch(updateAfterRemoveMember(key))
    }
    const onClickOpenDeleteModal = () => {
        if (isDeleteModalOpen === true) {
            setIsDeleteModalOpen(false)
        } else {
            setIsDeleteModalOpen(true)
        }
    }
    const clearAllMember = () => {
        dispatch(removeAllMemberFromList())
        onClickOpenDeleteModal()
    }
    return (
        <Card className='member-page'>
            {
                memberList.map((member, index) => {
                    return (
                        <Row key={index} className='margin-bottom-10'>
                            <Col span={16}>
                                <Tag className='width100 height100 text-align-center member-Tag' color={member.color}>{member.name}</Tag>
                            </Col>
                            <Col span={1}></Col>
                            <Col span={7}>
                                <Button className='width100 text-align-center' danger onClick={() => { removeMember(member.key) }}>ลบ</Button>
                            </Col>
                        </Row>
                    )
                })
            }
            <TextInputComponent
                value={memberName}
                placeholder={'เพิ่มสมาชิก'}
                funcOnChange={setMemberName}
                funcOnClick={addNewMember}
                buttonLabel={'เพิ่ม'}
            />
            <DeleteModal
                title={'ต้องล้างรายชื่อสมาชิกทั้งหมดหรือไม่ ?'}
                isOpen={isDeleteModalOpen}
                onOk={clearAllMember}
                onCancel={onClickOpenDeleteModal}
            />
            <Button
                type="primary"
                danger
                style={{ width: '100%', height: '45px' }}
                onClick={() => { onClickOpenDeleteModal() }}
                disabled={ memberList.length === 0 }
            >
                ล้างรายชื่อสมาชิกทั้งหมด
            </Button>
        </Card>
    )
}
export default MemberPage