import { createSlice } from "@reduxjs/toolkit";

const UserSlice = createSlice({
    name: 'user',
    initialState: null,
    reducers: {
        addUser: (state, action) => {
            return action.payload;
        },
        deleteUser: (state, action) => {
            return action.payload;
        },
        updatingUser: (state, action) => {
            return action.payload;
        }
    }
})

export const { addUser, deleteUser, updatingUser } = UserSlice.actions;
export default UserSlice.reducer;