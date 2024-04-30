import { Link } from 'react-router-dom'

function Slogan() {
  return (
            <section className="flex flex-col items-center justify-center bg-gray-100 p-2">
                <h2 className="text-lg font-medium">
                    Move, Shop, Customize, & Celebrate With Us.
                </h2>
                <h3 className="text-sm">
                    No matter what you feel like doing today, it&apos;s better as a member.
                </h3>
                <Link to="/signup">
                    <p className="text-md underline font-medium">Join us</p>
                </Link>
            </section>
  )
}

export default Slogan
