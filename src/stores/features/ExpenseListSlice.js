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
        },
        updateExpenseToList: (state, action) => {
            const updateState = []
            const expenseObj = state.expenseList.map((expense, index) => {
                if (expense.expenseId === action.payload.expenseId) {
                    if (action.payload.memberSelectList.length > 0) {
                        updateState.push(action.payload)
                    }
                } else {
                    updateState.push(expense)
                }
            })
            state.expenseList = updateState
        },
        updateAfterRemoveMember: (state, action) => {
            const updateState = []
            state.expenseList.map((expense, index) => {
                const expenseObj = {
                    expenseId: expense.expenseId,
                    expenseName: expense.expenseName,
                    expensePrice: expense.expensePrice,
                    memberSelectList: expense.memberSelectList.filter((memberId) => (memberId !== action.payload))
                }
                updateState.push(expenseObj)
            })
            state.expenseList = updateState
        },
        removeAllExpense: (state, action) => {
            state.expenseList = []
        }
    }
})
export const { addExpenseToList, updateExpenseToList, updateAfterRemoveMember, removeAllExpense } = ExpenseListSlice.actions
export default ExpenseListSlice.reducer