import React, { useState, useEffect } from "react";
import {getRatingByPrintingId, getAllRating, getRatingByStudentId} from "../../services/AdminService"
const UserReviews = () => {
    const [activeTab, setActiveTab] = useState("all"); // "all", "printingRequest", "student"
    const [ratings, setRatings] = useState([]);
    const [page, setPage] = useState(0);
    const [size, setSize] = useState(3);
    const [totalPages, setTotalPages] = useState(0);

    const fetchRatingByPrintingId = async (printingId) => {
        const token = localStorage.getItem('token');
        const response = await getRatingByPrintingId(token, printingId, page, size);
        setTotalPages(response.data.totalPages);
        setRatings(response.data.result);
    }

    const fetchAllRating = async () => {
        const token = localStorage.getItem('token');
        const response = await getAllRating(token, page, size);
        setTotalPages(response.data.totalPages);

        setRatings(response.data.result);

    }

    const fetchRatingByStudentId = async (studentId) => {
        const token = localStorage.getItem('token');
        const response = await getRatingByStudentId(token, studentId, page, size);
        setTotalPages(response.data.totalPages);

        setRatings(response.data.result);
    }


    // States for filtering
    const [printingRequestId, setPrintingRequestId] = useState("");
    const [studentId, setStudentId] = useState("");

    // Fetch ratings based on active tab
    useEffect(() => {
        setRatings([]);
        if (activeTab === "printingRequest" && printingRequestId) {
            fetchRatingByPrintingId(printingRequestId);
        } else if (activeTab === "student" && studentId) {
            fetchRatingByStudentId(studentId);
        } else {
            fetchAllRating();
        }

    }, [activeTab, page, size, printingRequestId, studentId]);

    // Handle pagination
    const handleNextPage = () => {
        if (page < totalPages - 1) setPage(page + 1);
    };

    const handlePreviousPage = () => {
        if (page > 0) setPage(page - 1);
    };

    // Render ratings list
    const renderRatings = () => {
        return ratings.map((rating) => (
            <div key={rating.id} className="bg-white p-4 shadow-md rounded-md mb-4">
                <p className="text-lg font-bold">⭐ {rating.rating}</p>
                <p>
                    <span className="font-semibold">Sinh viên:</span> {rating.studentId}
                </p>
                <p>
                    <span className="font-semibold">Yêu cầu in:</span>{" "}
                    {rating.printingRequestId}
                </p>
                <p>
                    <span className="font-semibold">Bình luận:</span>{" "}
                    {rating.comment || "Không có bình luận"}
                </p>
            </div>
        ));
    };
    {/* <h2 class="font-medium text-3xl text-center">Printing</h2> */ }
    {/* <h1 className="text-2xl font-bold text-center mb-8">User reviews</h1> */ }
    return (
        <div className="max-w-4xl mx-auto p-6 bg-gray-50 min-h-screen">
            <h1 className="text-2xl font-bold text-center mt-4 mb-4 pb-2 border-b border-gray-300">User reviews</h1>
            <div className="flex justify-center space-x-4 mt-9 mb-12">


                <button
                    className={`px-4 py-2 rounded ${activeTab === "all"
                            ? "bg-blue-600 text-white"
                            : "bg-gray-200 text-gray-800"
                        }`}
                    onClick={() => {
                        setActiveTab("all");
                        setPage(0);
                    }}
                >
                    Tất cả Đánh giá
                </button>
                <button
                    className={`px-4 py-2 rounded ${activeTab === "printingRequest"
                            ? "bg-blue-600 text-white"
                            : "bg-gray-200 text-gray-800"
                        }`}
                    onClick={() => {
                        setRatings([]);
                        setActiveTab("printingRequest");
                        setPage(0);
                        
                    }}
                >
                    Theo Yêu cầu in
                </button>
                <button
                    className={`px-4 py-2 rounded ${activeTab === "student"
                            ? "bg-blue-600 text-white"
                            : "bg-gray-200 text-gray-800"
                        }`}
                    onClick={() => {
                        setRatings([]);
                        setActiveTab("student");
                        setPage(0);
                        
                    }}
                >
                    Theo Sinh viênx
                </button>
            </div>

            {/* Filters */}
            {activeTab === "printingRequest" && (
                <div className="flex space-x-4 mb-6">
                    <input
                        type="text"
                        placeholder="Nhập mã yêu cầu in"
                        className="p-2 border border-gray-300 rounded flex-grow"
                        value={printingRequestId}
                        onChange={(e) => setPrintingRequestId(e.target.value)}
                    />
                    <button
                        className="bg-blue-600 text-white px-4 py-2 rounded"
                        onClick={() => setPage(0)}
                    >
                        Tìm kiếm
                    </button>
                </div>
            )}
            {activeTab === "student" && (
                <div className="flex space-x-4 mb-6">
                    <input
                        type="text"
                        placeholder="Nhập mã sinh viên"
                        className="p-2 border border-gray-300 rounded flex-grow"
                        value={studentId}
                        onChange={(e) => setStudentId(e.target.value)}
                    />
                    <button
                        className="bg-blue-600 text-white px-4 py-2 rounded"
                        onClick={() => setPage(0)}
                    >
                        Tìm kiếm
                    </button>
                </div>
            )}

            {/* Rating List */}
            <div className="space-y-4">
                {ratings.length > 0 ? (
                    renderRatings()
                ) : (
                    <p className="text-center text-gray-500">Không có đánh giá nào.</p>
                )}
            </div>

            {/* Pagination */}
            <div className="flex justify-between items-center mt-6">
                <button
                    className="bg-gray-200 text-gray-800 px-4 py-2 rounded disabled:opacity-50"
                    onClick={handlePreviousPage}
                    disabled={page === 0}
                >
                    Trang trước
                </button>
                <span className="text-gray-600">
                    Trang {page + 1} / {totalPages}
                </span>
                <button
                    className="bg-gray-200 text-gray-800 px-4 py-2 rounded disabled:opacity-50"
                    onClick={handleNextPage}
                    disabled={page === totalPages - 1}
                >
                    Trang sau
                </button>
            </div>
        </div>
    );
};

export default UserReviews;