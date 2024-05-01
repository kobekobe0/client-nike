import ProductCard from "./ProductCard";

const Suggestion = ({products}) => {
    return (
        <div className="mx-24 mt-24">
            <h3 className="text-xl my-8">You Might Also Like</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {
                    products.map((product, index) => (
                        <ProductCard product={product} key={index}/>
                    ))
                }
            </div>
        </div>
    )
}

export default Suggestion;
