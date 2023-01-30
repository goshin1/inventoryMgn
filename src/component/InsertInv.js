import {useSelector, useDispatch} from 'react-redux';
import asyncInvenFetch from '../inventorySlice';
import uuid from 'react-uuid';
import React from 'react';
import { useRef, useState } from "react";
import useFetch from '../fetch/useFetch';
//import fs from 'fs';


export default function InsertInv(){
    const [base, setBase] = useState(null);
    const selMonth = useSelector(state=>(state.inventory.selMonth));
    const selInventory = useFetch(`http://localhost:3001/invList/${selMonth}/`);
    
    const dispatch = useDispatch();
    //console.log(selInventory);

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
        img : base
      };
      if(obj.pName === "" || obj.uPrice === "" || obj.price === "" || obj.vat === ""){
        alert("제품명을 입력해주세요");
        return
      }
      
      selInventory.itemList.push(obj)
      selInventory.nextPid += 1

      
      fetch(`http://localhost:3001/invList/${selMonth}`, {
        method : "PUT",
        headers : {
          "Content-Type" : "application/json"
        },
        body : JSON.stringify(selInventory)
      }).then(res => {
        if(res.ok){
          alert("상품이 추가 되었습니다.")
        }
      })
        
      
    }

    const pNameRef = useRef(null);
    const uPriceRef = useRef(null)
    const priceRef = useRef(null);
    const vatRef = useRef(null);

    return (
      <>
        <p id='title'>{ selMonth + 1}월 재고관리</p>
        <form id='mainForm' onSubmit={onItem}>
            <div id='leftForm'>
              <p id='formTitle'>{ selMonth + 1 }월 물품 추가</p>
              <p>제품명<input type='text' name='pName' ref={pNameRef}/></p>
              <p>단가<input type='text' name='uPrice' ref={uPriceRef}/></p>
              <p>금액<input type='text' name='price' ref={priceRef}/></p>
              <p>부가세<input type='text' name='vat' ref={vatRef}/></p>
            </div>
            <div id='rightForm'>
              <p id='btnP'><label id='btn'>
                  Image Upload
                  <input name='insertImg' type="file" onChange={(event) => {
                    let file = event.target.files[0];
                    const reader = new FileReader();
                    reader.readAsDataURL(file);
                    reader.onload = () => {
                      setBase(reader.result);
                    }
                    event.target.files = [];
                  }}/>
                </label>
              </p>
              
              <input type="submit" value="submit"/>
            </div>
        </form>
      </>);
}