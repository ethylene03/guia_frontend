import { useModal } from "vue-final-modal";
import Toast from "../components/common/Toast.vue";
import { getAdminId, logout } from "../components/common/common";
import { authGET } from "./api";

export const fetchDashboard = async () => {
    const data = await authGET('/dashboard/get', {admin_id: getAdminId()});

    if(data.status < 300) {
        return data.data;
    } else {
        const {open, close} = useModal({
            component: Toast,
            attrs: {
                type: 'error',
                message: 'Error loading data',
                subtext: 'Please try again later',
            }
        })

        open();
        setTimeout(() => logout(), 1000);
    }
}