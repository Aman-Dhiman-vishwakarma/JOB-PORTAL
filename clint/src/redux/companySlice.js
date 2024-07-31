import { createSlice } from "@reduxjs/toolkit";

const companySlice = createSlice({
    name:"company",
    initialState:{
       singlecompany:null,
       companies:[],
       searchcompanybytext:"",
    },
    reducers:{
        setsinglecompany:(state, action) => {
            state.singlecompany = action.payload
        },
        setcompanies:(state, action) => {
            state.companies = action.payload
        },
        setsearchcompanybytext:(state, action) => {
            state.searchcompanybytext = action.payload
        }
    }
})

export const {setsinglecompany, setcompanies, setsearchcompanybytext} = companySlice.actions;
export default companySlice;