import { useAuth } from '../contexts/AuthContext'
import { Card, ListGroup, ProgressBar } from "react-bootstrap"
import phone from "../images/phone.png"
import watch from "../images/watch.png"
import pods from "../images/pods.png"

import { connect } from 'react-redux';
import { setPhoneBattery, setWatchBattery, setPodsBattery } from '../redux/actions';

import { useEffect, useState } from 'react'


const generateRandomStorageValue = () => {
  return {
    success: Math.floor(Math.random() * 21) + 30,
    warning: Math.floor(Math.random() * 21) + 10,
    danger: Math.floor(Math.random() * 16) + 5,
  };
};

const Dashboard = ({ phoneBattery, watchBattery, podsBattery, setPhoneBattery, setWatchBattery, setPodsBattery, isVisible }) => {
  const { currentUser } = useAuth()

  useEffect(() => {
    // Function to update battery levels every second
    const updateBatteryLevels = () => {
      // Use Math.max to ensure the battery doesn't go below 0
      const updatedPhoneBattery = Math.max(phoneBattery - 1, 0);
      const updatedWatchBattery = Math.max(watchBattery - 1, 0);
      const updatedPodsBattery = Math.max(podsBattery - 1, 0);

      setPhoneBattery(updatedPhoneBattery);
      setWatchBattery(updatedWatchBattery);
      setPodsBattery(updatedPodsBattery);
    };

    // Set up interval to update battery levels every second
    const intervalId = setInterval(updateBatteryLevels, 1000);

    // Clear the interval when the component is unmounted
    return () => clearInterval(intervalId);
  }, [phoneBattery, watchBattery, podsBattery, setPhoneBattery, setWatchBattery, setPodsBattery]);

  const [storageValues] = useState(generateRandomStorageValue());

  if (!isVisible) {
    return null;
  }

  return (
    <>
      <div className='mb-5' style={{ textAlign: 'center' }}>
        <h2><strong>Welcome, {currentUser.email.split('@')[0]}!</strong></h2>
        <h5>Your devices</h5>
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
    </>
    
  );
}

const mapStateToProps = (state) => ({
  phoneBattery: state.phoneBattery,
  watchBattery: state.watchBattery,
  podsBattery: state.podsBattery,
});

const mapDispatchToProps = {
  setPhoneBattery,
  setWatchBattery,
  setPodsBattery,
};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);