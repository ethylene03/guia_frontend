import { useModal } from "vue-final-modal";
import { getMuseumId } from "../components/common/common";
import { GET } from "./api";
import Toast from "../components/common/Toast.vue";

export const getSection = async (id) => {
    const section = await GET('/section/get', {
        museum_id: getMuseumId('admin'),
        section_id: id, 
    });

    if(section.status != 200) {
        const {open, close} = useModal({
            component: Toast,
            attrs: {
                type: 'error',
                message: section.response.data.detail,
                subtext: 'Please try again later.'
            }
        });

        open();
        setTimeout(() => this.$router.back(), 1000);
    } else
        return section.data;
}