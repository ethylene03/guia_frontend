import moment from "moment";
import { POST } from "../../API calls/api";
import { useModal } from "vue-final-modal";
import ToastVue from "./Toast.vue";

// refresh the page
export const refreshPage = () => {
    return window.location.reload();
};

// redirect to path
export const redirect = (path) => {
    if(path === 'back') {
        window.location.href = document.referrer;
    } else
        return window.location.href = path;
}

// redirect to new tab
export const redirectNewTab = (path) => {
    return window.open(path, '_blank');
}

// get the token stored locally
export const getToken = (type) => {
    if(type === 'admin')
        return localStorage.getItem("admin_token");
    else if(type === 'visitor')
        return localStorage.getItem("visitor_token");
};

// get the museum_id stored locally
export const getMuseumId = (type) => {
    return localStorage.getItem(type + "_museum_id");
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
export const logout = async () => {   
    localStorage.clear();
    refreshPage();
    return true
}

// check if token is expired
export const isExpired = () => {
    const now = moment().local();
    const token = getTokenExpiry();
    
    if(moment(token).isBefore(moment(now))) {
        // toast error
        const {open, close} = useModal({
            component: ToastVue,
            attrs: {
                type: 'warning',
                message: "Token expired!",
                subtext: 'Please login again to continue.'
            }
        })

        open();
        logout();
        return true;
    } else
        return false;
}

export const errorToast = (message) => {
    const {open, close} = useModal({
        component: ToastVue,
        attrs: {
            type: 'error',
            message: message,
            subtext: 'Please try again later.'
        }
    })

    open();
    setTimeout(() => redirect('back'), 1000);
}

export const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
}
