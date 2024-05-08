import { createSlice } from "@reduxjs/toolkit";

const SearchSlice = createSlice({
    name: 'searchData',
    initialState: null,
    reducers: {
        addData: (state, action) => {
            return action.payload;
        }
    }
})

export const { addData } = SearchSlice.actions;
export default SearchSlice.reducer;