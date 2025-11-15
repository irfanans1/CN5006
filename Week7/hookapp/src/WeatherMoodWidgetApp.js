import React, { useState ,useEffect} from "react";
import sunny from './sunny.png'
import rainy from './rainy.png'
import cloudy from './cloudy.png'
function WeatherMoodWidgetApp(props){
console.log("pic is ",props.pic)
const [pic, setPic]=useState(sunny)
const [count,setCount]=useState(0)
useEffect(()=>{
console.log ("function called",props.pic)
if (props.pic==="sunny")
 setPic(sunny)
else if (props.pic==="rainy")
 setPic(rainy)
else if (props.pic==="cloudy")
 setPic(cloudy)
})
const ClickHandle=() =>
 {
 setCount(count+1)
 }
return (
<div className="App">
 <p>{props.pic} <span></span>
 <button onClick={ClickHandle}>{count }
 <img src={pic} alt=""/>
 </button>
 </p>
</div>
)
}
export default WeatherMoodWidgetApp;