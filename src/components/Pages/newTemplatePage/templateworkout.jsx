import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux"
import { useHistory } from "react-router-dom";



function WorkoutTemplate(){
    let dispatch= useDispatch();
    let history= useHistory();
    let workout= useSelector((store) => store.fetchTemplate);
    console.log("THIS IS TEMPLATE", workout);
    let id=workout.user_id;
    console.log("this is IDXXXXXX", id)
    function onSubmit(id){
        dispatch({type:"FETCH_TEMPLATE",payload:{history}});
        history.push(`/test/${id}`)

    }

    useEffect(() =>{
        dispatch({type:`FETCH_TEMPLATE`});
    },[])
    return (
        <>
        {workout.map((workout,index) =>{
            console.log("this is workout",workout)
            return (   <tr key={index}>
                <h1>TemplateName: {workout.template_name}</h1>
                <button onClick={() =>onSubmit(workout.id)} >start Workout</button>
            </tr>)
         
        })}
        </>
    )
}
export default WorkoutTemplate