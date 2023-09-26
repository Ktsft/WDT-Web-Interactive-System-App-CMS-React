import React, { useEffect } from 'react';


export const Modal = ({ show, onHide, title, content, width, height }) => {
        
    console.log("this is the height: ", height);
    const modalStyle = {
        // width: width,
        // height: height,
        maxWidth: width,
        maxHeight: height
    }


    const modalBodyStyle = {
        maxHeight: 'calc(100vh - 200px)', // Adjust the value as needed
        overflowY: 'auto',
    };



    return (
        <div className={`modal ${show ? 'd-block' : ''}`} tabIndex="-1" role="dialog" style={{ display: show ? 'block' : 'none' }}>
            <div className="modal-dialog modal-dialog-centered" style={modalStyle}  role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">{title}</h5>
                        <button type="button" className="close" onClick={onHide} aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body" style={modalBodyStyle}>
                        {content}
                    </div>
                    {/* <div className="modal-footer">
                            <Button type="button" classType="btn btn-secondary" onClick={onHide} text="Close" buttonWidth="15%" />
                    </div> */}
                </div>
            </div>
        </div>
    );
};
