import moment from "moment";
import Modal from "../common/Modal.vue";
import { deleteArtwork } from "@/assets/API calls/artworkAPI";
import { useModal } from "vue-final-modal";
import Toast from "../common/Toast.vue";

export const format = (date, format) => {
    if(format === "MMMM D, YYYY") {
        if(!date?.includes('-'))
            return moment(date, "YYYY").format('YYYY');

        else if(date.split('-').length - 1 == 1)
            return moment(date, "MM-YYYY").format('MMMM YYYY');
        
        else
            return moment(date, "MM-DD-YYYY").format(format);
    } else {
        var dateMoment;

        if(!date?.includes('-'))
            dateMoment = moment(date, "YYYY")

        else if(date.split('-').length - 1 == 1)
            dateMoment = moment(date, "MM-YYYY")
        
        else
            dateMoment = moment(date, "MM-DD-YYYY")
        
        return dateMoment.format(format);
    }
};

export const deleteArt = async () => {
    const {open, close} = useModal({
        component: Toast,
        attrs: {
            type: 'warning',
            message: 'Deleting artwork...'
        }
    })

    open();
    
    const currentURL = window.location.pathname;
    const id = currentURL.split('/').slice(-1)[0];
    
    await deleteArtwork(id);
    close();
}

export const openModal = () => {
    const { open, close } = useModal({
        component: Modal,
        attrs: {
            logoURL: '/icons/warning.svg',
            title: 'Delete artwork?',
            action: 'delete',
            artwork: 'artwork',
            buttonLeft: 'Cancel',
            buttonRight: 'Delete',
            isSave: false,
            onLeftAction() {
                close();
            },
            async onRightAction() {
                // delete here
                close();
                await deleteArt();
                // window.location.href = './all';
            }
        },
    });

    open();
};

