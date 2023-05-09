import { configureStore } from '@reduxjs/toolkit'
import activeNavbarReducer from './features/activeNavbarSlice.js'
import memberListManageReducer from './features/MemberListSlice.js'
import expenseListManageReducer from './features/ExpenseListSlice.js'
export const store = configureStore({
    reducer: {
        activeNavbar: activeNavbarReducer,
        memberListManage: memberListManageReducer,
        expenseListManage: expenseListManageReducer

    },
  })