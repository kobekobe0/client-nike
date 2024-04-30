import test from "../assets/test.jpg";
import { Link } from 'react-router-dom'
function Spotlight() {
  return (
                <div className="p-8 " >
                <h2 className="p-4 text-2xl">
                    Classic Spotlight
                </h2>
                <div className="flex gap-8 text-center">
                    <Link to='/products/:[id]'>
                    <div className="hover:bg-gray-200 cursor-pointer p-4 transition-all ease-in-out">
                        <img src={test} alt="test" />
                        <h6 className="font-sans font-extrabold m-4 text-6xl tracking-tighter">Air Jordan</h6>
                    </div>
                    </Link>
                    <div className="hover:bg-gray-200 cursor-pointer p-4 transition-all ease-in-out">
                        <img src={test} alt="test" />
                        <h6 className="font-sans font-extrabold m-4 text-6xl tracking-tighter">Air Jordan</h6>
                    </div>
                    <div className="hover:bg-gray-200 cursor-pointer p-4 transition-all ease-in-out">
                        <img src={test} alt="test" />
                        <h6 className="font-sans font-extrabold m-4 text-6xl tracking-tighter">Air Jordan</h6>
                    </div>
                </div>

            </div>
  )
}

export default Spotlight
