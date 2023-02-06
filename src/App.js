import './App.css';
import {useSelector, useDispatch} from 'react-redux';
import inventorySlice from './inventorySlice';
import uuid from 'react-uuid';
import InsertInv from './component/InsertInv';
import InventoryBlock from './component/InventoryBlock';
import InventoryStats from './component/InventoryStats';
import { asyncInvenFetch } from './inventorySlice';
import { useEffect, useState } from 'react';

// https://www.react-google-charts.com/examples/line-chart 
// react google chart 사용법
function App() { 
  const dispatch = useDispatch();

  var selMonth = useSelector(state=>{
    return state.inventory.selMonth;
  })

  var [mainContent, setMainContent] = useState(null);
  var dayBlock = [];

  for(var i = 0; i < 31; i++){
    dayBlock.push(<th key={uuid()}>{i + 1}</th>)
  }

  useEffect(()=>{
    if(selMonth !== 12){
      setMainContent(
        <table border="1px">
              <thead>
                <tr>
                  <th>제품명</th>
                  <th>재고</th>
                  {dayBlock}
                  <th>단가</th>
                  <th>금액</th>
                  <th>부가세</th>
                  <th>총괄금액</th>
                  <th>삭제</th>
                </tr>
              </thead>
              <InventoryBlock></InventoryBlock>
            </table>
      );
    } else {
      setMainContent(
        <div>
          <InventoryStats></InventoryStats>
        </div>
      )
    }
  }, [selMonth]);
  
  return (
    <div className="App">
        <InsertInv></InsertInv>

        <form id='tableForm'>
          <nav id='tableTap'>
            <div style={selMonth === 0 ? {backgroundColor : '#B1B2FF'} : {backgroundColor : '#EEF1FF'}} onClick={()=>{dispatch(inventorySlice.actions.changeMonth(0)); dispatch(asyncInvenFetch(`http://localhost:3001/invList?id=0`))}}>1월</div>
            <div style={selMonth === 1 ? {backgroundColor : '#B1B2FF'} : {backgroundColor : '#EEF1FF'}} onClick={()=>{dispatch(inventorySlice.actions.changeMonth(1)); dispatch(asyncInvenFetch(`http://localhost:3001/invList?id=1`))}}>2월</div>
            <div style={selMonth === 2 ? {backgroundColor : '#B1B2FF'} : {backgroundColor : '#EEF1FF'}} onClick={()=>{dispatch(inventorySlice.actions.changeMonth(2)); dispatch(asyncInvenFetch(`http://localhost:3001/invList?id=2`))}}>3월</div>
            <div style={selMonth === 3 ? {backgroundColor : '#B1B2FF'} : {backgroundColor : '#EEF1FF'}} onClick={()=>{dispatch(inventorySlice.actions.changeMonth(3)); dispatch(asyncInvenFetch(`http://localhost:3001/invList?id=3`))}}>4월</div>
            <div style={selMonth === 4 ? {backgroundColor : '#B1B2FF'} : {backgroundColor : '#EEF1FF'}} onClick={()=>{dispatch(inventorySlice.actions.changeMonth(4)); dispatch(asyncInvenFetch(`http://localhost:3001/invList?id=4`))}}>5월</div>
            <div style={selMonth === 5 ? {backgroundColor : '#B1B2FF'} : {backgroundColor : '#EEF1FF'}} onClick={()=>{dispatch(inventorySlice.actions.changeMonth(5)); dispatch(asyncInvenFetch(`http://localhost:3001/invList?id=5`))}}>6월</div>
            <div style={selMonth === 6 ? {backgroundColor : '#B1B2FF'} : {backgroundColor : '#EEF1FF'}} onClick={()=>{dispatch(inventorySlice.actions.changeMonth(6)); dispatch(asyncInvenFetch(`http://localhost:3001/invList?id=6`))}}>7월</div>
            <div style={selMonth === 7 ? {backgroundColor : '#B1B2FF'} : {backgroundColor : '#EEF1FF'}} onClick={()=>{dispatch(inventorySlice.actions.changeMonth(7)); dispatch(asyncInvenFetch(`http://localhost:3001/invList?id=7`))}}>8월</div>
            <div style={selMonth === 8 ? {backgroundColor : '#B1B2FF'} : {backgroundColor : '#EEF1FF'}} onClick={()=>{dispatch(inventorySlice.actions.changeMonth(8)); dispatch(asyncInvenFetch(`http://localhost:3001/invList?id=8`))}}>9월</div>
            <div style={selMonth === 9 ? {backgroundColor : '#B1B2FF'} : {backgroundColor : '#EEF1FF'}} onClick={()=>{dispatch(inventorySlice.actions.changeMonth(9)); dispatch(asyncInvenFetch(`http://localhost:3001/invList?id=9`))}}>10월</div>
            <div style={selMonth === 10 ? {backgroundColor : '#B1B2FF'} : {backgroundColor : '#EEF1FF'}} onClick={()=>{dispatch(inventorySlice.actions.changeMonth(10)); dispatch(asyncInvenFetch(`http://localhost:3001/invList?id=10`))}}>11월</div>
            <div style={selMonth === 11 ? {backgroundColor : '#B1B2FF'} : {backgroundColor : '#EEF1FF'}} onClick={()=>{dispatch(inventorySlice.actions.changeMonth(11)); dispatch(asyncInvenFetch(`http://localhost:3001/invList?id=11`))}}>12월</div>
            <div style={selMonth === 12 ? {backgroundColor : '#B1B2FF'} : {backgroundColor : '#EEF1FF'}} onClick={()=>{dispatch(inventorySlice.actions.changeMonth(12)); dispatch(asyncInvenFetch(`http://localhost:3001/invList?id=0`))}}>통계</div>
          </nav>
          {mainContent}
          
        </form>
    </div>
  );
}

export default App;