import { useState } from 'react';
import { useSelector, useDispatch } from "react-redux"
import { Chart } from 'react-google-charts';
import { asyncInvenFetch } from '../inventorySlice';

export default function InventoryStats(){
    const inventory = useSelector(state=>state.inventory2.invList[0]);
    const dispatch = useDispatch();
    const monthDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    let now = new Date();
    if((now.getFullYear() % 4 === 0 && now.getFullYear() % 100 !== 0) || now.getFullYear() % 400 === 0){
        monthDays[1] = 29;
    }
    const [billM, setBillM] = useState(0);
    const data = [["상품명"]];
    for(let i = 0; i < monthDays[billM]; i++){
        data.push([i+1+""]);
    }

    for(let i = 0; i < inventory.itemList.length; i++){
        data[0].push(inventory.itemList[i].pName);
        for(let j = 1; j <= monthDays[billM]; j++){
            data[j].push(inventory.itemList[i].days[j - 1][0] * inventory.itemList[i].price);
        }
    }
    
    const options = {
        title : `${billM + 1}월 물품 구입 금액`,
        curveType : "function",
        legend : { position : "bottom" },
    };
    


    console.log(data);
    return <div>
        <Chart 
            chartType='LineChart'
            width="100%"
            height="400px"
            data={data}
            options={options}></Chart>

        <div id='mGrpahContorl'>
            <input type="button" value="1월" onClick={()=>{setBillM(0); dispatch(asyncInvenFetch(`http://localhost:3001/invList?id=0`))}} />
            <input type="button" value="2월" onClick={()=>{setBillM(1); dispatch(asyncInvenFetch(`http://localhost:3001/invList?id=1`))}} />
            <input type="button" value="3월" onClick={()=>{setBillM(2); dispatch(asyncInvenFetch(`http://localhost:3001/invList?id=2`))}} />
            <input type="button" value="4월" onClick={()=>{setBillM(3); dispatch(asyncInvenFetch(`http://localhost:3001/invList?id=3`))}} />
            <input type="button" value="5월" onClick={()=>{setBillM(4); dispatch(asyncInvenFetch(`http://localhost:3001/invList?id=4`))}} />
            <input type="button" value="6월" onClick={()=>{setBillM(5); dispatch(asyncInvenFetch(`http://localhost:3001/invList?id=5`))}} />
            <input type="button" value="7월" onClick={()=>{setBillM(6); dispatch(asyncInvenFetch(`http://localhost:3001/invList?id=6`))}} />
            <input type="button" value="8월" onClick={()=>{setBillM(7); dispatch(asyncInvenFetch(`http://localhost:3001/invList?id=7`))}} />
            <input type="button" value="9월" onClick={()=>{setBillM(8); dispatch(asyncInvenFetch(`http://localhost:3001/invList?id=8`))}} />
            <input type="button" value="10월" onClick={()=>{setBillM(9); dispatch(asyncInvenFetch(`http://localhost:3001/invList?id=9`))}} />
            <input type="button" value="11월" onClick={()=>{setBillM(10); dispatch(asyncInvenFetch(`http://localhost:3001/invList?id=10`))}} />
            <input type="button" value="12월" onClick={()=>{setBillM(11); dispatch(asyncInvenFetch(`http://localhost:3001/invList?id=11`))}} />
        </div>
    </div>
}