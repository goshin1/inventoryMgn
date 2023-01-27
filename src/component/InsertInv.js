import {useSelector, useDispatch} from 'react-redux';
import inventorySlice from '../inventorySlice';
import uuid from 'react-uuid';
import React from 'react';
import useFetch from '../fetch/useFetch';
//import fs from 'fs';

export default function InsertInv(){
    const fileInput = React.useRef(null);
    return (
      <>
        <input id='title' type="text"/>
        <form id='mainForm' onSubmit={(event)=>{
          event.preventDefault();
          const target = event.target;
          console.log(target.pName);
          console.log(target.uPrice);
          console.log(target.price);
          console.log(target.vat);
          console.log(target.insertImg);
          console.log(target.pDate);
        }}>
            <div id='leftForm'>
              <p>제품명<input type='text' name='pName' placeholder=''/></p>
              <p>단가<input type='text' name='uPrice' placeholder=''/></p>
              <p>금액<input type='text' name='price' placeholder=''/></p>
              <p>부가세<input type='text' name='vat' placeholder=''/></p>
            </div>
            <div id='rightForm'>
              <p>구입일자 <input type="date" name="pDate"></input></p>
              <p>이미지
                <input type="button" value="Upload" />
                <input ref={fileInput} name='insertImg' type="file" onChange={(event)=>{
                    console.log(event.target.files[0]);
                }} />
              </p>
              
              <input type="submit" value="submit"/>
            </div>
        </form>
      </>);
}