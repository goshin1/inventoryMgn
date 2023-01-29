import {useSelector, useDispatch} from 'react-redux';
import asyncInvenFetch from '../inventorySlice';
import uuid from 'react-uuid';
import React from 'react';
import { useRef, useState } from "react";
import useFetch from '../fetch/useFetch';
//import fs from 'fs';


export default function InsertInv(){
    const selMonth = useSelector(state=>(state.inventory.selMonth));
    const selInventory = useFetch(`http://localhost:3001/invList/${selMonth}`);
    const dispatch = useDispatch();
    console.log(selInventory.itemList);
    function toDataURL(){

    }

    function onItem(event){
      event.preventDefault();
      let obj = {
        pid : selInventory.nextPid,
        pName : pNameRef.current.value,
        days : [[0,0,0],[0,0,0],[0,0,0],[0,0,0],
        [0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0],
        [0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0],
        [0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0],
        [0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0],
        [0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0],
        [0,0,0],[0,0,0]],
        uPrice : Number(uPriceRef.current.value),
        price : Number(priceRef.current.value),
        vat : Number(vatRef.current.value),
        img : insertImgRef.current.value
      };
      console.log(obj);
      if(obj.pName === ""){
        alert("제품명을 입력해주세요");
        return
      }
      //  주소가 http://localhost:3001/invList/${selMonth} 물음표가 아닌 /로 하면 해당 객체만 오게 된다.
      // 물음표는 해당조건의 객체"들을" 보내기 때문에 배열 /는 해당하는 객체를 리턴
      // 만들어야 할 것은 이미지를 base64로 변경하여 json-server로 전달하고 다시 읽어오는 부분 
      // xml, ajax 등 관련 개념도 공부
      console.log(obj);
      
    }

    const pNameRef = useRef(null);
    const uPriceRef = useRef(null)
    const priceRef = useRef(null);
    const vatRef = useRef(null);
    const pDateRef = useRef(null);
    const insertImgRef = useRef(null);

    return (
      <>
        <p id='title'>재고관리</p>
        <form id='mainForm' onSubmit={onItem}>
            <div id='leftForm'>
              <p>제품명<input type='text' name='pName' ref={pNameRef}/></p>
              <p>단가<input type='text' name='uPrice' ref={uPriceRef}/></p>
              <p>금액<input type='text' name='price' ref={priceRef}/></p>
              <p>부가세<input type='text' name='vat' ref={vatRef}/></p>
            </div>
            <div id='rightForm'>
              <p>구입일자 <input type="date" name="pDate" ref={pDateRef}/></p>
              <p id='btnP'><label id='btn'>
                  Image Upload
                  <input name='insertImg' type="file" ref={insertImgRef}/>
                </label>
              </p>
              
              <input type="submit" value="submit"/>
            </div>
        </form>
      </>);
}