import React from 'react';


export const Button = ({ type, classType, text, onClick }) => {
    return(
        <button  type={type} className={classType} onClick={onClick} style={{ width: '100%' }} >
            {text}
        </button>
    )
}