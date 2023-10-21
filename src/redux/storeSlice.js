import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchData, fetchDataDetail } from "./storeAPI";

export const fetchDataAsync = createAsyncThunk("./getData", async (search, { rejectWithValue }) => {
    try {
        const response = await fetchData(search);
        return response;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
})
export const fetchDataDetailAsync = createAsyncThunk("./getDataDetail", async (param) => {
    try {
        const response = await fetchDataDetail(param);
        return response;
    } catch (error) {
        rejectWithValue(error.response.data);
    }
})
const initialState = {
    data: [],
    dataDetail: null,
    error: null,
    isLoading: false,
};

export const dataSlice = createSlice({
    name: "allData",
    initialState,
    extraReducers: (builder) => {
        builder
            .addCase(fetchDataAsync.pending, (state, action) => {
                state.isLoading = true;
            })
            .addCase(fetchDataAsync.fulfilled, (state, action) => {
                state.isLoading = false;
                state.data = action.payload;
            })
            .addCase(fetchDataAsync.rejected, (state, action) => {
                state.isLoading = true;
                state.data = [];
                state.error = action.payload.error;
            })
            .addCase(fetchDataDetailAsync.pending, (state, action) => {
                state.isLoading = true;
            })
            .addCase(fetchDataDetailAsync.fulfilled, (state, action) => {
                state.isLoading = false;
                state.dataDetail = action.payload;
            })
            .addCase(fetchDataDetailAsync.rejected, (state, action) => {
                state.isLoading = true;
                state.dataDetail = null;
                state.error = action.payload.error;
            })
    }
})
export const selectLoading = (state) => state.allData.isLoading;
export const selectAllData = (state) => state.allData.data;
export const selectDataDetail = (state) => state.allData.dataDetail;
export default dataSlice.reducer;