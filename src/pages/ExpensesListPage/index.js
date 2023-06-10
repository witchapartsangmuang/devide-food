import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Card, Col, Row, Button, Typography, Tag } from 'antd'
import './index.css'
import ListExpenseModal from '../../components/ListExpenseModal'
import DeleteModal from '../../components/DeleteModal'
import { removeAllExpense, loadExpenseListLocalStorage } from '../../stores/features/ExpenseListSlice'
const ExpensesListPage = () => {
    const dispatch = useDispatch()
    const expenseList = useSelector((state) => state.expenseListManage.expenseList)
    const memberList = useSelector((state) => state.memberListManage.memberList)
    const [isOpenExpenseModal, setIsOpenExpenseModal] = useState(false)
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
    const [expenseId, setExpenseId] = useState('')
    const defineEditId = (id) => {
        setExpenseId(id)
        onClickOpenExpenseModal()
    }
    const onClickOpenExpenseModal = () => {
        if (isOpenExpenseModal === true) {
            setIsOpenExpenseModal(false)
        } else {
            setIsOpenExpenseModal(true)
        }
    }
    const onClickOpenDeleteModal = () => {
        if (isDeleteModalOpen === true) {
            setIsDeleteModalOpen(false)
        } else {
            setIsDeleteModalOpen(true)
        }
    }
    const clearAllExpense = () => {
        dispatch(removeAllExpense())
        onClickOpenDeleteModal()
    }
    useEffect(() => {
        dispatch(loadExpenseListLocalStorage())
    }, [])
    return (
        <Card className='expense-page'>
            {
                expenseList?.map((expense, index) => {
                    return (
                        <Row key={index} className='margin-bottom-5'>
                            <Card className='width100 box-shodow expenseList-Card' onClick={() => { defineEditId(expense.expenseId) }}>
                                <Row>
                                    <Col span={12}><Typography>ชื่อรายการ : {expense.expenseName}</Typography></Col>
                                    <Col span={12}><Typography>ราคา : {expense.expensePrice}</Typography></Col>
                                </Row>

                                <Row key={index} className='margin-bottom-5'>
                                    {
                                        expense.memberSelectList.map((memberId, index) => {
                                            const diplay = memberList.filter((member) => (member.key === memberId))[0]
                                            return (
                                                <Col key={index} span={8} className='Col-member-Tag'>
                                                    <Tag className='width100 height100 text-align-center member-Tag' color={diplay.color}>{diplay.name}</Tag>
                                                </Col>
                                            )
                                        })
                                    }
                                </Row>
                            </Card>
                        </Row>
                    )
                })
            }
            <ListExpenseModal
                title={'เพิ่มรายการจ่าย'}
                expenseId={expenseId}
                setExpenseId={setExpenseId}
                isOpen={isOpenExpenseModal}
                funcOnClickIsOpen={onClickOpenExpenseModal}
            />
            <DeleteModal title={'ต้องการล้างรายการหรือไม่ ?'}
                isOpen={isDeleteModalOpen}
                onOk={clearAllExpense}
                onCancel={onClickOpenDeleteModal}
            />
            <Row className='margin-bottom-10'>
                <Button
                    type="dashed"
                    className='width100 box-shodow'
                    style={{ height: '45px' }}
                    onClick={() => { defineEditId('') }}
                >
                    เพิ่มรายการ
                </Button>
            </Row>
            <Row>
                <Button
                    type="primary"
                    danger
                    style={{ width: '100%', height: '45px' }}
                    onClick={() => { onClickOpenDeleteModal() }}
                    disabled={expenseList.length === 0}
                >
                    ล้างรายการทั้งหมด
                </Button>
            </Row>
        </Card>
    )
}
export default ExpensesListPage