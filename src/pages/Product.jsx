import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import testImg from '../assets/test.jpg';
import testImg2 from '../assets/test2.jfif';
import testImg3 from '../assets/test3.jfif';
import testImg4 from '../assets/test4.jfif';
import testImg5 from '../assets/test5.jfif';
import { useState } from "react";
import ProductCard from "../components/ProductCard";
import Footer from "../components/Footer";
import ProductDetails from "../components/ProductDetails";
import Suggestion from "../components/Suggestion";

const product = {
    _id: "1",
    name: 'Air Jordan 1',
    type: 'Casual',
    mainImage: testImg,
    image1: testImg2,
    image2: testImg3,
    image3: testImg4,
    image4: testImg5,
    price: 2000,
    sex: 'men',
    tag:'bestseller',
    stock: 10,
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam nec purus nec nunc tincidunt ultricies nec nec nunc. Nullam nec purus nec nunc tincidunt ultricies nec nec nunc. Nullam nec purus nec nunc tincidunt ultricies nec nec nunc.'
}



const Product = () => {
    const {id} = useParams();
    //TODO: Function for fetching product details
    const [currentImage, setCurrentImage] = useState(product.mainImage) //load this from fetched data

    const [selectedSize, setSelectedSize] = useState('') //load this from fetched data

    return (
        <main>
            <Navbar />
            <ProductDetails product={product} currentImage={currentImage} setCurrentImage={setCurrentImage} selectedSize={selectedSize} setSelectedSize={setSelectedSize}/>
            <Suggestion products={[product, product, product]}/>
            <Footer/>
        </main>
    )
}

export default Product;