import { useState } from 'react';
import ReactMapGL, { Marker, Popup } from 'react-map-gl';
import { Room, Star } from '@material-ui/icons';
import './App.css';
function App() {
  const [viewport, setViewport] = useState({
    width: '100vw',
    height: '100vh',
    latitude: 48.858093,
    longitude: 2.294694,
    zoom: 8,
  });
  return (
    <div className='App'>
      <ReactMapGL
        {...viewport}
        onViewportChange={(nextViewport) => setViewport(nextViewport)}
        mapboxApiAccessToken={process.env.REACT_APP_MAPBOX}
        mapStyle='mapbox://styles/safak/cknndpyfq268f17p53nmpwira'
      >
        <Marker latitude={48.858093} longitude={2.294694} offsetLeft={-20} offsetTop={-10}>
          <Room style={{ fontSize: viewport.zoom * 5, color: 'red' }} />
        </Marker>
        {/* <Popup latitude={48.858093} longitude={2.294694} closeButton={true} closeOnClick={false} anchor='bottom'>
          <div className='card'>
            <label>Place</label>
            <h4 className='place'>Eiffell Tower</h4>
            <label>Review</label>
            <p className='desc'>Beautiful place. I like it.</p>
            <label>Rating</label>
            <div className='stars'>
              <Star className='star' />
              <Star className='star' />
              <Star className='star' />
              <Star className='star' />
              <Star className='star' />
            </div>
            <label>Information</label>
            <span className='username'>
              Created by <b>Bernardo</b>
            </span>
            <span className='date'>1 hour ago</span>
          </div>
        </Popup> */}
      </ReactMapGL>
    </div>
  );
}

export default App;
