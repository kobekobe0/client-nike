import Navbar from "../components/Navbar";
import Slogan from "../components/Slogan";
import banner from "../assets/banner1.jpg";
import Ad1 from "../components/Ad1";
import test from "../assets/giphy2.gif";

import Footer from "../components/Footer";
import Spotlight from "../components/Spotlight";
import Ad2 from "../components/Ad2";
import { useEffect, useState } from "react";
import API_URL from "../constants/api";

const Home = () => {
    const [featured, setFeatured] = useState([]);
    const xhr = new XMLHttpRequest();
    const fetchFeatured = async () => {
        xhr.open('GET', `${API_URL}product/products-query?tag=featured&limit=3`, true);
        xhr.send();
        xhr.onload = () => {
            if (xhr.status === 200) {
                let data = JSON.parse(xhr.responseText);
                setFeatured(data.data);
            }
        }
    }

    const fetchTags = async () => {
        // get tags from xml file
        return
    }

    useEffect(() => {
        fetchFeatured();
        //fetchTags();
    }, []);
    return (
        <main>
            <Navbar/>
            <Slogan/>
            <div className="w-100 flex items-center justify-center">
                <img src={banner} alt="banner" className="w-11/12 object-contain"/>
            </div>
            <Ad1/>
            <div className="w-100 h-5/6 flex items-center justify-center">
                <img src={test} alt="gif" className="w-11/12 h-5/6 object-cover" />
            </div>
            <Ad2/>


            <Spotlight featured={featured}/>

            <Footer/>
        </main>
    );
    }

    export default Home;