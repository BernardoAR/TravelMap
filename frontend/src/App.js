import { useEffect, useState } from 'react';
import ReactMapGL, { Marker, Popup } from 'react-map-gl';
import { Room, Star } from '@material-ui/icons';
import { format } from 'timeago.js';
import './App.css';
import axios from 'axios';
function App() {
  const currentUser = 'bernardo';
  const [pins, setPins] = useState([]);
  const [currentPlaceId, setCurrentPlaceId] = useState(null);
  const [viewport, setViewport] = useState({
    width: '100vw',
    height: '100vh',
    latitude: 48.858093,
    longitude: 2.294694,
    zoom: 8,
  });
  useEffect(() => {
    const getPins = async () => {
      try {
        const res = await axios.get('/pins');
        setPins(res.data);
      } catch (err) {
        console.log(err.message);
      }
    };
    getPins();
  }, []);
  const handleMarkerClick = (id) => {
    setCurrentPlaceId(id);
  };
  return (
    <div className='App'>
      <ReactMapGL
        {...viewport}
        onViewportChange={(nextViewport) => setViewport(nextViewport)}
        mapboxApiAccessToken={process.env.REACT_APP_MAPBOX}
        mapStyle='mapbox://styles/safak/cknndpyfq268f17p53nmpwira'
      >
        {pins.map((p) => (
          <>
            <Marker latitude={p.lat} longitude={p.long} offsetLeft={-20} offsetTop={-10}>
              <Room
                style={{
                  fontSize: viewport.zoom * 5,
                  color: p.username === currentUser ? 'red' : 'slateblue',
                  cursos: 'pointer',
                }}
                onClick={() => handleMarkerClick(p._id)}
              />
            </Marker>
            {p._id === currentPlaceId && (
              <Popup
                latitude={p.lat}
                longitude={p.long}
                onClose={() => setCurrentPlaceId(null)}
                closeButton={true}
                closeOnClick={false}
                anchor='bottom'
              >
                <div className='card'>
                  <label>Place</label>
                  <h4 className='place'>{p.title}</h4>
                  <label>Review</label>
                  <p className='desc'>{p.desc}</p>
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
                    Created by <b>{p.username}</b>
                  </span>
                  <span className='date'>{format(p.createdAt)}</span>
                </div>
              </Popup>
            )}
          </>
        ))}
        ;
      </ReactMapGL>
    </div>
  );
}

export default App;
