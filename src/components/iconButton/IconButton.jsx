
'use client'; 
import style from "./IconButton.module.scss";
import { motion } from "framer-motion";


const IconButton = ({ icon, onClick }) => {
    return (
        <motion.div 
        whileHover={{ scale: 1.1 }} 
        whileTap={{ scale: 0.9 }}    
        animate={{ scale: 1 }}       
        transition={{
        type: "spring",              
        stiffness: 400,
        damping: 10,
      }}>
            <button className={style.iconButton} onClick={onClick}>
                {icon}
            </button>
        </motion.div>
    );
}

export default IconButton;