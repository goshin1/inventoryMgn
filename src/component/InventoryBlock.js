import { useSelector } from 'react-redux';
import uuid from 'react-uuid';
import useFetch from '../fetch/useFetch';


export default function InventoryBlock(){


    var selMonth =  useSelector(state=>{
        return state.inventory.selMonth;
    });
    
    var selInven =  useSelector(state=>{
        return state.inventory.invList;
    })

    const selInventory = useFetch(`http://localhost:3001/invList/${selMonth != 12 ? selMonth : 0}/`);
    function deleteBlock(event, idx){
        event.preventDefault();
        const saveItemList = selInventory.itemList;
        const newItemList = saveItemList.slice(0, idx).concat(saveItemList.slice(idx + 1));

        selInventory.itemList = newItemList;

        fetch(`http://localhost:3001/invList/${selMonth}`, {
        method : "PUT",
        headers : {
          "Content-Type" : "application/json"
        },
        body : JSON.stringify(selInventory)
      }).then(res => {
        if(res.ok){
          alert("상품이 삭제 되었습니다.");
          
        }
      })

    }
    var modifyItemList = [];
    window.onkeydown = (event)=>{
        if(event.key === 's' && event.ctrlKey === true){
            event.preventDefault();
            console.log(modifyItemList);
            console.log(selInventory.itemList);
            selInventory.itemList = modifyItemList;
            fetch(`http://localhost:3001/invList/${selMonth}`, {
                method : "PUT",
                headers : {
                "Content-Type" : "application/json"
                },
                body : JSON.stringify(selInventory)
                }).then(res => {
                    if(res.ok){
                    alert("변경사항이 저장 되었습니다.");
                    
                    }
                });
        } 
    }

    if(selInven.length > 0){
        var block = [];
        for(let i = 0; i < selInven[0].itemList.length; i++){
            modifyItemList.push({pid : 0, pName : "", days : [[0,0,0],[0,0,0],[0,0,0],[0,0,0],
            [0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0],
            [0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0],
            [0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0],
            [0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0],
            [0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0],
            [0,0,0],[0,0,0]], uPrice : 0, price : 0, vat : 0, img : "none"});
            var wBlock = [];
            var iBlock = [];
            var rBlock = [];
            var maxProduct = 0;
            modifyItemList[i].pid = selInven[0].itemList[i].pid;
            modifyItemList[i].pName = selInven[0].itemList[i].pName;
            modifyItemList[i].uPrice = selInven[0].itemList[i].uPrice;
            modifyItemList[i].price = selInven[0].itemList[i].price;
            modifyItemList[i].vat = selInven[0].itemList[i].vat;
            modifyItemList[i].img = selInven[0].itemList[i].img;
            for(let j = 0; j < selInven[0].itemList[i].days.length; j++){
                modifyItemList[i].days[j][0] = selInven[0].itemList[i].days[j][0];
                modifyItemList[i].days[j][1] = selInven[0].itemList[i].days[j][1];
                modifyItemList[i].days[j][2] = selInven[0].itemList[i].days[j][2];
                // 현재 재고량을 파악
                if(selInven[0].itemList[i].days[j][2] > 0){
                    maxProduct = selInven[0].itemList[i].days[j][2];
                }
                wBlock.push(<td key={uuid()}><input type="text" onChange={(event)=>{
                    modifyItemList[i].days[j][0] = Number(event.currentTarget.value);
                }} defaultValue={selInven[0].itemList[i].days[j][0]}/></td>);
                iBlock.push(<td key={uuid()}><input type="text" onChange={(event)=>{
                    modifyItemList[i].days[j][1] = Number(event.currentTarget.value);
                }}  defaultValue={selInven[0].itemList[i].days[j][1]}/></td>);
                rBlock.push(<td key={uuid()}><input type="text" onChange={(event)=>{
                    modifyItemList[i].days[j][2] = Number(event.currentTarget.value);
                }}  defaultValue={selInven[0].itemList[i].days[j][2]}/></td>);
            }
            block.push(
                <tr key={uuid()}>
                    <td rowSpan="4" onMouseOver={(event)=>{
                        if(selInven[0].itemList[i].img !== null){
                            event.currentTarget.children[1].style.opacity = "1";
                        }
                    }} onMouseLeave={(event) =>{
                        if(selInven[0].itemList[i].img !== null){
                            event.currentTarget.children[1].style.opacity = "0";
                        }
                    }}>
                        <textarea className='pName' onChange={(event)=>{
                            modifyItemList[i].pName = event.currentTarget.value;
                        }} defaultValue={selInven[0].itemList[i].pName}></textarea>
                        <div className='imgPopup'>
                            {selInven[0].itemList[i].pName}
                            <img src={selInven[0].itemList[i].img}/>
                        </div>
                    </td>
                </tr>
            )
            block.push(
                <tr key={uuid()}>
                    <td className='colorTd'>입고</td>{wBlock}
                    <td rowSpan="3"> 
                        <input className='uPrices' type="text" onChange={(event)=>{
                            modifyItemList[i].uPrice = Number(event.currentTarget.value);
                        }} defaultValue={selInven[0].itemList[i].uPrice}/>
                    </td>
                    <td rowSpan="3">
                        <input className='prices' type="text" onChange={(event)=>{
                            modifyItemList[i].price = Number(event.currentTarget.value);
                        }} defaultValue={selInven[0].itemList[i].price}/>
                    </td>
                    <td rowSpan="3">
                        <input className='vats' type="text" onChange={(event)=>{
                            modifyItemList[i].vat = Number(event.currentTarget.value);
                        }} defaultValue={selInven[0].itemList[i].vat}/>
                    </td>
                    <td rowSpan="3">
                        { maxProduct * selInven[0].itemList[i].price }
                    </td>
                    <td rowSpan="3">
                        <button className='dBtn' onClick={(event)=>deleteBlock(event, selInven[0].itemList[i].pid)}>Delete</button>
                    </td>
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
