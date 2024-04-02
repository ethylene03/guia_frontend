import moment from "moment";
import { useModal } from "vue-final-modal";
import ToastVue from "../components/common/Toast.vue";
import { getAdminId, redirect } from "../components/common/common";
import { GET, POST, expressGET } from "./api";

// get all
export const getAllArtworks = async () => {
    const AllArtworks = await GET('artwork/get/all', {admin_id: getAdminId()});
    // console.log(AllArtworks);

    if(AllArtworks.status === 200) {
        const arts = AllArtworks.data.artworks;
        return arts.map(art => {
            let artwork = {};

            artwork.id = art.art_id;
            artwork.img = art.image_thumbnail;
            artwork.title = art.title;
            artwork.artist = art.artist_name;
            artwork.year = moment(art.date_published).format('YYYY');

            return artwork;
        })

        // console.log(this.artworks)
    } else {
        const {open, close} = useModal({
            component: Toast,
            attrs: {
                type: 'error',
                message: 'Error loading the artworks',
                subtext: 'Please try again later.'
            }
        })

        open();
        setTimeout(() => this.$router.back(), 1000);
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
export const getArtwork = async (id) => {
    const art = await GET('/artwork/get', {
        art_id: id,
        admin_id: getAdminId(),
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