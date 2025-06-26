import { useEffect, useState } from "react"

function Time(){
    
    const [time, setTime] = useState(6);
     
    useEffect(()=>{
        if(time>0){
            setTimeout(() => {
        
                setTime(time-1)
        
            }, 1000);
        }
    }, [time])


    return (
        <div>{time}</div>
    )
}

export default Time;