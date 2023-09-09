import { useEffect, useState } from "react";
import { getGifts } from "../componets/helpers/getGifts";


export const useFetchGifs = (category) => {
    console.log("useFecthGifs Varias")
    const [images, setImages] = useState([]);
    const [isLoading, setIsLoading] = useState (true);
   

    const getImages = async() => {
        console.log("useFecthGifs Async")
        const newImages = await getGifts(category); 
        setImages(newImages);
        setIsLoading(false);
    }

    useEffect (() => {
        getImages();
    },[])


    return {
        images,
        isLoading
    }
}
