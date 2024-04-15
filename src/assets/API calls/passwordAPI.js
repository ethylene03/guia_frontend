import { useModal } from "vue-final-modal";
import Toast from "../components/common/Toast.vue";
import { logout, refreshPage } from "../components/common/common";
import { authPOST } from "./api";

export const changePassword = async (deets) => {
    const changePass = await authPOST('/admin/change-password', deets);
    // console.log(changePass);

    if(changePass.status < 300) {
        // success toaster
        const { open, close } = useModal({
            component: Toast,
            attrs: {
                type: 'success',
                message: 'Password changed successfully!',
                subtext: 'Logging you out...'
            }
        }) 

        open();
        setTimeout(() => logout(), 100);

        return "";
    } else {
        if(changePass.response.data.detail)
            return changePass.response.data.detail;
        else {
            // error toaster
            const { open: openE, close: closeE} = useModal({
                component: Toast,
                attrs: {
                    type: 'error',
                    message: 'Error Changing Password!',
                }
            }) 

            openE();
            setTimeout(() => refreshPage(), 100);
        }
    }
}