import { Link } from "react-router-dom";

const ProductCard = ({ product, index }) => {
    return (
        <Link to={`/products/${product._id}`} className="flex flex-col gap-4 mb-16 relative cursor-pointer">
        <div key={index} className="flex flex-col gap-4 mb-16 relative cursor-pointer">
            <img 
                src={product.mainImage} 
                alt={product.name} 
                className="w-full h-auto object-cover absolute transition-opacity duration-500"
            />
            <img 
                src={product.image1} 
                alt={product.name} 
                className="w-full h-auto object-cover opacity-0 hover:opacity-100 transition-opacity duration-500"
            />
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