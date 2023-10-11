import React, { useState } from 'react';
import '../styles/app.css';
import DatePicker from 'react-datepicker';
import { Button } from '../components/index';


export const ActiveRoom = (props) => {

    const [isActiveChecked, setIsActiveChecked] = useState(false);



    return(
        <div className="container">
            <table className="user-table">
                <tbody>
                    <tr>
                        <th className="user-table-label-cell" style={{ padding: '10px' }}>Option</th>
                        <td style={{ padding: '29px' }}>
                            <div className="form-check form-switch custom-switch-input">
                                <input
                                    type="checkbox"
                                    className="form-check-input"
                                    role="switch"
                                    onChange={() => setIsActiveChecked(!isActiveChecked)}
                                />
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <th className="user-table-label-cell" style={{ padding: '10px' }}>Start Date: </th>
                        <td style={{ padding: '10px' }}>
                            <DatePicker
                                     // Set the width to 100%
                                    selected={isActiveChecked ? new Date() : null} // Conditionally set to new Date()
                                    className="form-control custom-datepicker-width-create-room" // Apply the custom-datepicker class here
                                    // selected={isActiveChecked ? new Date() : startDate} // Conditionally set to new Date()
                                    // onChange={(date) => setStartDate(date)}
                                    showTimeSelect
                                    timeFormat="HH:mm"
                                    disabled={!isActiveChecked}
                                    timeIntervals={15}
                                    timeCaption="Time"
                                    dateFormat="MMMM d, yyyy h:mm aa"
                                />
                        </td>
                    </tr>
                    <tr>
                        <th className="user-table-label-cell" style={{ padding: '10px' }}>End Date: </th>
                        <td style={{ padding: '10px' }}>
                            <DatePicker
                                     // Set the width to 100%
                                    selected={isActiveChecked ? new Date() : null} // Conditionally set to new Date()
                                    className="form-control custom-datepicker-width-create-room" // Apply the custom-datepicker class here
                                    // selected={isActiveChecked ? new Date() : startDate} // Conditionally set to new Date()
                                    // onChange={(date) => setStartDate(date)}
                                    disabled={!isActiveChecked}
                                    showTimeSelect
                                    timeFormat="HH:mm"
                                    timeIntervals={15}
                                    timeCaption="Time"
                                    dateFormat="MMMM d, yyyy h:mm aa"
                                />
                        </td>
                    </tr>
                </tbody>
            </table>
            <br />
            <br /><br />
            <br />
            <br /><br />
            <br /><br />
            <br />
            <hr />
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '10px' }}>
                <Button type="button" classType="btn btn-danger"  text="Discard" buttonWidth="20%" onClick={props.onCloseModals} />
                <Button type="button" classType="btn btn-primary"  text="Save" buttonWidth="20%"  />
            </div>
        </div>
    )
};