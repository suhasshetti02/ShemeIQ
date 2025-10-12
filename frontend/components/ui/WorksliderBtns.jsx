"use client";
import { useSwiper } from "swiper/react";
import {PiCaretLeftBold, PiCaretRightBold} from 'react-icons/pi' 
const WorksliderBtns =({contaierStyles, btnStyles, iconStyles}) =>{
    const swiper =  useSwiper();
  return(
    <div className={contaierStyles}>
        <button className={btnStyles} onClick={()=>swiper.slidePrev()}>
            <PiCaretLeftBold className={iconStyles}/>
        </button>
        <button className={btnStyles} onClick={()=>swiper.slideNext()}>
            <PiCaretRightBold className={iconStyles}/>
        </button>
    </div>
  )
}

export default WorksliderBtns