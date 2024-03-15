import { useModal } from "vue-final-modal";
import { getAdminId, logout } from "../components/common/common";
import { GET } from "./api";
import Toast from "../components/common/Toast.vue";

export const fetchDashboard = async () => {
    const data = await GET('/dashboard/get', {admin_id: getAdminId()});
    // console.log(data);

    if(data.status === 200) {
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