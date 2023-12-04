import React from "react";
import "./Product.css";
import { useStateValue } from './StateProvider';

function Product({ id, title, price, image, rating }) {
    const [{basket}, dispatch] = useStateValue();
    console.log("this is the basket", basket);

    const addToBasket = () => {
        // Dispatch some action into the data layer
        dispatch({
            type: "ADD_TO_BASKET",
            item: {
                id: id,
                title: title,
                image: image,
                price: price,
                rating: rating,
            },
        });
    };

    return (
        <div className="product">
            <div className="product_info">
                <p>{title}</p>
                <p className="product-price">
                    <small>$</small>
                    <strong>{price}</strong>
                </p>
                <div className="product_rating">
                    {Array(rating)
                        .fill()
                        .map((_, i) => (
                            <p key={i}>🌟</p>
                        ))}
                </div>
            </div>

            <img src={image} style={{ height: '250px' }} alt="book" />

            <button onClick={addToBasket}>Add to Basket</button>
        </div>
    );
}

export default Product;
