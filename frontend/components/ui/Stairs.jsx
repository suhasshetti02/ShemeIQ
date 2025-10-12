import {motion} from "framer-motion";

// variants 
const stairAnimation = {
  initial: {
    top: "0",
  },
    animate: {  
    top: "100%",
    },
    exit: {
        top : ["100%", "0%"],
    },

}

// Calculating the reversed index for staggered delay
const reverseIndex =(index)=>{
     const totalSteps = 6; // Total number of steps
     return totalSteps - index - 1; // Reverse the index
}

const Stairs = () => {
  return (
    <>
    {/* Rederening 6 motion divs eacn representing a step of the stairs */}
    {[...Array(6)].map((_, index) => {
        return (
        <motion.div key={index} variants={stairAnimation} initial = "initial" animate = "animate" exit = "exit" transition={{
            duration :0.4,
            ease:'easeInOut',
            delay : reverseIndex(index) *0.1}} 
            className="h-full w-full bg-white relative "
            />
        )
    })}
    </>
  )
}

export default Stairs