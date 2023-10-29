import React , { useState } from 'react';
import { Modal } from '../components/index';
import TableRow from './tableRow';
import { RoomSetting, GrettingRoom } from '../profile';
import Axios from 'axios';


export const Table = ({ data, onRefresh, showToast }) =>{


    const itemsPerPage = 10; // Number of items to display per page
    const [currentPage, setCurrentPage] = useState(1);

    const [isModalOpen, setIsModalOpen] = useState(false); // State to control the modal
    const [modalContent, setModalContent] = useState(''); // Content for the modal
    const [modalTitle, setModalTitle] = useState(''); // Title for the modal
    const [modalWidth, setModalWidth] = useState(''); // Width for the modal
    const [modalHeight, setModalHeight] = useState(''); // Height for the modal
    const [selectedId, setSelectedId] = useState(null);

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    const itemsToDisplay = data.slice(startIndex, endIndex);
    const totalPages = Math.ceil(data.length / itemsPerPage);

    const handlePageChange = (newPage) => {
        if (newPage >= 1 && newPage <= totalPages) {
          setCurrentPage(newPage);
        }
    };


    const toggleModal = (content, width, height, title) => {
        // console.log("this is the height from table.js: ", height);
        setModalContent(content);
        setModalWidth(width);
        setModalHeight(height);
        setIsModalOpen(true);
        setModalTitle(title);
    };


    const onCloseModal = () => {
        // console.log("this is the on close modal pressed");
        setIsModalOpen(false);
    };


    const onCloseModals = () => {
        // console.log("this is the on close modal pressed");
        onRefresh(true);
        setIsModalOpen(false);
    };


    const handleRowClick = (id) => {
        // console.log("i have access the handle row click: ", id);
        setSelectedId(id); // Set the selected ID
        toggleModal(<RoomSetting id={id} onClose={onCloseModal} onCloseModals={onCloseModals} showToast={showToast}/>, '1000px', '1500px', 'Room Setting');
    };



    const handleRowSettingClick = (id) =>{

        // console.log("this is handle row setting click: ", id);
        Axios.get("https://web-intractive-system-app-api.onrender.com/get/roomName/"+id, {}, {
        })
        .then(response => {
            let roomNameValue = response.data[0].room_name;
            toggleModal(<GrettingRoom id={id} onClose={onCloseModal}/> , '1400px', '1500px', '[Greeting Page] Room name: ' + roomNameValue);
        })
        .catch(error => {
            console.log(error);
        });
    };



    return(
        <div>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th scope="col">Room ID</th>
                        <th scope="col">Room Name</th>
                        <th scope="col">Remaining Time</th>
                        <th scope="col">Active</th>
                        <th scope="col">Action</th>
                    </tr>
                </thead>
                <tbody>
                {itemsToDisplay.map((item, index) => (
                    <TableRow key={index} item={item} onRefresh={onRefresh} onRowClick={handleRowClick} showToast={showToast}  openModal={toggleModal} onRowClickSetting={handleRowSettingClick} />
                ))}
                </tbody>
            </table>

            <nav aria-label="Page navigation">
                <ul className="pagination">
                    <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                    <button
                        className="page-link"
                        onClick={() => handlePageChange(currentPage - 1)}>Previous</button>
                    </li>
                    {Array.from( { length: totalPages }, (_, index) => [
                        <li
                        className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}
                        key={index}
                      >
                        <button
                          className="page-link"
                          onClick={() => handlePageChange(index + 1)}
                        >
                          {index + 1}
                        </button>
                      </li>
                    ])}
                    <li
                        className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}
                    >
                        <button
                        className="page-link"
                        onClick={() => handlePageChange(currentPage + 1)}
                        >
                        Next
                        </button>
                    </li>
                </ul>
            </nav>


            {isModalOpen && (
                <Modal
                    show={isModalOpen}
                    onHide={onCloseModal}
                    title={modalTitle}
                    width={modalWidth}
                    height={modalHeight}
                    content={modalContent}
                />
                )}


        </div>
    )
}