import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import testImg from '../assets/test.jpg';
import testImg2 from '../assets/test2.jfif';
import testImg3 from '../assets/test3.jfif';
import testImg4 from '../assets/test4.jfif';
import testImg5 from '../assets/test5.jfif';
import { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import Footer from "../components/Footer";
import ProductDetails from "../components/ProductDetails";
import Suggestion from "../components/Suggestion";

import API_URL from "../constants/api";

// const product = {
//     _id: "1",
//     name: 'Air Jordan 1',
//     type: 'Casual',
//     mainImage: testImg,
//     image1: testImg2,
//     image2: testImg3,
//     image3: testImg4,
//     image4: testImg5,
//     price: 2000,
//     sex: 'men',
//     tag:'bestseller',
//     stock: 10,
//     description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam nec purus nec nunc tincidunt ultricies nec nec nunc. Nullam nec purus nec nunc tincidunt ultricies nec nec nunc. Nullam nec purus nec nunc tincidunt ultricies nec nec nunc.'
// }



const Product = () => {
    const {id} = useParams();
    const [product, setProduct] = useState({})

    const fetchProduct = async () => {
        const xhr = new XMLHttpRequest();
        xhr.open('GET', `${API_URL}product/product?id=${id}`, true);
        xhr.send();
        xhr.onload = () => {
            if (xhr.status === 200) {
                let data = JSON.parse(xhr.responseText);
                setProduct(data.data);
                console.log(data.data)
            }
        }
    }

    useEffect(() => {
        fetchProduct();
    }, [id])
    const [currentImage, setCurrentImage] = useState(product.mainImage) //load this from fetched data

    const [selectedSize, setSelectedSize] = useState('') //load this from fetched data

    const [featured, setFeatured] = useState([]);
    const fetchFeatured = async () => {
        const xhr = new XMLHttpRequest();
        xhr.open('GET', `${API_URL}product/products-query?tag=featured&limit=3`, true);
        xhr.send();
        xhr.onload = () => {
            if (xhr.status === 200) {
                let data = JSON.parse(xhr.responseText);
                setFeatured(data.data);
            }
        }
    }

useEffect(() => {
    fetchFeatured();
    //fetchTags();
}, []);

    return (
        <main>
            <Navbar />
            <ProductDetails product={product} currentImage={currentImage} setCurrentImage={setCurrentImage} selectedSize={selectedSize} setSelectedSize={setSelectedSize}/>
            <Suggestion products={featured}/>
            <Footer/>
        </main>
    )
}

export default Product;