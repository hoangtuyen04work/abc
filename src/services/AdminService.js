import axios from "./customize-axios";

const apiAdminRegister = (email, password, fullName) => {
  return axios.post("/ssps/admin/register", { email, password, fullName });
};

const fetchAdminInfo = (token) => {
  return axios.get("/ssps/admin/my-info", {
    headers: {
      Authorization: `Bearer ${token}`, // Thêm token vào headers
    },
  });
};

const fetchAllUsers = (token) => {
  return axios.get("/ssps/admin/get-all-students", {
    headers: {
      Authorization: `Bearer ${token}`, // Thêm token vào headers
    },
  });
};

export async function deleteDocumentsExpired() {
  try {
    const token = localStorage.getItem("token");

    if (!token) {
      throw new Error("No authentication token found");
    }

    const result = await axios.delete("/ssps/admin/document-expired", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(result.data.result);

    return result; // Trả về kết quả của API
  } catch (error) {
    console.error("Error uploading file:", error);
    return { success: false, error: error.message || error };
  }
}


// "printerLocation": "New Location",
// "status": "ONLINE",  // Must exactly match the enum name
// "papersLeft": 50,
// "availableDocType": ["Passport", "ID Card"]
const fetchAllPrinters = (token, currentPage, size) => {
  return axios.get(`/ssps/admin/get-all-printers?page=${currentPage - 1}&size=${size}`, {
    headers: {
      Authorization: `Bearer ${token}`, // Thêm token vào headers
    },
  });
};

const updatePrinter = (token, printerID, printerLocation, status, papersLeft, availableDocType) => {
  return axios.patch(`/ssps/admin/update-printer/${printerID}`,
    {
      printerLocation: printerLocation,
      // status: status,
      papersLeft: papersLeft,
      availableDocType: availableDocType
    }
    ,{
    headers: {
      Authorization: `Bearer ${token}`, // Thêm token vào headers
    },
  });
};



// @PutMapping("/enable-printer/{printerId}")
// ApiResponse<String> enablePrinter(@PathVariable Long printerId) {
//     printerService.enablePrinter(printerId);
//     return ApiResponse.<String>builder()
//             .result("Printer enabled successfully")
//             .build();
// }

const enablePrinter = (token, printerID) => {
  return axios.put(`/ssps/admin/enable-printer/${printerID}`,{}, {
    headers: {
      Authorization: `Bearer ${token}`, // Thêm token vào headers
    },
  });
};

// @PutMapping("/disable-printer/{printerId}")
// ApiResponse<String> disablePrinter(@PathVariable Long printerId) {
//     printerService.disablePrinter(printerId);
//     return ApiResponse.<String>builder()
//             .result("Printer disabled successfully")
//             .build();
// }

const disablePrinter = (token, printerID) => {
  return axios.put(`/ssps/admin/disable-printer/${printerID}`,{}, {
    headers: {
      Authorization: `Bearer ${token}`, // Thêm token vào headers
    },
  });
};

//get rating by printing id
const getRatingByPrintingId = (token, printingId, page, size) => {
  return axios.get(`/ssps/admin/get-all-ratings/${printingId}?page=${page}&size=${size}`,{
    headers: {
      Authorization: `Bearer ${token}`, // Thêm token vào headers
    },
  });
};

//get all rating
const getAllRating = (token, page, size) => {
  return axios.get(`/ssps/admin/get-all-ratings?page=${page}&size=${size}`, {
    headers: {
      Authorization: `Bearer ${token}`, // Thêm token vào headers
    },
  });
};

//get rating by student id
const getRatingByStudentId = (token, studentId, page, size) => {
  return axios.get(`/ssps/admin/get-ratings-by-student-id/${studentId}?page=${page}&size=${size}`,{
    headers: {
      Authorization: `Bearer ${token}`, // Thêm token vào headers
    },
  });
};


export {
  apiAdminRegister, fetchAdminInfo, fetchAllUsers,
  fetchAllPrinters, updatePrinter, enablePrinter,
  disablePrinter, getRatingByPrintingId, getAllRating,
  getRatingByStudentId
};
