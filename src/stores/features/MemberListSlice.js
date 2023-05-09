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
    },
    removeMemberFromList: (state, action) => {
        state.memberList = action.payload
    },
    removeAllMemberFromList: (state, action) => {
      state.memberList = []
  },
  }
})
export const { addMemberToList, removeMemberFromList, removeAllMemberFromList } = MemberListSlice.actions
export default MemberListSlice.reducer