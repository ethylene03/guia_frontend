import { useModal } from "vue-final-modal";
import { loginGET } from "./api";
import Toast from "../components/common/Toast.vue";
import { refreshPage } from "../components/common/common";

export const getAllMuseum = async () => {
    const AllMuseums = await loginGET('/museum/get');
    // console.log(AllMuseums);

    if(!AllMuseums.error) {
        return AllMuseums.data.museum;
    } else {
        const {open, close} = useModal({
            component: Toast,
            attrs: {
                type: 'error',
                message: 'Error loading museums!',
                subtext: 'Please try again later.'
            }
        })

        open();
        setTimeout(() => refreshPage(), 1000);
    }
}