const Item = (props) => {
    return (
        <>
        <div>
            {props.item.name}
        </div>
        <div>{props.item.quantity}</div>
        </>
    )
}

export default Item;