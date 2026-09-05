import API_URL from "../services/api";

export const fetchStudents = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
        throw new Error("Please login first");
    }

    const response = await fetch(
        `${API_URL}/api/student`,
        {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );

    const data = await response.json();

    if (!response.ok) {
        throw new Error(
            data.message || "Failed to fetch students"
        );
    }

    return data;
};


export const fetchStudentByEmail = async (email) => {
    const token = localStorage.getItem("token");

    if (!token) {
        throw new Error("Please login first");
    }

    const response = await fetch(
        `${API_URL}/api/student/email/${encodeURIComponent(email)}`,
        {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );

    const data = await response.json();

    if (!response.ok) {
        throw new Error(
            data.message || "Student not found"
        );
    }

    return data;
};


export const deleteStudent = async (id) => {
    const token = localStorage.getItem("token");

    if (!token) {
        throw new Error("Please login first");
    }

    const response = await fetch(
        `${API_URL}/api/student/${id}`,
        {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );

    const data = await response.json();

    if (!response.ok) {
        throw new Error(
            data.message || "Failed to delete student"
        );
    }

    return data;
};