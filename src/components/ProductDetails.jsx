const sizes = ['7.5', '8', '8.5', '9', '9.5', '10', '10.5', '11', '11.5', '12', '12.5', '13']

const ProductDetails = ({ product, currentImage, setCurrentImage, selectedSize, setSelectedSize }) => {
    return (
        <div className="w-full flex flex-col justify-center items-center mt-12">
                <div className="w-full flex justify-center gap-4 px-36">
                    <div className="flex w-1/2 gap-4">
                        <ul className="flex flex-col gap-4 w-2/5">
                            <li onMouseEnter={() => setCurrentImage(product.mainImage)}><img src={product.mainImage} alt="main" className="w-16 h-16 object-cover rounded-lg cursor-pointer"/></li>
                            <li onMouseEnter={() => setCurrentImage(product.image1)}><img src={product.image1} alt="main" className="w-16 h-16 object-cover rounded-lg cursor-pointer"/></li>
                            <li onMouseEnter={() => setCurrentImage(product.image2)}><img src={product.image2} alt="main" className="w-16 h-16 object-cover rounded-lg cursor-pointer"/></li>
                            <li onMouseEnter={() => setCurrentImage(product.image3)}><img src={product.image3} alt="main" className="w-16 h-16 object-cover rounded-lg cursor-pointer"/></li>
                            <li onMouseEnter={() => setCurrentImage(product.image4)}><img src={product.image4} alt="main" className="w-16 h-16 object-cover rounded-lg cursor-pointer"/></li>
                        </ul>
                        <div>
                            <img src={currentImage} alt="main" className="w-full rounded-lg" />
                        </div>
                    </div>
                    <div className="flex w-1/2 px-28 flex-col">
                        <div>
                            <h2 className="text-3xl font-medium">{product.name}</h2>
                            <h3 className="text-lg font-medium text-gray-500">{product.sex}'s {product.type} shoes</h3>
                            <h3 className="text-xl my-4">₱ {product.price}</h3>
                        </div>
                        <div className="mt-2">
                            <h3 className="my-4">Size</h3>
                            <div className="grid grid-cols-3 gap-4">
                                {
                                    sizes.map(size => (
                                        <button key={size} className={`border border-gray-300 rounded-md p-2 ${selectedSize === size ? 'bg-black text-white' : ''}`} onClick={() => setSelectedSize(size)}>US {size}</button>
                                    ))
                                }
                            </div>
                        </div>
                        <div className="flex flex-col mt-8 gap-6">
                            <button className="rounded-full bg-black text-white text-xl py-4 bg-opacity-90">
                                Add to cart
                            </button>

                            
                            <button className="rounded-full border bg-white text-black text-xl py-4 border-black">
                                Order
                            </button>
                        </div>
                        <div className="mt-8 text-lg text-justify">
                            <p>{product.description}</p>
                        </div>
                    </div>
                    
                </div>
            </div>
    )
}

export default ProductDetails;