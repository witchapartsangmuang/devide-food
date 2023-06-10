import { createSlice } from '@reduxjs/toolkit'
const initialState = {
  memberList: [],
}
export const MemberListSlice = createSlice({
  name: 'MemberListManage',
  initialState,
  reducers: {
    addMemberToList: (state, action) => {
      state.memberList = [...state.memberList, action.payload]
      localStorage.setItem("memberList", JSON.stringify(state.memberList))
    },
    removeMemberFromList: (state, action) => {
      state.memberList = action.payload
      localStorage.setItem("memberList", JSON.stringify(state.memberList))
    },
    removeAllMemberFromList: (state) => {
      state.memberList = []
      localStorage.setItem("memberList", JSON.stringify(state.memberList))
    },
    loadMemberListLocalStorage: (state) => {
      if (localStorage.getItem('memberList') != null) {
        state.memberList = JSON.parse(localStorage.getItem('memberList'))
      }
    }
  }
})
export const { addMemberToList, removeMemberFromList, removeAllMemberFromList, loadMemberListLocalStorage } = MemberListSlice.actions
export default MemberListSlice.reducer