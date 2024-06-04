import axios from "axios";
import { useModal } from "vue-final-modal";
import Toast from "../components/common/Toast.vue";
import { errorToast, redirect } from "../components/common/common";
import { getAllArtworks } from "./artworkAPI";
import { editChecklist } from "./sectionAPI";

function compare( a, b ) {
    let x = a.id.toString(),
        y = b.id.toString();

    if ( x < y ){
        return -1;
    }

    if ( x > y ){
        return 1;
    }
    
    return 0;
}

export const predictArtwork = async (img) => {
    try {
        // convert image to file
        let fetchRes = await fetch(img);
        let blob = await fetchRes.blob();
        let file = new File([blob], 'image.jpg', {type: 'image/jpeg'});

        // create form data
        const formData = new FormData();
        formData.append('image', file);

        // predict image
        const response = await axios.post(import.meta.env.VITE_API_URL + "/artwork/predict", formData, {
            headers: {
                'x-api-key': import.meta.env.VITE_API_KEY,
                'Content-Type': 'multipart/form-data',
            }
        })

        // Object.entries(response.data).map(item => console.log(item))
        const prediction = Object.entries(response.data).find(item => parseFloat(item[1]) > 50);
        // console.log(prediction)

        if(prediction.length == 0) {
            errorToast('Cannot read image!', 'refresh');
            return
        } else if(prediction.length > 1) {
            prediction.sort((a, b) => parseFloat(a[1]) - parseFloat(b[1]));
        }

        // console.log(prediction[0])
        const idx = parseInt(prediction[0].replace("Class ", ""));
        // console.log(idx)

        // get art_id
        var artworks = await getAllArtworks();
        artworks.sort(compare);
        const art_id = artworks[idx].id;
        

        // mark as visited in checklist
        const res = await editChecklist({
            visit_id: null,
            art_id: art_id,
            visit_type: "scan",
            is_visited: true,
        })

        // view artwork
        if(res) {
            redirect('/view/' + art_id);
        }
    } catch(e) {
        errorToast('Cannot read image!', 'refresh');
    }
}