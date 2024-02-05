import { useAuth } from '../contexts/AuthContext'
import { Card, ListGroup, ProgressBar } from "react-bootstrap"
import phone from "../images/phone.png"
import watch from "../images/watch.png"
import pods from "../images/pods.png"


export default function Dashboard() {
  const { currentUser } = useAuth()
  const phoneBattery = Math.floor(Math.random() * 101)
  const podsBattery = Math.floor(Math.random() * 101)


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
                <ProgressBar variant="success" now={Math.floor(Math.random() * 21) + 30} key={1} />
                <ProgressBar variant="warning" now={Math.floor(Math.random() * 21) + 10} key={2} />
                <ProgressBar variant="danger" now={Math.floor(Math.random() * 16) + 5} key={3} />
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
            <ListGroup.Item>Battery<ProgressBar now={0} label={`${0}%`} /></ListGroup.Item>
            <ListGroup.Item>
              <div>Status: <span style={{ color: 'red' }}>● Disconnected</span></div>
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
              <div>Status: <span style={{ color: 'green' }}>● Connected</span></div>
            </ListGroup.Item>
          </ListGroup>
        </Card>
        </div>
    </>
    
  );
}