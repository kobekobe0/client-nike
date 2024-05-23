import test from "../assets/test.jpg";
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types';

function Spotlight({ featured }) {
    return (
        <div className="p-8">
            <h2 className="p-4 text-2xl">
                Classic Spotlight
            </h2>
            <div className="flex gap-8 text-center">
                {featured.map((item) => (
                    <Link key={item.id} to={`/products/${item._id}`}>
                        <div className="hover:bg-gray-200 cursor-pointer p-4 transition-all ease-in-out" key={item.id}>
                            <img src={item.mainImage} alt="test" />
                            <h6 className="font-sans font-extrabold m-4 text-6xl tracking-tighter">{item.name}</h6>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}

Spotlight.propTypes = {
    featured: PropTypes.arrayOf(
        PropTypes.shape({
            _id: PropTypes.string.isRequired,
            mainImage: PropTypes.string.isRequired,
            name: PropTypes.string.isRequired
        })
    ).isRequired
};

export default Spotlight;
