export const GiftItem = ({carta}) => {
    return(
        <div className="card">
            <img src = {carta.url} alt = {carta.title}/>
            <p>{carta.title}</p>
        </div>
    )

}