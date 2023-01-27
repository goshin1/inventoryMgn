import { createSlice} from "@reduxjs/toolkit";


const inventorySlice = createSlice({
    name : 'inventory',
    initialState : {
        selMonth : 0,
        status : "welcome",
        test : [],
        invList : []
    },
    reducers :{
        up:(state, action)=>{
            state.id = state.id + 1;
        },
        changeMonth : (state, action)=>{
            state.selMonth = action.payload;
        },
        initInvList : (state, action)=>{
            state.invList = action.payload;
        }
    }
})

export default inventorySlice;