// refresh the page
export const refreshPage = () => {
    return window.location.reload();
};

// get the token stored locally
export const getToken = () => {
    return localStorage.getItem("token");
};

// get the museum_id stored locally
export const getMuseumId = () => {
    return localStorage.getItem("museum_id");
};

// get the admin_id stored locally
export const getAdminId = () => {
    return localStorage.getItem("admin_id");
};