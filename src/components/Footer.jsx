import fb from '../assets/fb.png'
import yt from '../assets/yt.png'
import twitter from '../assets/twitter.png'

function Footer() {
  return (
    <div className='w-full bg-black h-auto p-24 mt-16 bg-opacity-95 flex flex-col items-center justify-center'>
        <div className='flex items-center'>
            <a href="https://www.facebook.com/nike" target='_blank'>
                <img src={fb} alt="fb" className="w-10 h-10 m-4"/>
            </a>
            <a href="https://www.youtube.com/user/nike" target='_blank'>
                <img src={yt} alt="fb" className="w-10 h-10 m-4"/>
            </a>
            <a href="https://twitter.com/Nike" target='_blank'>
                <img src={twitter} alt="fb" className="w-10 h-10 m-4"/>
            </a>
        </div>
        <div>
            <p className='text-white font-medium m-4'>© 2021 Nike. All Rights Reserved.</p>
        </div>
    </div>
  )
}

export default Footer
