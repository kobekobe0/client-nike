import Navbar from "../components/Navbar";
import Slogan from "../components/Slogan";
import banner from "../assets/banner1.jpg";
import Ad1 from "../components/Ad1";
import test from "../assets/giphy2.gif";

import Footer from "../components/Footer";
import Spotlight from "../components/Spotlight";
import Ad2 from "../components/Ad2";

const Home = () => {
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


            <Spotlight/>

            <Footer/>
        </main>
    );
    }

    export default Home;