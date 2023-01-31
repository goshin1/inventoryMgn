import { useSelector } from "react-redux"
import useFetch from '../fetch/useFetch';

export default function InventoryStats(){
    const inventory = useFetch('http://localhost:3001/invList');
    console.log(inventory);
    return <div>
        
    </div>
}