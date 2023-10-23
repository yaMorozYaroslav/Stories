'use client'
import React from 'react'
import { useReducer } from "react"
import QueryReducer from "./QueryReducer"

import {SET_CATEGORY, SET_TYPE, SET_SEARCH, RESET,
        SET_MIN_PRICE, SET_MAX_PRICE, ERROR} from "./QueryTypes"

const QueryContext = React.createContext()

export const QueryState = ({ children }) => {
  
  const initialState = {
    category: '',
    type: '',
    search: '',
    price: {min: true, max: false},
    error: null
  };

  const [state, dispatch] = useReducer(QueryReducer, initialState)

  const setCategory = (source) => {
	try{
		dispatch({type: SET_CATEGORY, payload: source})
		if(!source)dispatch({type: SET_TYPE, payload: source})
	 }
	catch(err){	
		dispatch({type: ERROR, payload: err})
	  }
   }
   const setType = (source) => {
	   try{
		   dispatch({type: SET_TYPE, payload: source})
		   }
	   catch(err){	
		dispatch({type: ERROR, payload: err})
	  }
	   }
  
  const setSearch = (source) => {
    try{
		dispatch({type: SET_SEARCH, payload: source})
	 }
    catch(err){
    	dispatch({type: ERROR, payload: err})
    	console.log(err)
    }
  }
  
  const setMinPrice = (source) => {
	  try{
	     dispatch({type: SET_MIN_PRICE, payload: source})
	   }
	    catch(err){
    	dispatch({type: ERROR, payload: err})
    	console.log(err)
	 }
   }
   
  const setMaxPrice = (source) => {
	   try{
	     dispatch({type: SET_MAX_PRICE, payload: source})
	   }
	    catch(err){
    	dispatch({type: ERROR, payload: err})
    	console.log(err)
	 }
   }
  const reset = () => {
	  dispatch({type: RESET, payload: initialState})
	  console.log(state)
	  }

 
  return (

    <QueryContext.Provider
      value={{
        state,
        category: state.category,
        type: state.type,
        search: state.search,
        minPrice: state.price.min,
        maxPrice: state.price.max,
        setType,
        setCategory,
        setSearch,
        setMinPrice,
        setMaxPrice,
        reset
      }}
    >
      {children}
    </QueryContext.Provider>
  );
};
