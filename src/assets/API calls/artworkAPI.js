import moment from "moment";
import { useModal } from "vue-final-modal";
import ToastVue from "../components/common/Toast.vue";
import { errorToast, getAdminId, redirect } from "../components/common/common";
import { GET, POST, expressGET } from "./api";

// get all
export const getAllArtworks = async (type) => {
    const AllArtworks = await expressGET('artwork/get/all', type ? null : {admin_id: getAdminId()});
    // console.log(AllArtworks);

    if(AllArtworks.status === 200) {
        const arts = AllArtworks.data.artworks;
        return arts.map(art => {
            let artwork = {};

            artwork.id = art.art_id;
            artwork.img = art.image_thumbnail;
            artwork.title = art.title;
            artwork.artist = art.artist_name;

            // date published
            if(art.date_published.includes('-')) {
                let parts = art.date_published.split('-');
                let date = new Date(parts[1], parts[0] - 1);
                artwork.year = moment(date).format('YYYY');
            } else
                artwork.year = moment(new Date(art.date_published)).format('YYYY');

            return artwork;
        })

        // console.log(this.artworks)
    } else {
        errorToast('Error fetching artworks');
    }
}


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

// get one artwork
export const getArtwork = async (id, type) => {
    var admin_id = "";
    
    if(!type) {
        admin_id = getAdminId();
    }

    const art = await expressGET('/artwork/get', {
        art_id: id,
        admin_id: admin_id,
    });

    if(art.response?.status >= 400) {
        const {open, close} = useModal({
            component: ToastVue,
            attrs: {
                type: 'error',
                message: art.response.data.detail,
                subtext: 'Please try again later.'
            }
        })

        open();
        setTimeout(() => this.$router.back(), 100);
    } else
        return art.data.artwork;
}

// get artwork visits per section
export const getArtworkVisits = async (id, token) => {
    const visits = await expressGET('/visitor/artwork-visits', {
        section_id: id,
        visitor_token: token,
    });

    if(visits.status < 400)
        return visits.data;
    else {
        const {open, close} = useModal({
            component: ToastVue,
            attrs: {
                type: 'error',
                message: visits.response.data.detail,
                subtext: 'Please try again later.'
            }
        })

        open();
        setTimeout(() => redirect('back'), 1000);
    }
} 