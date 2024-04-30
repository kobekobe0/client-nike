import { Link } from "react-router-dom"
function Ad2() {
  return (
            <div className="flex flex-col items-center justify-center p-8 text-center">
                <h6 className="font-sans font-extrabold m-4 text-6xl tracking-tighter">OWN YOUR SUMMER <br/> IN STYLE</h6>
                <p className="text-md m-4 font-medium">Possibilities are in the air - inspiring you to make the most of the sunshine. Brave the heat in these effortlessly cool shoes.</p>
                <Link to='/products'>
                    <button className="bg-black text-white p-4 font-medium rounded-full m-4">Shop Now</button>
                </Link>
            </div>
  )
}

export default Ad2
