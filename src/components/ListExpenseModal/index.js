import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Card, Col, Row, Button, Input, InputNumber, Modal, Typography, Tag } from 'antd'
import css from './index.css'
import { addExpenseToList, updateExpenseToList } from '../../stores/features/ExpenseListSlice'

const ListExpenseModal = (props) => {
    const dispatch = useDispatch()
    const { title, isOpen, expenseId, setExpenseId, funcOnClickIsOpen } = props
    const memberList = useSelector((state) => state.memberListManage.memberList)
    const expenseList = useSelector((state) => state.expenseListManage.expenseList)
    const [expenseName, setExpenseName] = useState('')
    const [expensePrice, setExpensePrice] = useState(0)
    const [colorTag, setColorTag] = useState('')
    const [memberSelectList, setMemberSelectList] = useState([])
    const colorPresets = ["magenta", "volcano", "orange", "gold", "lime", "green", "cyan", "geekblue", "purple"]
    const selectAllMember = () => {
        setMemberSelectList([])
        const memberIdList = []
        memberList.map((member, index) => {
            memberIdList.push(member.key)
        })
        setMemberSelectList(memberIdList)
    }
    const removeAllMember = () => {
        setMemberSelectList([])
    }
    const addMemberToEachExpense = (key) => {
        if (memberSelectList.filter((memberId) => (memberId === key)).length === 0) {
            setMemberSelectList([...memberSelectList, key])
        }
    }
    const removeMemberFromEachExpense = (key) => {
        setMemberSelectList(memberSelectList.filter((memberId) => (memberId !== key)))
    }
    const onOk = () => {
        if (expenseId === '') {
            const expenseObj = {
                expenseId: expenseList.length,
                expenseName: expenseName,
                expensePrice: expensePrice,
                colorTag: colorPresets[Math.floor(Math.random() * colorPresets.length)],
                memberSelectList: memberSelectList
            }
            if (memberSelectList.length > 0) {
                dispatch(addExpenseToList(expenseObj))
            }
        } else {
            const expenseObj = {
                expenseId: expenseId,
                expenseName: expenseName,
                expensePrice: expensePrice,
                colorTag: colorTag,
                memberSelectList: memberSelectList
            }
            dispatch(updateExpenseToList(expenseObj))
        }
        setExpenseId('')
        onCancel()
    }
    const onCancel = () => {
        funcOnClickIsOpen()
        setExpenseName('')
        setExpensePrice(0)
        setColorTag('')
        setMemberSelectList([])
    }
    useEffect(() => {
        if (expenseId !== '') {
            setExpenseName(expenseList.filter((expense) => (expense.expenseId === expenseId))[0].expenseName)
            setExpensePrice(expenseList.filter((expense) => (expense.expenseId === expenseId))[0].expensePrice)
            setColorTag(expenseList.filter((expense) => (expense.expenseId === expenseId))[0].colorTag)
            setMemberSelectList(expenseList.filter((expense) => (expense.expenseId === expenseId))[0].memberSelectList)
        }
    }, [expenseId])
    return (
        <Modal
            title={title}
            open={isOpen}
            onCancel={onCancel}
            onOk={onOk}
        >
            <Row className='padding-5'>
                <Col span={8}>ชื่อรายการ : </Col>
                <Col span={16}><Input placeholder='ชื่อรายการ' value={expenseName} onChange={(e) => { setExpenseName(e.target.value) }} /></Col>
            </Row>
            <Row className='padding-5'>
                <Col span={8}>ราคา : </Col>
                <Col span={16}><InputNumber className='width100' min={0} value={expensePrice} onChange={(value) => { setExpensePrice(value) }} /></Col>
            </Row>
            <Row>
                <Col span={12} className='padding-5 Col-member-Tag'>
                    <Tag className='width100 height100 text-align-center member-Tag' bordered={true} color={'blue'} onClick={() => { selectAllMember() }}>+ เลือกทุกคน</Tag>
                </Col>
                <Col span={12} className='padding-5 Col-member-Tag'>
                    <Tag className='width100 height100 text-align-center member-Tag' bordered={true} color={'red'} onClick={() => { removeAllMember() }}>- ล้างรายชื่อ</Tag>
                </Col>
                {
                    memberList.map((member, index) => {
                        if (memberSelectList.filter((memberId) => (memberId == member.key)).length === 0) {
                            return (
                                <Col key={index} span={8} className='padding-5 Col-member-Tag'>
                                    <Tag className='width100 height100 text-align-center member-Tag' bordered={true} color={member.color} onClick={() => { addMemberToEachExpense(member.key) }}>{member.name}</Tag>
                                </Col>
                            )
                        } else {
                            return (
                                <Col key={index} span={8} className='padding-5 Col-member-Tag'>
                                    <Tag className='width100 height100 text-align-center member-Tag Tag-selected' bordered={true} color={member.color} onClick={() => { removeMemberFromEachExpense(member.key) }}>{member.name}</Tag>
                                </Col>
                            )
                        }
                    })
                }
            </Row>
        </Modal>
    )
}
export default ListExpenseModal