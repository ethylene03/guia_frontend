import moment from "moment";

// refresh the page
export const refreshPage = () => {
    return window.location.reload();
};

// get the token stored locally
export const getToken = (type) => {
    if(type === 'admin')
        return localStorage.getItem("admin_token");
    else if(type === 'visitor')
        return localStorage.getItem("visitor_token");
};

// get the museum_id stored locally
export const getMuseumId = () => {
    return localStorage.getItem("museum_id");
};

// get the admin_id stored locally
export const getAdminId = () => {
    return localStorage.getItem("admin_id");
};

// get the username stored locally
export const getUsername = () => {
    return localStorage.getItem("username");
};

// get the username stored locally
export const getTokenExpiry = () => {
    return localStorage.getItem("token_expiry");
};

// logout
export const logout = () => {
    localStorage.removeItem('admin_token');
    localStorage.removeItem('admin_id');
    localStorage.removeItem('museum_id');

    refreshPage();
}

// check if token is expired
export const isExpired = () => {
    const now = moment().local();
    const token = getTokenExpiry();
    
    if(moment(token).isBefore(moment(now))) {
        console.log("token expired, logging you out...");
        setTimeout(() => {
           logout() 
        }, 2000);
        return true;
    } else
        return false;
}
