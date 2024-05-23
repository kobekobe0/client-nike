import { Link } from "react-router-dom";
import { useState } from "react";

const ProductCard = ({ product, index }) => {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <Link 
            to={`/products/${product._id}`} 
            className="flex flex-col gap-4 mb-4 relative cursor-pointer"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <div key={index} className="flex flex-col gap-4 mb-4 relative cursor-pointer">
                <div className="relative h-96">
                    <img 
                        src={product.mainImage} 
                        alt={product.name} 
                        className={`w-full h-full object-cover absolute transition-opacity duration-500 ease-in-out ${isHovered ? 'opacity-0' : 'opacity-100'}`}
                    />
                    <img 
                        src={product.image1} 
                        alt={product.name} 
                        className={`w-full h-full object-cover absolute transition-opacity duration-500 ease-in-out ${isHovered ? 'opacity-100' : 'opacity-0'}`}
                    />
                </div>
                <div>
                    <h1 className="font-medium">{product.name}</h1>
                    <p className="font-medium text-gray-500">{product.sex}'s {product.type} shoes</p>
                    <p className="font-medium text-black text-lg">₱ {product.price}</p>
                </div>
            </div>
        </Link>
    )
}

export default ProductCard;