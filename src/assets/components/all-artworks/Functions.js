export const isAscending = (arr, type) => {
    for(let i = 1; i < arr.length;i++) {
        if(arr[i][type].toLowerCase() < arr[i - 1][type].toLowerCase())
            return false
    }

    return true;
}

export const sortArt = (artworks, type) => {
    if(isAscending(artworks, type)) {
        artworks.sort((a, b) => {
            const typeA = a[type].toLowerCase();
            const typeB = b[type].toLowerCase();

            if(typeA < typeB)
                return 1;

            if(typeA > typeB)
                return -1;
            
            return 0;
        })
    } else {
        artworks.sort((a, b) => {
            const typeA = a[type].toLowerCase();
            const typeB = b[type].toLowerCase();

            if(typeA < typeB)
                return -1;

            if(typeA > typeB)
                return 1;
            
            return 0;
        })
    }

        // console.log(artworks)
        return artworks;
}