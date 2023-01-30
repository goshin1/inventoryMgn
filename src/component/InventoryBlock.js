import {useSelector, useDispatch} from 'react-redux';
import { asyncInvenFetch } from '../inventorySlice';
import inventorySlice from '../inventorySlice';
import uuid from 'react-uuid';
import InsertInv from '../component/InsertInv';
import ReactImg from '../imgs/React.png';
import useFetch from '../fetch/useFetch';



export default function InventoryBlock(){
    var selMonth =  useSelector(state=>{
        return state.inventory.selMonth;
    });
    
    var selInven =  useSelector(state=>{
        return state.inventory.invList;
    });


    const selInventory = useFetch(`http://localhost:3001/invList/${selMonth}/`);

    function deleteBlock(event, idx){
        event.preventDefault();
        console.log(idx);
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


    if(selInven.length > 0){
        var block = [];

        for(let i = 0; i < selInven[0].itemList.length; i++){
            var wBlock = [];
            var iBlock = [];
            var rBlock = [];
            var maxProduct = 0;
            for(let j = 0; j < selInven[0].itemList[i].days.length; j++){
                if(selInven[0].itemList[i].days[j][2] > 0){
                    maxProduct = selInven[0].itemList[i].days[j][2];
                }
                wBlock.push(<td key={uuid()}><input type="text" defaultValue={selInven[0].itemList[i].days[j][0]}/></td>);
                iBlock.push(<td key={uuid()}><input type="text" defaultValue={selInven[0].itemList[i].days[j][1]}/></td>);
                rBlock.push(<td key={uuid()}><input type="text" defaultValue={selInven[0].itemList[i].days[j][2]}/></td>);
            }
            block.push(
                <tr key={uuid()}>
                    <td rowSpan="4" onMouseOver={(event)=>{
                        if(selInven[0].itemList[i].img !== null){
                            event.currentTarget.children[1].src = selInven[0].itemList[i].img;
                            event.currentTarget.children[1].style.opacity = "1";
                        }
                    }} onMouseLeave={(event) =>{
                        if(selInven[0].itemList[i].img !== null){
                            event.currentTarget.children[1].src = selInven[0].itemList[i].img;
                            event.currentTarget.children[1].style.opacity = "0";
                        }
                    }}><textarea className='pName' defaultValue={selInven[0].itemList[i].pName}></textarea>
                        <div className='imgPopup'>
                            {selInven[0].itemList[i].pName}
                            <img src={ReactImg}/>
                        </div>
                    </td>
                </tr>
            )
            block.push(
                <tr key={uuid()}>
                    <td className='colorTd'>입고</td>{wBlock}
                    <td rowSpan="3"><input className='uPrices' type="text" defaultValue={selInven[0].itemList[i].uPrice}/></td><td rowSpan="3"><input className='prices' type="text" defaultValue={selInven[0].itemList[i].price}/></td>
                    <td rowSpan="3"><input className='vats' type="text" defaultValue={selInven[0].itemList[i].vat}/></td><td rowSpan="3">{ maxProduct * selInven[0].itemList[i].price }</td>
                    <td rowSpan="3"><button className='dBtn' onClick={(event)=>deleteBlock(event, selInven[0].itemList[i].pid)}>Delete</button></td>
                </tr>
            )
            block.push(
                <tr key={uuid()}>
                    <td className='colorTd'>출고</td>{iBlock}
                </tr>
            )
            block.push(
                <tr key={uuid()}>
                    <td className='colorTd'>재고</td>{rBlock}
                </tr>
            )
        }
        return <tbody>
                {block}
        </tbody>
    }
    return (
    <tbody>
        <tr>
            <td colSpan="38">월을 선택해서 재고를 불러와주세요.</td>
        </tr>
    </tbody>);
}
