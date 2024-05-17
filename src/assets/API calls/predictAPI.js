import axios from "axios";
import { getAllArtworks, getArtwork } from "./artworkAPI";
import { editChecklist } from "./sectionAPI";
import { redirect } from "../components/common/common";

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
        const response = await axios.post(import.meta.env.VITE_PREDICT_URL, formData, {
            headers: {
                'Authorization': 'Bearer ' + import.meta.env.VITE_PREDICT_KEY,
                'Content-Type': 'multipart/form-data',
            }
        })

        const idx = response.data.preds[0];
        console.log(idx);

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
        console.error(e);
    }
}