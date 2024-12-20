import React, { useState, useRef } from "react";
import { MdSearch, MdFilterList } from 'react-icons/md';

const initialData = [
    { id: 1, location: "Li Thuong Kiet", building: "A1", floor: 1, fileName: "Network layer", date: "Dec 20 2024", pages: 35, size: "A4", status: "Success" },
    { id: 2, location: "Di An", building: "B6", floor: 4, fileName: "Transport layer", date: "Nov 2 2024", pages: 30, size: "A3", status: "Success" },
    { id: 3, location: "Di An", building: "H1", floor: 6, fileName: "Database system", date: "Sep 5 2024", pages: 35, size: "A2", status: "Fail" },
];

const StudentReport = () => {
    const inputRef = useRef(null);

    const [searchTerm, setSearchTerm] = useState("");
    const [filteredData, setFilteredData] = useState(initialData);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [isFilterVisible, setIsFilterVisible] = useState(false); // State to control filter visibility

    const handleSearch = (event) => {
        const value = event.target.value.toLowerCase();
        setSearchTerm(value);

        const filtered = initialData.filter(item =>
            item.id.toString().includes(value) ||
            item.location.toLowerCase().includes(value) ||
            item.building.toLowerCase().includes(value) ||
            item.fileName.toLowerCase().includes(value) ||
            item.date.toLowerCase().includes(value) ||
            item.pages.toString().includes(value) ||
            item.size.toLowerCase().includes(value) ||
            item.status.toLowerCase().includes(value)
        );

        setFilteredData(filtered);
    };

    const handleIconClick = () => {
        if (inputRef.current) {
            inputRef.current.focus();
        }
    };

    const handleFilterClick = () => {
        setIsFilterVisible(true); // Show filter fields when filter button is clicked
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    const handleApplyFilter = () => {
        // Filter logic based on date range
        const filtered = initialData.filter(item => {
            const itemDate = new Date(item.date);
            return (
                (!startDate || itemDate >= new Date(startDate)) &&
                (!endDate || itemDate <= new Date(endDate))
            );
        });

        setFilteredData(filtered);
        setIsFilterVisible(false); // Hide filter fields after applying
    };

    return (
        <section className="p-8">
            <div>
                <h2 className="font-medium text-3xl text-center">History printer</h2>
            </div>
            <hr className="my-5" />

            <div className="flex justify-center mb-6">
                <div className="flex items-center border border-gray-300 rounded-lg w-full max-w-[600px] group">
                    <div
                        className="flex items-center justify-center w-10 h-10 bg-gray-200 rounded-l-lg border border-gray-300 group-focus-within:border-blue-400 transition-colors duration-200 ease-in-out cursor-pointer"
                        onClick={handleIconClick}
                    >
                        <MdSearch className="w-5 h-5 text-gray-600" />
                    </div>
                    <input
                        type="text"
                        value={searchTerm}
                        onChange={handleSearch}
                        placeholder="Search..."
                        ref={inputRef}
                        className="px-4 py-2 w-full rounded-r-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                    <div
                        className="flex items-center justify-center w-10 h-10 bg-gray-200 rounded-r-lg border border-gray-300 transition-colors duration-200 ease-in-out cursor-pointer"
                        onClick={handleFilterClick}
                    >
                        <MdFilterList className="w-5 h-5 text-gray-600" />
                    </div>
                </div>
            </div>

            {/* Date filter fields */}
            {isFilterVisible && (
                <div className="mb-4">
                    <label className="mr-2">From:</label>
                    <input
                        type="date"
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                        className="border p-1 rounded"
                    />
                    <label className="mx-2">To:</label>
                    <input
                        type="date"
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                        className="border p-1 rounded"
                    />
                    <button
                        onClick={handleApplyFilter}
                        className="bg-blue-500 text-white px-4 py-2 ml-4 rounded-lg hover:bg-blue-600"
                    >
                        Apply
                    </button>
                </div>
            )}

            <div className="relative overflow-x-auto rounded-lg">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-100">
                        <tr>
                            <th scope="col" className="px-6 py-5 text-center">ID Printer</th>
                            <th scope="col" className="px-6 py-5 text-center">Location</th>
                            <th scope="col" className="px-6 py-5 text-center">Building</th>
                            <th scope="col" className="px-6 py-5 text-center">Floor</th>
                            <th scope="col" className="px-6 py-5 text-center">File Name</th>
                            <th scope="col" className="px-6 py-3 text-center">Date</th>
                            <th scope="col" className="px-6 py-3 text-center">Pages Number</th>
                            <th scope="col" className="px-6 py-3 text-center">Size</th>
                            <th scope="col" className="px-6 py-3 text-center">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredData.length > 0 ? (
                            filteredData.map((item) => (
                                <tr key={item.id} className="bg-white border-b hover:bg-gray-50">
                                    <td className="px-6 py-4 text-center">{item.id}</td>
                                    <td className="px-6 py-4 capitalize text-center">{item.location}</td>
                                    <td className="px-6 py-4 text-center">{item.building}</td>
                                    <td className="px-6 py-4 capitalize text-center">{item.floor}</td>
                                    <td className="px-6 py-4 capitalize text-center">{item.fileName}</td>
                                    <td className="px-6 py-4 text-center">{item.date}</td>
                                    <td className="px-6 py-4 text-center">{item.pages}</td>
                                    <td className="px-6 py-4 text-center">{item.size}</td>
                                    <td className="px-6 py-4 text-center">
                                        <div className="flex items-center justify-center">
                                            <div
                                                className={`h-2.5 w-2.5 rounded-full ${item.status === "Success" ? "bg-green-500" : "bg-red-500"} mr-2`}
                                            ></div>
                                            {item.status}
                                        </div>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="9" className="text-center py-4">No results found.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </section>
    );
};

export default StudentReport