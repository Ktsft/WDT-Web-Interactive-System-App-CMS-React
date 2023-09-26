import React, { useState, useEffect } from 'react';
import { Button } from '../components/index';
import { DatePicker } from 'rsuite';
import Axios from 'axios';

import '../styles/app.css';

export const RoomSetting = ({ id = 'default-id', onClose }) => {

    const token = localStorage.getItem('token');
    const [gameMode, setGameMode] = useState("");
    const [themeIndex, setThemeIndex] = useState("");
    const [layoutDirection, setLayoutDirection] = useState("");

    const [backgroundImg, setBackgroundImg] = useState("");
    const [appLogoImg, setAppLogoImg] = useState("");
    const [coverPhotoImg, setCoverPhotoImg] = useState("");
    const [welcomeTextColor, setWelcomeTextColor] = useState("");
    const [nameIconColor, setNameIconColor] = useState("");
    const [dropdownHighlightColor, setDropdownHighlightColor] = useState("");
    const [greetingScrollBackgroundColor, setGreetingScrollBackgroundColor] = useState("");
    const [submitButtonImg, setSubmitButtonImg] = useState("");

    useEffect(() => {
        // console.log("this is the id from modal: ", id);
        if(id !== 'default-id'){
            Axios.get("https://web-intractive-system-app-api.onrender.com/room/get/"+id, {
                headers: { Authorization: `Bearer ${token}` }
              })
              .then(response => {
                    onHandleRoomSetting();
                    // console.log("i get the value: ", response.data['game_mode']);
                    setGameMode(response.data['game_mode']);
                    setThemeIndex(response.data['theme_index']);
                    setLayoutDirection(response.data['layout_direction']);
            })
            .catch(error => {
                console.log("Get Room Id Exception From Modal");
            });  
        }
    }, [id]);


    const onHandleRoomSetting = () => {
        Axios.get("https://web-intractive-system-app-api.onrender.com/roomSetting/get/"+id, {
            headers: { Authorization: `Bearer ${token}` }
        })
        .then(response => {
            // console.log("this is the background image: ", response.data['background_img']);
            setBackgroundImg(response.data['background_img']);
            setAppLogoImg(response.data["app_logo_img"]);
            setCoverPhotoImg(response.data["cover_photo_img"]);
            setWelcomeTextColor(response.data["welcome_text_color"]);
            setNameIconColor(response.data["name_icon_color"]);
            setDropdownHighlightColor(response.data["dropdown_highlight_color"]);
            setGreetingScrollBackgroundColor(response.data["greeting_scroll_background_color"]);
            setSubmitButtonImg(response.data["submit_button"]);
        })
        .catch(error => {
            console.log("Get Room Setting Exception From Room Setting: ", error);
        });
    };


    const handleGameModeChange = (newGameMode) => {
        // console.log("this is the new game mode result: ", newGameMode);
        setGameMode(newGameMode);
        // onUpdateGameMode(newGameMode);
    };


    const handleThemeIndexChange = (themeIndexValue) => {
        // console.log("this is the value of theme index: ", themeIndexValue);
        setThemeIndex(themeIndexValue);
    };


    const handleLayoutChange = (layoutValue) => {
        // console.log("this is the value of theme index: ", layoutValue);
        setLayoutDirection(layoutValue);
    };


    const handleImageUpload = (e, field) => {
        // console.log("what is the e.target.file: ", e.target.files[0])
        const file = e.target.files[0];
        const reader = new FileReader();

        reader.onloadend = () => {
            switch(field){
                case 'background_img':
                    console.log("i access background");
                    setBackgroundImg(reader.result);
                    break;
                case 'app_logo_img':
                    console.log("i access app logo");
                    setAppLogoImg(reader.result);
                    break;
                case 'cover_photo_img':
                    console.log("i access cover photo");
                    setCoverPhotoImg(reader.result);
                    break;
                // Add cases for other image fields
                default:
                    break;
            }
        };

        if (file) {
            reader.readAsDataURL(file);
        }
    };


    const handleRemoveImg = (field) => {
        switch (field) {
            case 'background_img':
                setBackgroundImg("");
                break;
            case 'app_logo_img':
                setAppLogoImg("");
                break;
            case 'cover_photo_img':
                setCoverPhotoImg("");
                break;
            // Add cases for other image fields
            default:
                break;
        }
    };


    const handleWelcomeTextColorChange = (e) => {
        setWelcomeTextColor(e.target.value);
    };

    
    const handleNameIconColorChange = (e) => {
        setNameIconColor(e.target.value);
    };

    const handleDropdownHighlightColorChange = (e) => {
        setDropdownHighlightColor(e.target.value);
    };

    const handleGreetingScrollBackgroundColorChange = (e) => {
        setGreetingScrollBackgroundColor(e.target.value);
    };


    const handleRemoveSubmitButtonImg = () => {
        // Implement logic to remove the submit button image here
        // You can clear the value in state or perform any other action
        setSubmitButtonImg('');
    };

    return (
        <div className="container">
            <table className="user-table" >
                <tbody>
                    <tr>
                        <th className="user-table-label-cell" style={{ padding: '10px' }}>Start DateTime: </th>
                        <td style={{ padding: '10px' }}><DatePicker format="yyyy-MM-dd HH:mm" className="custom-datepicker"   /></td>
                    </tr>
                    <tr>
                        <th className="user-table-label-cell" style={{ padding: '10px' }}>End DateTime: </th>
                        <td style={{ padding: '10px' }}><DatePicker format="yyyy-MM-dd HH:mm" className="custom-datepicker"  /></td>
                    </tr>
                    <tr>
                        <th className="user-table-label-cell" style={{ padding: '10px' }}>Room Name: </th>
                        <td style={{ padding: '10px' }}> <input type="text" name="name"  className="form-control" /></td>
                    </tr>
                    <tr>
                        <th className="user-table-label-cell" style={{ padding: '10px' }}>Room Description: </th>
                        <td style={{ padding: '10px' }}> <input type="text" name="desc"  className="form-control" /></td>
                    </tr>
                    <tr>
                        <th className="user-table-label-cell" style={{ padding: '10px' }}>Restricted Word: </th>
                        <td style={{ padding: '10px' }}> <textarea className="form-control" id="restricWordArea" rows="4"  readOnly></textarea></td>
                    </tr>
                    <tr>
                        <th className="user-table-label-cell" style={{ padding: '10px' }}>Default Greeting: </th>
                        <td style={{ padding: '10px' }}> <textarea className="form-control" id="defaultGreetArea" rows="4"  readOnly></textarea></td>
                    </tr>
                    <tr>
                        <th className="user-table-label-cell" style={{ padding: '10px' }}>Default Greeting: </th>
                        <td style={{ padding: '10px' }}> <textarea className="form-control" id="defaultGreetArea" rows="4"  readOnly></textarea></td>
                    </tr>
                    <tr></tr>
                    <tr>
                        <th className="user-table-label-cell" colSpan="2"><h2>Big Screen Setting</h2></th>
                    </tr>
                    <tr style={{ padding: '30px' }}>
                        <td>Mode :</td>
                        <td style={{ padding: '10px' }}>
                            <input type="hidden" id="gameModeSelect" value={gameMode} />
                            <div className="btn-group btn-group-toggle" data-toggle="buttons">
                                <label className={`btn btn-outline-primary btn-lg square-button ${gameMode === '1' ? 'active' : ''}`} style={{ marginLeft: '10px' , width: '133px' }}>
                                    <input
                                        type="radio"
                                        onChange={() => handleGameModeChange('1')}
                                        checked={gameMode === '1'}
                                    />
                                    <span className="mode-label">Mode 1</span>
                                </label>
                                <label className={`btn btn-outline-primary btn-lg square-button ${gameMode === '2' ? 'active' : ''}`} style={{ marginLeft: '10px' , width: '133px' }}>
                                    <input
                                        type="radio"
                                        onChange={() => handleGameModeChange('2')}
                                        checked={gameMode === '2'}
                                    />
                                    <span className="mode-label">Mode 2</span>
                                </label>
                                <label className={`btn btn-outline-primary btn-lg square-button ${gameMode === '3' ? 'active' : ''}`} style={{ marginLeft: '10px' , width: '150px' }}>
                                    <input
                                        type="radio"
                                        onChange={() => handleGameModeChange('3')}
                                        checked={gameMode === '3'}
                                    />
                                    <span className="mode-label">Mode 3</span>
                                </label>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td>Theme :</td>
                        <td style={{ padding: '10px', paddingLeft: '20px' }}>
                            <input type="hidden" id="themeSelect" value={themeIndex} />
                            <div className="btn-group btn-group-toggle" data-toggle="buttons">
                                <label className={`btn btn-outline-primary btn-lg square-button ${themeIndex === '1' ? 'active' : ''}`}  style={{ marginRight: '10px', width: '133px'   }}
                                onClick={() => handleThemeIndexChange('1')}
                                >
                                    <input
                                        type="radio"
                                        onChange={() => handleThemeIndexChange('1')}
                                        checked={themeIndex === '1'}
                                    />
                                    <span className="mode-label">Theme 1</span>
                                </label>
                                <label className={`btn btn-outline-primary btn-lg square-button ${themeIndex === '2' ? 'active' : ''}`} style={{ marginRight: '10px', width: '133px' }}>
                                    <input
                                        type="radio"
                                        onChange={() => handleThemeIndexChange('2')}
                                        checked={themeIndex === '2'}
                                    />
                                    <span className="mode-label">Theme 2</span>
                                </label>
                                <label className={`btn btn-outline-primary btn-lg square-button ${themeIndex === '3' ? 'active' : ''}`} style={{ marginRight: '10px', width: '150px'  }} >
                                    <input
                                        type="radio"
                                        onChange={() => handleThemeIndexChange('3')}
                                        checked={themeIndex === '3'}
                                    />
                                    <span className="mode-label">Theme 3</span>
                                </label>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td>Layout :</td>
                        <td style={{ padding: '10px', paddingLeft: '20px' }}>
                            <input type="hidden" id="themeSelect" value={layoutDirection} />
                            <div className="btn-group btn-group-toggle" data-toggle="buttons">
                            <label className={`btn btn-outline-primary btn-lg square-button ${layoutDirection === '1' ? 'active' : ''}`} style={{ marginRight: '10px' }}>
                                <input
                                    type="radio"
                                    checked={layoutDirection === '1'}
                                    onChange={() => handleLayoutChange('1')}
                                />
                                <span className="mode-label">Layout 1</span>
                                </label>
                                <label className={`btn btn-outline-primary btn-lg square-button ${layoutDirection === '2' ? 'active' : ''}`} style={{ marginRight: '10px'  }}>
                                <input
                                    type="radio"
                                    checked={layoutDirection === '2'}
                                    onChange={() => handleLayoutChange('2')}
                                />
                                <span className="mode-label">Layout 2</span>
                                </label>
                                <label className={`btn btn-outline-primary btn-lg square-button ${layoutDirection === '3' ? 'active' : ''}`}  style={{ marginRight: '10px', width: '150px'}}>
                                <input
                                    type="radio"
                                    checked={layoutDirection === '3'}
                                    onChange={() => handleLayoutChange('3')}
                                />
                                <span className="mode-label">Layout 3</span>
                                </label>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <th className="user-table-label-cell" colSpan="2"><h2>Mobile View Setting</h2></th>
                    </tr>
                    <tr>
                        <td>Background Image :</td>
                        <td>
                            <div className="mb-3">
                                <button className="btn btn-outline-danger" onClick={() => handleRemoveImg('background_img')}>
                                    X
                                </button>
                                <img
                                    className="mode-image"
                                    id="background_img_holder"
                                    width="120"
                                    height="120"
                                    src={backgroundImg}
                                    alt="Background"
                                />
                                <input
                                    className="form-control form-control-sm mode-image"
                                    id="background_img"
                                    type="file"
                                    accept="image/png, image/jpeg"
                                    onChange={(e) => handleImageUpload(e, 'background_img')}
                                    style={{ width: '50%', display: 'inline-block' }}
                                />
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td>App Logo Image :</td>
                        <td>
                            <div className="mb-3">
                                <button className="btn btn-outline-danger" onClick={() => handleRemoveImg('app_logo_img')}>
                                    X
                                </button>
                                <img
                                    className="mode-image"
                                    id="app_img_holder"
                                    width="120"
                                    height="120"
                                    src={appLogoImg}
                                    alt="Background"
                                />
                                <input
                                    className="form-control form-control-sm mode-image"
                                    id="app_img"
                                    type="file"
                                    accept="image/png, image/jpeg"
                                    onChange={(e) => handleImageUpload(e, 'app_logo_img')}
                                    style={{ width: '50%', display: 'inline-block' }}
                                />
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td>Cover Photo Image :</td>
                        <td>
                            <div className="mb-3">
                                <button className="btn btn-outline-danger" onClick={() => handleRemoveImg('cover_photo_img')}>
                                    X
                                </button>
                                <img
                                    className="mode-image"
                                    id="cover_img_holder"
                                    width="120"
                                    height="120"
                                    src={coverPhotoImg}
                                    alt="Background"
                                />
                                <input
                                    className="form-control form-control-sm mode-image"
                                    id="cover_img"
                                    type="file"
                                    accept="image/png, image/jpeg"
                                    onChange={(e) => handleImageUpload(e, 'cover_photo_img')}
                                    style={{ width: '50%', display: 'inline-block' }}
                                />
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td>Welcome Text Color: </td>
                        <td style={{ padding: '10px' }}>
                            <input
                                className="mode-color"
                                id="welcome_text_color"
                                type="color"
                                value={welcomeTextColor}
                                onChange={handleWelcomeTextColorChange}
                            />
                        </td>
                    </tr>
                    <tr style={{ padding: '10px' }}>
                        <td>Name Icon Color: </td>
                        <td>
                            <input
                                className="mode-color"
                                id="name_icon_color"
                                type="color"
                                value={nameIconColor}
                                onChange={handleNameIconColorChange }
                            />
                        </td>
                    </tr>
                    <tr style={{ padding: '30px' }}>
                        <td style={{ width: '1050px' }}>Dropdown Highlight Color : </td>
                        <td style={{ width: '150px' }}>
                            <input
                                className="mode-color"
                                id="dropdown_highlight_color"
                                type="color"
                                value={dropdownHighlightColor}
                                onChange={handleDropdownHighlightColorChange }
                            />
                        </td>
                    </tr>
                    <tr style={{ padding: '20px' }}>
                        <td style={{ width: '1350px' }}>Greeting Scroll Background Color : </td>
                        <td style={{ width: '350px' }}>
                            <input
                                className="mode-color"
                                id="greeting_scroll_color"
                                type="color"
                                value={greetingScrollBackgroundColor}
                                onChange={handleGreetingScrollBackgroundColorChange }
                            />
                        </td>
                    </tr>
                    <tr>
                        <td>Submit Button Image : </td>
                        <td>
                            <div className="mb-3">
                            <button
                                className="btn btn-outline-danger"
                                onClick={handleRemoveSubmitButtonImg}
                            >
                                X
                            </button>
                            <img
                                className="mode-image"
                                id="submit_button_img_holder"
                                height={120}
                                src={submitButtonImg}
                                alt="Submit Button"
                            />
                            <input
                                className="form-control form-control-sm mode-image"
                                id="submit_button_img"
                                type="file"
                                accept="image/png, image/jpeg"
                                // onChange={(e) => displayUploadedImage(e)}
                                style={{ width: '50%', display: 'inline-block' }}
                            />
                            <input
                                id="submit_button_img_base64String"
                                value={submitButtonImg}
                                type="hidden"
                            />
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
            <hr />
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '10px' }}>
                <Button type="button" classType="btn btn-danger"  text="Discard" buttonWidth="20%"  />
                <Button type="button" classType="btn btn-primary"  text="Save" buttonWidth="20%"  />
            </div>
        </div>
    )
}
