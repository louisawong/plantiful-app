import style from './UploadForm.module.scss'
import React, {useState} from 'react'

function UploadForm() {
    
    const [file, setFile] = useState(null);
    const [error, setError] = useState(null);

    const types = ['image/png', 'image/jpeg'];

    const handleChange = (e) => {
        let selected = e.target.files[0];
        if (selected && types.includes(selected.type)) {
          setFile(selected);
          setError(null);
        } else {
            setFile(null);
            setError('Please select an image file(png or jpg)');
        }
    }

    return (
        <div>
            <form className={style.form}>
                <label className={style.label}>
                 <input className={style.input} type="file" onChange={handleChange}/>
                 <span className={style.span}>+</span>                
                </label>
                <div className={style.output}>
                    { error && <div className={style.error}>{ error }</div>}
                    { file && <div>{ file.name}</div> }
                 </div>
            </form>
        </div>
    )
}

export default UploadForm
