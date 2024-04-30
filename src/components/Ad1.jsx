import { Link } from "react-router-dom"
function Ad1() {
  return (
            <div className="flex flex-col items-center justify-center p-8 text-center">
                <h4 className="text-md font-medium m-4">The next generation of Air technology is here.</h4>
                <h6 className="font-sans font-extrabold m-4 text-6xl tracking-tighter">AIR MAX DN <br/> TRIPLE BLACK</h6>
                <p className="text-md m-4 font-medium">Equiped with a revolutionary Dynamic Air Unit built to give you an energizing, reactive sensation with every step</p>
                <Link to='/products'>
                    <button className="bg-black text-white p-4 font-medium rounded-full m-4">Shop Now</button>
                </Link>
            </div>
  )
}

export default Ad1
