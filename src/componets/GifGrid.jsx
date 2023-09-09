import { GiftItem } from './GiftItem';
import { useFetchGifs } from '../hooks/useFetchGifs';


export const GifGrid = ({ category}) => {
    //Se implementa un CustomHook
    const { images, isLoading } = useFetchGifs ( category );
    return (
        <>
            <h3>
                {category}
            </h3>
                {isLoading ? (<h2>Cargando... </h2>) : null}         
                
            
            <div className='card-grid'>
                {
                    images.map((card) => (
                        <GiftItem key={card.id} carta = {card}/>
                    ))
                }
               
            </div>
        </>
    )
}