import { useEffect, useState } from 'react';
import { getGifts } from './helpers/getGifts';
import { GiftItem } from './GiftItem';

export const GifGrid = ({ category}) => {
    console.log("Que quieres que te pinte??   "+ category);

    const [images, setImages] = useState([]);

    const getImages = async() => {
        const newImages = await getGifts(category);
        setImages(newImages);
    }

    useEffect (() => {
    console.log("¿Si me llama?");
       //getGifts (category)
       //.then (newImages => setImages(newImages));
        getImages();
    },[])

    return (
        <>
            <h3>
                {category}
            </h3>
            <div>
                {
                    images.map((card) => (
                        <GiftItem key={card.id} carta = {card}/>
                    ))
                }
               
            </div>
        </>
    )
}