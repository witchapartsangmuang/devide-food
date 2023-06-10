import { createSlice } from '@reduxjs/toolkit'
const initialState = {
    expenseList: [],
}
export const ExpenseListSlice = createSlice({
    name: 'ExpenseListManage',
    initialState,
    reducers: {
        addExpenseToList: (state, action) => {
            state.expenseList = [...state.expenseList, action.payload]
            localStorage.setItem("expenseList", JSON.stringify(state.expenseList))
        },
        updateExpenseToList: (state, action) => {
            const updateState = []
            state.expenseList.map((expense) => {
                if (expense.expenseId === action.payload.expenseId) {
                    if (action.payload.memberSelectList.length > 0) {
                        updateState.push(action.payload)
                    }
                } else {
                    updateState.push(expense)
                }
            })
            state.expenseList = updateState
            localStorage.setItem("expenseList", JSON.stringify(state.expenseList))
        },
        updateAfterRemoveMember: (state, action) => {
            const updateState = []
            state.expenseList.map((expense) => {
                const expenseObj = {
                    expenseId: expense.expenseId,
                    expenseName: expense.expenseName,
                    expensePrice: expense.expensePrice,
                    memberSelectList: expense.memberSelectList.filter((memberId) => (memberId !== action.payload))
                }
                updateState.push(expenseObj)
            })
            state.expenseList = updateState
            localStorage.setItem("expenseList", JSON.stringify(state.expenseList))
        },
        removeAllExpense: (state) => {
            state.expenseList = []
            localStorage.setItem("expenseList", JSON.stringify(state.expenseList))
        },
        loadExpenseListLocalStorage: (state) => {
            if (localStorage.getItem('expenseList') != null) {
                state.expenseList = JSON.parse(localStorage.getItem('expenseList'))
            }
        }
    }
})
export const { addExpenseToList, updateExpenseToList, updateAfterRemoveMember, removeAllExpense, loadExpenseListLocalStorage } = ExpenseListSlice.actions
export default ExpenseListSlice.reducer