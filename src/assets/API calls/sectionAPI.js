import { errorToast, getMuseumId, getToken } from "../components/common/common";
import { GET, expressGET, expressPOST } from "./api";

export const getSection = async (id, type) => {
    const section = await expressGET('/section/get', {
        museum_id: getMuseumId(type),
        section_id: id, 
    });

    if(section.status >= 300) {
        errorToast(section.response.data.detail);
    } else
        return section.data;
}

export const getChecklist = async (id, token) => {
    const checklist = await expressGET('visitor/artwork-checklist/get', {
        section_id: id,
        visitor_token: token
    });

    if(checklist.status < 400) {
        const artworks = checklist.data.artwork_checklist;

        return artworks;
    }
    else 
        errorToast(checklist.response.data.detail);
}

export const editChecklist = async (artworks) => {
    const update = await expressPOST('visitor/artwork-checklist/edit', {
        visitor_token: getToken('visitor'),
        visit_id: artworks.visit_id,
        art_id: artworks.art_id,
        is_visited: artworks.is_visited
    })

    if(update.status < 400)
        return true;
    // else
        // errorToast(update.response.data.detail);
}