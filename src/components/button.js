import React from 'react';


export const Button = ({ type, classType, text, onClick }) => {

    console.log("this is the type: ", type);

    return(
        <button  type={type} className={classType} onClick={onClick} style={{ width: '100%' }} >
            {text}
        </button>
    )
}