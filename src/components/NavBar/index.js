import React, { useState } from 'react'
import css from '../NavBar/index.css'
import { Menu } from 'antd'
import { setActivingNavbar } from '../../stores/features/activeNavbarSlice.js'
import { useSelector, useDispatch } from 'react-redux'
const NavBar = () => {
	const dispatch = useDispatch()
	const activingNavbar = useSelector((state) => state.activeNavbar.activingNavbar)
	const acitveNavbarOnclick = (button) => {
		dispatch(setActivingNavbar(button.key))
	}
	const buttonNavbar = [
		{
			label: 'สมาชิก',
			key: 'member',
		},
		{
			label: 'รายการจ่าย',
			key: 'expensesList',
		},
		{
			label: 'สรุปค่าใช้จ่าย',
			key: 'summary',
		},
	]
	return (
		<>
			<Menu onClick={acitveNavbarOnclick} selectedKeys={[activingNavbar]} mode="horizontal" items={buttonNavbar} />
		</>
	)
}
export default NavBar