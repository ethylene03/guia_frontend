import { useModal } from "vue-final-modal";
import { expressGET, loginGET } from "./api";
import Toast from "../components/common/Toast.vue";
import { errorToast, getMuseumId, refreshPage } from "../components/common/common";

export const getMuseum = async (id) => {
    const AllMuseums = await expressGET('/museum/get', {museum_id: id ? id : ''});
    // console.log(AllMuseums);

    if(AllMuseums.status < 400) {
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

export const getTraffic = async () => {
    const traffic = await expressGET('visitor/traffic', {museum_id: getMuseumId('visitor')});
    // console.log(traffic);

    if(traffic.status < 400)
        return traffic.data.traffic;
    else {
        errorToast(traffic.response.data.detail);
    }
}