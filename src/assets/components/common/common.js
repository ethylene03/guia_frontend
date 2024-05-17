import moment from "moment";
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
    } else if(path === 'refresh') {
        refreshPage();
    } else {
        return window.location.href = path;
    }
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
export const getTokenExpiry = (type) => {
    if(type === 'visitor')
        return localStorage.getItem('visitor_token_expiry');
    else
        return localStorage.getItem("token_expiry");
};

// visitor token expired
export const visitorExpired = () => {
    const currentDate = moment(new Date()).format('MM-DD-YYYY');
    const expiry = moment(getTokenExpiry('visitor')).format('MM-DD-YYYY')

    if(currentDate !== expiry) {
        const {open, close} = useModal({
            component: ToastVue,
            attrs: {
                type: 'warning',
                message: "Token expired!",
                subtext: 'Please login again to continue.'
            }
        })

        open();
        localStorage.clear();
        setTimeout(() => close(), 1000);
        return true;
    } else 
        return false;
}

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

export const errorToast = (message, path) => {
    const {open, close} = useModal({
        component: ToastVue,
        attrs: {
            type: 'error',
            message: message,
            subtext: 'Please try again later.'
        }
    })

    open();
    setTimeout(() => redirect(path ? path : 'back'), 1000);
}

export const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
}
