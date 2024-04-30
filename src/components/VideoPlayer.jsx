import ReactPlayer from 'react-player';
import vid from '../assets/video.webm';

function Player() {
  return (
    <div className="App">
      <ReactPlayer
        url={vid}
        playing={true}
        loop={true}
        muted={true}
        controls={false} // Disables player controls
        playsinline={true} // Ensures video plays inline on supported devices
        config={{
          file: {
            attributes: {
              controlsList: 'nodownload', // Prevents download option
              disablePictureInPicture: true, // Prevents Picture-in-Picture mode
            },
          },
        }}
        width="300px"
        height="300px"
      />
    </div>
  );
}

export default Player;
