import ReactImg from './imgs/React.png';
import './App.css';
import InsertInv from './component/InsertInv';
import {useSelector, useDispatch} from 'react-redux';
import inventorySlice from './inventorySlice';
import uuid from 'react-uuid';
import React from 'react';
import useFetch from './fetch/useFetch';
//import fs from 'fs';

function InsertTitle(){
  return 
}
/*
 json-server을 공부해서 이를 연동해 파일을 업로드
*/
// http://http://localhost:3001/invList json 서버 주소


function InventoryTable(){
  const dispatch = useDispatch();

  var selMonth = useSelector(state=>{
    return state.inventory.selMonth;
  })

  var selInvtory = useFetch("http://localhost:3001/invList?id="+selMonth);
  if(selInvtory != undefined && selInvtory != [] && selInvtory != null){
    console.log(selInvtory[0]);
  } else {
    return <div>Loading...</div>
  }
  // var dayBlock = [];
  // for(var i = 0; i < selInvtory[selMonth].itemList[0].days.length; i++){
  //   dayBlock.push(<th key={uuid()}>{i + 1}</th>)
  // }
  // const inventory = useSelector(state=>{
  //   return state.inventory.invList;
  // })

  return <table border="1px">
  <thead>
    <tr>
      <th>제품명</th>
      <th>재고</th>
      
      <th>단가</th>
      <th>금액</th>
      <th>부가세</th>
      <th>총괄금액</th>
    </tr>
  </thead>
  <InventoryBlock></InventoryBlock>
</table>
}

function InventoryBlock(){  
  var selMonth = useSelector(state=>{
    return state.inventory.selMonth;
  });


  // var selInvtory = useSelector(state=>{
  //   return state.inventory.invList;
  // });
  // var selInvtory = useFetch("http://localhost:3001/invList?id="+selMonth);
  // console.log(selInvtory);
  // var inventoryBlocks = [];
  // for(var i = 0; i < selInvtory[selMonth].itemList.length; i++){
  //   var wBlock = [];
  //   var iBlock = [];
  //   var rBlock = [];
  //   var block = [];

  //   var selMonthItems = selInvtory[selMonth].itemList[i];
  //   for(var j = 0; j < selMonthItems.days.length; j++){
  //     wBlock.push(<td key={uuid()}><input type="text" defaultValue={selMonthItems.days[j][0]}/></td>);
  //     iBlock.push(<td key={uuid()}><input type="text" defaultValue={selMonthItems.days[j][1]}/></td>);
  //     rBlock.push(<td key={uuid()}><input type="text" defaultValue={selMonthItems.days[j][2]}/></td>);
  //   }

  //   inventoryBlocks.push(
  //     <>
  //       <tr key={uuid()}>
  //         <td rowSpan="4"><textarea className='pName' defaultValue={selMonthItems.pName}></textarea></td>
  //       </tr>
  //       <tr key={uuid()}>
  //         <td className='colorTd'>입고</td>{wBlock}
  //         <td rowSpan="3"><input className='uPrices' type="text" defaultValue={selMonthItems.uPrice}/></td><td rowSpan="3"><input className='prices' type="text" defaultValue={selMonthItems.price}/></td>
  //         <td rowSpan="3"><input className='vats' type="text" defaultValue={selMonthItems.vat}/></td><td rowSpan="3">20000</td>
  //       </tr>
  //       <tr key={uuid()}>
  //         <td className='colorTd'>출고</td>{iBlock}
  //       </tr>
  //       <tr key={uuid()}>
  //         <td className='colorTd'>재고</td>{rBlock}
  //       </tr>
  //     </>
  //   );
  // }

  // return (
  //   <tbody>
  //     {inventoryBlocks}
  //   </tbody>);
}

function App() { 
  const dispatch = useDispatch();
  var selMonth = useSelector(state=>{
    return state.inventory.selMonth;
  })

  /* ctrl + s를 누를 경우 현재 상황이 저장되게 할 것
  window.onkeydown = (event)=>{
    event.preventDefault();
    if(event.key === 's' && event.ctrlKey === true){
      alert('SAVE');
    } c
  }
  */

  return (
    <div className="App">
        <InsertTitle></InsertTitle>
        <InsertInv></InsertInv>

        <form id='tableForm'>
          <nav id='tableTap'>
            <div style={selMonth === 0 ? {backgroundColor : '#B1B2FF'} : {backgroundColor : '#EEF1FF'}} onClick={()=>{dispatch(inventorySlice.actions.changeMonth(0));}}>1월</div>
            <div style={selMonth === 1 ? {backgroundColor : '#B1B2FF'} : {backgroundColor : '#EEF1FF'}} onClick={()=>{dispatch(inventorySlice.actions.changeMonth(1));}}>2월</div>
            <div style={selMonth === 2 ? {backgroundColor : '#B1B2FF'} : {backgroundColor : '#EEF1FF'}} onClick={()=>{dispatch(inventorySlice.actions.changeMonth(2));}}>3월</div>
            <div style={selMonth === 3 ? {backgroundColor : '#B1B2FF'} : {backgroundColor : '#EEF1FF'}} onClick={()=>{dispatch(inventorySlice.actions.changeMonth(3));}}>4월</div>
            <div style={selMonth === 4 ? {backgroundColor : '#B1B2FF'} : {backgroundColor : '#EEF1FF'}} onClick={()=>{dispatch(inventorySlice.actions.changeMonth(4));}}>5월</div>
            <div style={selMonth === 5 ? {backgroundColor : '#B1B2FF'} : {backgroundColor : '#EEF1FF'}} onClick={()=>{dispatch(inventorySlice.actions.changeMonth(5));}}>6월</div>
            <div style={selMonth === 6 ? {backgroundColor : '#B1B2FF'} : {backgroundColor : '#EEF1FF'}} onClick={()=>{dispatch(inventorySlice.actions.changeMonth(6));}}>7월</div>
            <div style={selMonth === 7 ? {backgroundColor : '#B1B2FF'} : {backgroundColor : '#EEF1FF'}} onClick={()=>{dispatch(inventorySlice.actions.changeMonth(7));}}>8월</div>
            <div style={selMonth === 8 ? {backgroundColor : '#B1B2FF'} : {backgroundColor : '#EEF1FF'}} onClick={()=>{dispatch(inventorySlice.actions.changeMonth(8));}}>9월</div>
            <div style={selMonth === 9 ? {backgroundColor : '#B1B2FF'} : {backgroundColor : '#EEF1FF'}} onClick={()=>{dispatch(inventorySlice.actions.changeMonth(9));}}>10월</div>
            <div style={selMonth === 10 ? {backgroundColor : '#B1B2FF'} : {backgroundColor : '#EEF1FF'}} onClick={()=>{dispatch(inventorySlice.actions.changeMonth(10));}}>11월</div>
            <div style={selMonth === 11 ? {backgroundColor : '#B1B2FF'} : {backgroundColor : '#EEF1FF'}} onClick={()=>{dispatch(inventorySlice.actions.changeMonth(11));}}>12월</div>
            <div>통계</div>
          </nav>
          <InventoryTable></InventoryTable>
        </form>
    </div>
  );
}

export default App;
