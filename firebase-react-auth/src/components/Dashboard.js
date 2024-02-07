import { useAuth } from '../contexts/AuthContext'
import { Card, ListGroup, ProgressBar } from "react-bootstrap"
import phone from "../images/phone.png"
import watch from "../images/watch.png"
import pods from "../images/pods.png"

import { useSelector, useDispatch } from 'react-redux';
import { setPhoneBattery, setWatchBattery, setPodsBattery } from '../redux/actions';

import { useEffect, useState } from 'react'

import FindMy from './FindMy'


const generateRandomStorageValue = () => {
  return {
    success: Math.floor(Math.random() * 21) + 30,
    warning: Math.floor(Math.random() * 21) + 10,
    danger: Math.floor(Math.random() * 16) + 5,
  };
};

const Dashboard = () => {
  const { currentUser } = useAuth()

  const phoneBattery = useSelector((state) => state.phoneBattery);
  const watchBattery = useSelector((state) => state.watchBattery);
  const podsBattery = useSelector((state) => state.podsBattery);
  const dispatch = useDispatch();

  useEffect(() => {
    const updateBatteryLevels = () => {
      const updatedPhoneBattery = Math.max(phoneBattery - 1, 0);
      const updatedWatchBattery = Math.max(watchBattery - 1, 0);
      const updatedPodsBattery = Math.max(podsBattery - 1, 0);

      dispatch(setPhoneBattery(updatedPhoneBattery));
      dispatch(setWatchBattery(updatedWatchBattery));
      dispatch(setPodsBattery(updatedPodsBattery));
    };

    const intervalId = setInterval(updateBatteryLevels, 1000);

    return () => clearInterval(intervalId);
  }, [phoneBattery, watchBattery, podsBattery, dispatch]);

  const [storageValues] = useState(generateRandomStorageValue());

  return (
    <>
      <div className='mt-5 mb-5' style={{ textAlign: 'center' }}>
        <h2><strong>Welcome, {currentUser.email.split('@')[0]}!</strong></h2>
        <h5 className='mt-3'>Your devices</h5>
      </div>
      <div className="d-flex justify-content-around" style={{ width: '1000px', margin: '0 -300px' }}>
        <Card style={{ width: '18rem' }}>
          <Card.Img variant="top" src={phone} style={{ width: '80px', height: '100px', margin: 'auto', marginTop: '10px' }} />
          <Card.Body>
            <Card.Title style={{textAlign: 'center' }}>iPhone</Card.Title>
            <Card.Text>
              {/* Some quick example text to build on the card title and make up the
              bulk of the card's content. */}
            </Card.Text>
          </Card.Body>
          <ListGroup className="list-group-flush">
            <ListGroup.Item>
              Battery
              <ProgressBar now={phoneBattery} label={`${phoneBattery}%`} />
            </ListGroup.Item>
            <ListGroup.Item>
              Storage
              <ProgressBar>
                <ProgressBar variant="success" now={storageValues.success} key={1} />
                <ProgressBar variant="warning" now={storageValues.warning} key={2} />
                <ProgressBar variant="danger" now={storageValues.danger} key={3} />
              </ProgressBar>
            </ListGroup.Item>
          </ListGroup>
        </Card>
        <Card style={{ width: '18rem' }}>
          <Card.Img variant="top" src={watch} style={{ width: '100px', height: '100px', margin: 'auto', marginTop: '10px' }} />
          <Card.Body>
            <Card.Title style={{ textAlign: 'center' }}>Apple Watch</Card.Title>
            <Card.Text>
              {/* Some quick example text to build on the card title and make up the
              bulk of the card's content. */}
            </Card.Text>
          </Card.Body>
          <ListGroup className="list-group-flush">
            <ListGroup.Item>Battery<ProgressBar now={watchBattery} label={`${watchBattery}%`} /></ListGroup.Item>
            <ListGroup.Item>
              <div>Status: <span style={{ color: watchBattery === 0 ? 'red' : 'black' }}>{watchBattery === 0 ? '● Disconnected' : '● Connected'}</span></div>
            </ListGroup.Item>
          </ListGroup>
        </Card>
        <Card style={{ width: '18rem' }}>
          <Card.Img variant="top" src={pods} style={{ width: '100px', height: '100px', margin: 'auto', marginTop: '10px' }} />
          <Card.Body>
            <Card.Title style={{ textAlign: 'center' }}>AirPods</Card.Title>
            <Card.Text>
              {/* Some quick example text to build on the card title and make up the
              bulk of the card's content. */}
            </Card.Text>
          </Card.Body>
          <ListGroup className="list-group-flush">
            <ListGroup.Item>Battery<ProgressBar now={podsBattery} label={`${podsBattery}%`} /></ListGroup.Item>
            <ListGroup.Item>
              <div>Status: <span style={{ color: podsBattery === 0 ? 'red' : 'black' }}>{podsBattery === 0 ? '● Disconnected' : '● Connected'}</span></div>
            </ListGroup.Item>
          </ListGroup>
        </Card>
        </div>
        <FindMy />
    </>
    
  );
}

export default Dashboard;