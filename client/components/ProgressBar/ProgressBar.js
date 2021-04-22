import React, {useEffect} from 'react';
import {motion} from 'framer-motion'
import style from './ProgressBar.module.scss';
import useStorage from '../../firebase/useStorage';

function ProgressBar({file, setFile}) {

    const {url,progress} = useStorage(file);
    console.log(progress,url);
    
    return (
        <motion.div 
            className={style.progressBar}
            initial={{ width: 0 }}
            animate={{ width: progress + '%' }}
        ></motion.div>
    )
}

export default ProgressBar
