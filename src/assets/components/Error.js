import { useModal } from "vue-final-modal"
import Toast from "./Toast.vue"

export const Error = (msg) => {
    const {open, close} = useModal({
        component: Toast,
        attrs: {
            type: 'error',
            message: msg,
            subtext: 'Returning you back...',
        }
    });

    open();
    setTimeout(() => window.history.back(), 1000);
}