import { useModal } from "vue-final-modal";
import ToastVue from "../components/common/Toast.vue";
import { errorToast, getAdminId, redirect, refreshPage } from "../components/common/common";
import { format } from "../components/view-artwork/Functions";
import { GET, POST, authPOST } from "./api";
import axios from "axios";

// get all
export const getAllArtworks = async (type) => {
    const AllArtworks = await GET('artwork/get/all', type ? null : {admin_id: getAdminId()});
    // console.log(AllArtworks);

    if(AllArtworks.status < 300) {
        const arts = AllArtworks.data.artworks;
        return arts.map(art => {
            let artwork = {};

            artwork.id = art.art_id;
            artwork.img = art.image_thumbnail;
            artwork.title = art.title;
            artwork.artist = art.artist_name;
            artwork.year = format(art.date_published, 'YYYY');
            
            return artwork;
        })

        // console.log(this.artworks)
    } else {
        errorToast('Error fetching artworks');
    }
}


export const deleteArtwork = async (id) => {
    const deletedArt = await authPOST('/artwork/delete', {art_id: id});
    console.log(deletedArt);

    if(deletedArt.status < 300) {
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

// get one artwork
export const getArtwork = async (id, type) => {
    var admin_id = "";
    
    if(!type) {
        admin_id = getAdminId();
    }

    const art = await GET('/artwork/get', {
        art_id: id,
        admin_id: admin_id,
    });

    if(art.response?.status >= 400) {
        errorToast(art.response.data.detail);
    } else
        return art.data.artwork;
}

// get artwork visits per section
export const getArtworkVisits = async (id, token) => {
    const visits = await GET('/visitor/artwork-visits', {
        section_id: id,
        visitor_token: token,
    });

    if(visits.status < 400)
        return visits.data;
    else {
        errorToast(visits.response.data.detail);
    }
} 

export const predictImage = async (image) => {
    const baseURL = import.meta.env.VITE_API_URL;
    const APIKey = import.meta.env.VITE_API_KEY;

    // convert image to file
    let fetchRes = await fetch(image);
    let blob = await fetchRes.blob();
    let file = new File([blob], 'image.jpg', {type: 'image/jpeg'});

    // create form data
    const formData = new FormData();
    formData.append('image', file);
    
    // make request
    try {
        const response = await axios.post(baseURL + '/artwork/predict', formData, {
            headers: {
                'X-API-KEY': APIKey,
                'Content-Type': 'multipart/form-data',
            }
        });

        redirect('/view/' + response.data.art_id);
    } catch (err) {
        const { open, close } = useModal({
            component: ToastVue,
            attrs: {
                type: 'info',
                message: 'Cannot read image!',
                subtext: 'Please try again.'
            }
        })
    
        open();
        setTimeout(() => close(), 1000);
    }
}