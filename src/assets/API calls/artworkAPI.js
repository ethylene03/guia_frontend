import axios from "axios";
import { POST } from "./api";
import { useModal } from "vue-final-modal";
import ToastVue from "../components/Toast.vue";

export const deleteArtwork = async (id) => {
    const deletedArt = await POST('/artwork/delete', {art_id: id});
    console.log(deletedArt);

    if(deletedArt.status === 200) {
        const {open, close} = useModal({
            component: ToastVue,
            attrs: {
                type: 'success',
                message: 'Artwork deleted successfully!',
                subtext: 'Redirecting you to artwork directory...'
            }
        })

        open();
    } else {
        const {open, close} = useModal({
            component: ToastVue,
            attrs: {
                type: 'error',
                message: 'Error deleting artwork!',
                subtext: 'Please try again later.'
            }
        })

        open();
    }
    setTimeout(() => window.location.href = '/on-cloud-nine/view/all', 1000);
}