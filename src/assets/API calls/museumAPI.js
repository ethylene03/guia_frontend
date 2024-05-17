import { errorToast, getMuseumId } from "../components/common/common";
import { GET } from "./api";

export const getMuseum = async (id) => {
    const AllMuseums = await GET('/museum/get', {museum_id: id ? id : ''});

    if(AllMuseums.status < 400) {
        return AllMuseums.data.museum;
    } else {
        errorToast('Error loading museum!', 'refresh')
    }
}

export const getTraffic = async () => {
    const traffic = await GET('visitor/traffic', {museum_id: getMuseumId('visitor')});

    if(traffic.status < 400)
        return traffic.data.traffic;
    else {
        errorToast(traffic.response.data.detail);
    }
}