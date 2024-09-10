'use client'


import React, { ChangeEvent, useEffect, useRef, useState } from 'react';
const Counter = () => {

    const [duration,setDuration]=useState<number|string> ('');
    const [timeleft,setTimeleft]=useState<number>(0);
    const [isActive,setIsActive]=useState<boolean>(false);
    const [pause,setPause]=useState<boolean>(false);
    const refID=useRef<NodeJS.Timeout|null>(null);

    // input value function
    const setInpt=(e:ChangeEvent<HTMLInputElement>):void=>{
           setDuration(Number(e.target.value)) 
    }
    //time left function
    const handleSetTimer= ():void=>{
        if(typeof duration ==="number" && duration > 0){
            setIsActive(true);
            setPause(true);
            setTimeleft(duration);

        }
        if(refID.current){
            clearInterval(refID.current)
        }
    }
     // start
     const handleStart=():void=>{
        if(timeleft>0){
            setIsActive(true);
            setPause(false)
        }
     };
     //pause
    const handlePause=():void=>{
        if(isActive){
            setIsActive(false);
            setPause(true);
        }
        if(refID.current){
            clearInterval(refID.current);
        }
    };
    //reset 

    const handleReset=():void=>{
        setIsActive(false);
        setPause(false);
        setTimeleft(typeof duration=== 'number'?duration:0)
        if(refID.current){
            clearInterval(refID.current)
        }
    };

    //
    useEffect(()=>{
        if(isActive&& !pause){
            refID.current=setInterval(()=>{
                setTimeleft((preTime)=>{
                    if(preTime<=1){
                        clearInterval(refID.current!)
                        return 0;
                    }
                    return preTime-1;

                })
            },1000);//setinternval

        }
    },[ isActive,pause])

    const formatTime = (time: number): string => {
        const minutes = Math.floor(time / 60); // Calculate minutes
        const seconds = time % 60; // Calculate seconds
        // Return the formatted string
        return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(
          2,
          "0"
        )}`;
      };
    

    return (
    <div className='bg-green-300 w-[100%] h-screen flex justify-center items-center'>
        <div className=' border-none rounded-md w-[30%] h-auto mx-autos bg-white justify-center p-[2rem] my-[15rem]'>
            <h1 className='text-center pb-[2px] text-[1.8rem] font-semibold text-gray-700'>Countdown Timer</h1>
            <div className='flex mt-[7px] justify-between items-center'>
                <input type="number" value={duration} onChange={setInpt} placeholder='Enter durastion in seconds' className='px-4 py-2 border border-black rounded-lg' />
                <button onClick={handleSetTimer} className=' mx-[1rem] mx-auto py-2 rounded-lg text-[15px] font-semibold  px-[1.4rem] border text-gray-500 text-opacity-45'>Set</button>    
            </div>
            
            {/* timer section start */}
            <div  className='mb-10 text-6xl text-center mt-10 font-bold '>
                {formatTime(timeleft)}
            </div>
            {/* timer section end */}
            <div className='mt-3 mb-1 flex justify-center items-center text-center'>
            <button onClick={handleStart} className='mx-[1rem] mx-auto py-1 rounded-lg text-[15px] font-semibold  px-[1.2rem] border border-gray-300 text-gray-500 text-opacity-45'>{pause? "resume":"start"}</button>
            <button onClick={handlePause} className='mx-[1rem] mx-auto py-1 rounded-lg text-[15px] font-semibold  px-[1.2rem] border border-gray-300 text-gray-500 text-opacity-45'>Pause</button>
            <button onClick={handleReset}  className='mx-[1rem] mx-auto py-1 rounded-lg text-[15px] font-semibold  px-[1.2rem] border border-gray-300 text-gray-500 text-opacity-45'>Reset</button>
            </div>


        </div>
      
    </div>
  )
}

export default Counter
