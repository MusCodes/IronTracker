import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux"


function WorkoutTemplate(){
    let dispatch= useDispatch();
    let workout= useSelector((store) => store.fetchTemplate);
    console.log("THIS IS TEMPLATE", workout);

    useEffect(() =>{
        dispatch({type:`FETCH_TEMPLATE`});
    },[])
    return (
        <>
        {workout.map((workout,index) =>{
            console.log("this is workout",workout)
            return (   <tr key={index}>
                <h1>TemplateName: {workout.template_name}</h1>
            </tr>)
         
        })}
        </>
    )
}
export default WorkoutTemplate