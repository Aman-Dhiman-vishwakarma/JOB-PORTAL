import { createSlice } from "@reduxjs/toolkit";

const jobSlice = createSlice({
    name:"job",
    initialState:{
        allJobs:[],
        alladminjobs:[],
        singlejob:null,
        searchjobbytext:"",
        allappliyedjobs:[],
        searchedquery:"",
    },
    reducers:{
        setAllJobs:(state, action) => {
            state.allJobs = action.payload
        },
        setsinglejob:(state, action) => {
            state.singlejob = action.payload
        },
        setapplicant:(state, action) => {
            state.singlejob.applications.push(action.payload)
        },
        setalladminJobs:(state, action) => {
            state.alladminjobs = action.payload
        },
        setsearchjobbytext:(state, action) => {
            state.searchjobbytext = action.payload
        },
        setallappliyedjobs:(state, action) => {
            state.allappliyedjobs = action.payload
        },
        setsearchedquery:(state, action) => {
            state.searchedquery = action.payload
        },
    }
})

export const {setAllJobs, setsinglejob, setapplicant, setalladminJobs, setsearchjobbytext, setallappliyedjobs, setsearchedquery} = jobSlice.actions
export default jobSlice;