import Navbar from "../components/Navbar";
import SideBar from "../components/SideBar";
import testImg from '../assets/test.jpg';
import testImg2 from '../assets/test2.jfif';
import ProductCard from "../components/ProductCard";
import Footer from "../components/Footer";

const products = [
    {
        _id: "1",
        name: 'Air Jordan 1',
        type: 'Casual',
        mainImage: testImg,
        image1: testImg2,
        price: 2000,
        sex: 'men',
        tag:'bestseller',
        stock: 10,
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam nec purus nec nunc tincidunt ultricies nec nec nunc. Nullam nec purus nec nunc tincidunt ultricies nec nec nunc. Nullam nec purus nec nunc tincidunt ultricies nec nec nunc.'
    },
    {
        _id: "2",
        name: 'Air Jordan 1',
        type: 'Casual',
        mainImage: testImg,
        image1: testImg2,
        price: 2000,
        sex: 'men',
        tag:'bestseller',
        stock: 10,
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam nec purus nec nunc tincidunt ultricies nec nec nunc. Nullam nec purus nec nunc tincidunt ultricies nec nec nunc. Nullam nec purus nec nunc tincidunt ultricies nec nec nunc.'
    },
    {
        _id: "3",
        name: 'Air Jordan 1',
        type: 'Casual',
        mainImage: testImg,
        image1: testImg2,
        price: 2000,
        sex: 'men',
        tag:'bestseller',
        stock: 10,
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam nec purus nec nunc tincidunt ultricies nec nec nunc. Nullam nec purus nec nunc tincidunt ultricies nec nec nunc. Nullam nec purus nec nunc tincidunt ultricies nec nec nunc.'
    },
    {
        _id: "4",
        name: 'Air Jordan 1',
        type: 'Casual',
        mainImage: testImg,
        image1: testImg2,
        price: 2000,
        sex: 'men',
        tag:'bestseller',
        stock: 10,
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam nec purus nec nunc tincidunt ultricies nec nec nunc. Nullam nec purus nec nunc tincidunt ultricies nec nec nunc. Nullam nec purus nec nunc tincidunt ultricies nec nec nunc.'
    },
    {
        _id: "5",
        name: 'Air Jordan 1',
        type: 'Casual',
        mainImage: testImg,
        image1: testImg2,
        price: 2000,
        sex: 'men',
        tag:'bestseller',
        stock: 10,
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam nec purus nec nunc tincidunt ultricies nec nec nunc. Nullam nec purus nec nunc tincidunt ultricies nec nec nunc. Nullam nec purus nec nunc tincidunt ultricies nec nec nunc.'
    },
]


const Products = () => {
   
    return (
        <main>
            <Navbar type="products"/>
            <div className="flex w-full mt-16">
                
                <SideBar/>
                <div className="w-4/5 flex-grow ">
                    {
                        products.length == 0 && <h1>No products found</h1>
                    }
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 p-8">
                        {
                            products.map((product, index) => (
                                <ProductCard product={product} key={index}/>
                            ))
                        }
                    </div>

                </div>  
            </div>   
            <Footer/>
        </main>
    );
    }

    export default Products;