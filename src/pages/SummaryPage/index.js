import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Card, Col, Row, Button, Input, Modal, Typography, Tag } from 'antd'
import css from './index.css'
const SummaryPage = () => {
    const expenseList = useSelector((state) => state.expenseListManage.expenseList)
    const memberList = useSelector((state) => state.memberListManage.memberList)
    const [summary, SetSummary] = useState([])
    const testsum = []
    useEffect(() => {
        memberList.map((member, index) => {
            let priceEachMember = 0
            let expenseEachMember = []
            expenseList.map((expense, index) => {
                const priceEachMemberForExpense = expense.expensePrice / expense.memberSelectList.length
                if (expense.memberSelectList.filter((memberInExpense) => (memberInExpense === member.key)).length !== 0) {
                    expenseEachMember.push(expense.expenseId)
                    priceEachMember += priceEachMemberForExpense
                }
            })
            testsum.push({
                key: member.key,
                name: member.name,
                perchase: priceEachMember,
                memberExpense: expenseEachMember
            })
            SetSummary(testsum)
        })
    }, [])
    return (
        <Card className='summary-page'>
            {
                summary.map((member, index) => (
                    <Card key={index} className='width100 box-shodow summary-Card'>
                        <Row>
                            <Col span={24}><Typography>{member.name} ({member.perchase.toFixed(2)})</Typography></Col>
                        </Row>
                        <Row>
                            {
                                member.memberExpense.map((expense, index) => (
                                    <Col key={index} span={12} className='Col-expense-Tag'>
                                        <Tag
                                            className='width100 height100 text-align-center expense-Tag'
                                            color={expenseList.filter((expenseObj) => (expenseObj.expenseId === expense))[0].colorTag}>
                                            {expenseList.filter((expenseObj) => (expenseObj.expenseId === expense))[0].expenseName}
                                        </Tag>
                                    </Col>
                                ))
                            }
                        </Row>
                    </Card>
                )
                )
            }
        </Card>
    )
}
export default SummaryPage