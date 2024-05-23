import Navbar from "../components/Navbar";
import SideBar from "../components/SideBar";
import testImg from '../assets/test.jpg';
import testImg2 from '../assets/test2.jfif';
import ProductCard from "../components/ProductCard";
import Footer from "../components/Footer";
import API_URL from "../constants/api";
import { useEffect, useState } from "react";
import { useParams,useLocation } from "react-router-dom";

// const products = [
//     {
//         _id: "1",
//         name: 'Air Jordan 1',
//         type: 'Casual',
//         mainImage: testImg,
//         image1: testImg2,
//         price: 2000,
//         sex: 'men',
//         tag:'bestseller',
//         stock: 10,
//         description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam nec purus nec nunc tincidunt ultricies nec nec nunc. Nullam nec purus nec nunc tincidunt ultricies nec nec nunc. Nullam nec purus nec nunc tincidunt ultricies nec nec nunc.'
//     },
//     {
//         _id: "2",
//         name: 'Air Jordan 1',
//         type: 'Casual',
//         mainImage: testImg,
//         image1: testImg2,
//         price: 2000,
//         sex: 'men',
//         tag:'bestseller',
//         stock: 10,
//         description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam nec purus nec nunc tincidunt ultricies nec nec nunc. Nullam nec purus nec nunc tincidunt ultricies nec nec nunc. Nullam nec purus nec nunc tincidunt ultricies nec nec nunc.'
//     },
//     {
//         _id: "3",
//         name: 'Air Jordan 1',
//         type: 'Casual',
//         mainImage: testImg,
//         image1: testImg2,
//         price: 2000,
//         sex: 'men',
//         tag:'bestseller',
//         stock: 10,
//         description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam nec purus nec nunc tincidunt ultricies nec nec nunc. Nullam nec purus nec nunc tincidunt ultricies nec nec nunc. Nullam nec purus nec nunc tincidunt ultricies nec nec nunc.'
//     },
//     {
//         _id: "4",
//         name: 'Air Jordan 1',
//         type: 'Casual',
//         mainImage: testImg,
//         image1: testImg2,
//         price: 2000,
//         sex: 'men',
//         tag:'bestseller',
//         stock: 10,
//         description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam nec purus nec nunc tincidunt ultricies nec nec nunc. Nullam nec purus nec nunc tincidunt ultricies nec nec nunc. Nullam nec purus nec nunc tincidunt ultricies nec nec nunc.'
//     },
//     {
//         _id: "5",
//         name: 'Air Jordan 1',
//         type: 'Casual',
//         mainImage: testImg,
//         image1: testImg2,
//         price: 2000,
//         sex: 'men',
//         tag:'bestseller',
//         stock: 10,
//         description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam nec purus nec nunc tincidunt ultricies nec nec nunc. Nullam nec purus nec nunc tincidunt ultricies nec nec nunc. Nullam nec purus nec nunc tincidunt ultricies nec nec nunc.'
//     },
// ]


const Products = () => {
    const [products, setProducts] = useState([]);
    const [sortValue, setSortValue] = useState('price');
    const [sortDirection, setSortDirection] = useState('asc');
    const xhr = new XMLHttpRequest();

    const location = useLocation();

    const sortProducts = (a, b) => {
        if (sortValue === 'price') {
            return sortDirection === 'asc' ? a.price - b.price : b.price - a.price;
        } else if (sortValue === 'name') {
            return sortDirection === 'asc' ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name);
        }
    };

    const handleSortChange = (event) => {
        setSortValue(event.target.value);
    };

    const handleSortDirectionChange = (event) => {
        setSortDirection(event.target.value);
    };


    const fetchProducts = async () => {
        console.log(location);
        const urlParams = new URLSearchParams(location.search).toString();
        xhr.open('GET', `${API_URL}product/all-client?${urlParams}`, true);
        xhr.send();
        xhr.onload = () => {
            if (xhr.status === 200) {
                let data = JSON.parse(xhr.responseText);
                let sortedData = data.data.sort(sortProducts);
                setProducts(sortedData);
            } else {
                console.error(`Error ${xhr.status}: ${xhr.statusText}`);
            }
        };
    };

    useEffect(() => {
        fetchProducts();
        console.log(location.search)
    }, [location]);

    useEffect(() => {
        setProducts(prevProducts => [...prevProducts].sort(sortProducts));
    }, [sortValue, sortDirection]);

    return (
        <main>
            <Navbar type="products"/>
            <div className="flex w-full mt-16">
                <SideBar />
                <div className="w-4/5 ">
                    <div className="px-8">
                        <label htmlFor="sortValue">
                            Sort By:
                        </label>
                        <select name="sortValue" id="sortValue" className="p-2" value={sortValue} onChange={handleSortChange}>
                            <option value="price">Price</option>
                            <option value="name">Name</option>
                        </select>
                        <label htmlFor="sortDirection" className="ml-4">
                            Order:
                        </label>
                        <select name="sortDirection" id="sortDirection" className="p-2" value={sortDirection} onChange={handleSortDirectionChange}>
                            <option value="asc">Ascending</option>
                            <option value="desc">Descending</option>
                        </select>
                    </div>
                    <div className="flex-grow">
                        {
                            products.length === 0 ? <h1 className="p-8">No products found</h1> :
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 p-8">
                                {
                                    products.map((product, index) => (
                                        <ProductCard product={product} key={index}/>
                                    ))
                                }
                            </div>
                        }
                    </div> 
                </div>
 
            </div>   
            <Footer/>
        </main>
    );
};
    export default Products;