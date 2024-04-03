import { errorToast, getMuseumId } from "../components/common/common";
import { GET, expressGET } from "./api";

export const getSection = async (id, type) => {
    const section = await expressGET('/section/get', {
        museum_id: getMuseumId(type),
        section_id: id, 
    });

    if(section.status != 200) {
        errorToast(section.response.data.detail);
    } else
        return section.data;
}

export const getChecklist = async (id, token) => {
    const checklist = await expressGET('visitor/artwork-checklist/get', {
        section_id: id,
        visitor_token: token
    });

    if(checklist.status < 400)
        return checklist.data.artwork_checklist;
    else 
        errorToast(checklist.response.data.detail);
}