import { createSlice } from '@reduxjs/toolkit'
const initialState = {
  value: 0,
  activingNavbar: 'member'
}
export const activeNavbarSlice = createSlice({
  name: 'activeNavbar',
  initialState,
  reducers: {
    setActivingNavbar: (state, action) => {
      state.activingNavbar = action.payload
    }
  }
})
export const { setActivingNavbar } = activeNavbarSlice.actions
export default activeNavbarSlice.reducer