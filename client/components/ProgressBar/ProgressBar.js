import React from 'react';
import style from './ProgressBar.module.scss';
import useStorage from '../../firebase/useStorage';

function ProgressBar({file, setFile}) {

    const {url,progress} = useStorage(file);
    console.log(progress,url);

    return (
        <div className={style.progressBar}>
            Progress
        </div>
    )
}

export default ProgressBar
