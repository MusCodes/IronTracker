import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useState } from "react";


function Template(){
    const [name,setName]= useState('');
    const dispatch=useDispatch();
    const history= useHistory();
    function onsubmit(){
dispatch ({type: "SUBMIT_TEMPLATE",payload:{name,history}} )
    }
    return (
        <>
        {/* <input type="text" placeholder="Description"></input> */}
        <input value={name} type="text" placeholder="templateName" onChange={(event) =>setName(event.target.value)}></input>
        <button onClick={onsubmit }>Submit</button>
        </>
    )
}

export default Template;