import { useModal } from "vue-final-modal";
import { expressGET, loginGET } from "./api";
import Toast from "../components/common/Toast.vue";
import { getMuseumId, refreshPage } from "../components/common/common";

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

export const getTraffic = async () => {
    const traffic = await expressGET('visitor/traffic', {museum_id: getMuseumId('visitor')});
    // console.log(traffic);

    if(traffic.status < 400)
        return traffic.data.traffic;
    else {
        const {open, close} = useModal({
            component: Toast,
            attrs: {
                type: 'error',
                message: traffic.response.data.detail,
                subtext: 'Please try again later.'
            }
        })

        open();
        setTimeout(() => refreshPage(), 1000);
    }
}