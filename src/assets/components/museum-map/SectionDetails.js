import { getArtworkVisits } from "@/assets/API calls/artworkAPI";
import { getSection } from "@/assets/API calls/sectionAPI";
import { getToken } from "../common/common";
import { getTraffic } from "@/assets/API calls/museumAPI";

export const getSectionDetails = async (sizes) => {
    let sections = [];

    // get traffic
    const traffic = await getTraffic();
    // console.log(traffic)

    // organize section
    const sect = await getSection(null, 'visitor');
    // console.log(sect);

    await Promise.all(sect.section.map(async (section) => {
        var obj = section;

        const visits = await getArtworkVisits(section.section_id, getToken('visitor'));
        obj.visited = visits.visited;
        obj.artworks = visits.artworks;
        obj.cols = sizes[section.section_id - 1].cols;
        obj.rows = sizes[section.section_id - 1].rows;
        obj.traffic = traffic.find(x => parseInt(x.section_id) === parseInt(section.section_id)).total_visits;

        sections.push(obj);
    }))

    // sort array by its section_id
    sections.sort((a, b) => a.section_id - b.section_id);

    // console.log(sections)
    return sections;
}