import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

async function loadJson(){
    const resp = await fetch("http://localhost:4000/invList");
    const data = await resp.json().parse();
    console.log(data);
    return data.value;
}

const inventorySlice = createSlice({
    name : 'inventory',
    initialState : {
        selMonth : 0,
        status : "welcome",
        test : [],
        invList : loadJson()
    },
    reducers :{
        up:(state, action)=>{
            state.id = state.id + 1;
        },
        changeMonth : (state, action)=>{
            state.selMonth = action.payload;
        }
    }
})

export default inventorySlice;