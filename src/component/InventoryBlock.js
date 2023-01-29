import {useSelector, useDispatch} from 'react-redux';
import { asyncInvenFetch } from '../inventorySlice';
import inventorySlice from '../inventorySlice';
import uuid from 'react-uuid';
import InsertInv from '../component/InsertInv';




export default function InventoryBlock(){
    var selMonth =  useSelector(state=>{
        return state.inventory.selMonth;
    });
    
    var selInven =  useSelector(state=>{
        return state.inventory.invList;
    });
    if(selInven.length > 0){
        var block = [];

        for(let i = 0; i < selInven[0].itemList.length; i++){
            var wBlock = [];
            var iBlock = [];
            var rBlock = [];
            for(let j = 0; j < selInven[0].itemList[i].days.length; j++){
                wBlock.push(<td key={uuid()}><input type="text" defaultValue={selInven[0].itemList[i].days[j][0]}/></td>);
                iBlock.push(<td key={uuid()}><input type="text" defaultValue={selInven[0].itemList[i].days[j][1]}/></td>);
                rBlock.push(<td key={uuid()}><input type="text" defaultValue={selInven[0].itemList[i].days[j][2]}/></td>);
            }
            block.push(
                <tr key={uuid()}>
                    <td rowSpan="4"><textarea className='pName' defaultValue={selInven[0].itemList[i].pName}></textarea></td>
                </tr>
            )
            block.push(
                <tr key={uuid()}>
                    <td className='colorTd'>입고</td>{wBlock}
                    <td rowSpan="3"><input className='uPrices' type="text" defaultValue={selInven[0].itemList[i].uPrice}/></td><td rowSpan="3"><input className='prices' type="text" defaultValue={selInven[0].itemList[i].price}/></td>
                    <td rowSpan="3"><input className='vats' type="text" defaultValue={selInven[0].itemList[i].vat}/></td><td rowSpan="3">20000</td>
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
            <td colSpan="37">null</td>
        </tr>
    </tbody>);
}
