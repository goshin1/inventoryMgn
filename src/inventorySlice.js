import { createSlice, createAsyncThunk} from "@reduxjs/toolkit";

const asyncInvenFetch = createAsyncThunk(
    'inventory/asyncInvenFetch',
    async(url) => {
        const resp = await fetch(url);
        const data = await resp.json();
        return data;
    }
);



const inventorySlice = createSlice({
    name : 'inventory',
    initialState : {
        selMonth : 0,
        status : "welcome",
        invList : [{
            "id": -1,
            "nextPid": 1,
            "itemList": [
            {
                "pid": 0,
                "pName": "기본값",
                "days": [[0,0,0], [0,0,0], [0,0,0], [0,0,0], [0,0,0], [0,0,0], [0,0,0], [0,0,0], [0,0,0], [0,0,0], [0,0,0], [0,0,0], 
                [0,0,0], [0,0,0], [0,0,0], [0,0,0], [0,0,0], [0,0,0], [0,0,0], [0,0,0], [0,0,0], [0,0,0], [0,0,0], [0,0,0], 
                [0,0,0], [0,0,0], [0,0,0], [0,0,0], [0,0,0], [0,0,0], [0,0,0], ],
                "uPrice": 0,
                "price": 0,
                "vat": 0,
                "img": null
            }]
        }],
        invStatus : 'Loading'
    },
    reducers :{
        up:(state, action)=>{
            state.id = state.id + 1;
        },
        changeMonth : (state, action)=>{
            state.selMonth = action.payload;
        }
    },
    extraReducers : (builder) => {
        builder.addCase(asyncInvenFetch.pending, (state, action) => {
            state.invStatus = 'Loading...';
        });
        builder.addCase(asyncInvenFetch.fulfilled, (state, action) => {
            state.invStatus = 'Complelte';
            state.invList = action.payload;
        });
        builder.addCase(asyncInvenFetch.rejected, (state, action) => {
            state.invStatus = "Fail";
        });
        
    }
})

export default inventorySlice;
export {asyncInvenFetch};