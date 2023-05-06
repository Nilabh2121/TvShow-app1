import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Card, Button, Modal, Form } from 'react-bootstrap';
import './Details.css'

const Details = () => {
  const { id } = useParams();
  const [show, setShow] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    Name:   '',
    Email:   '',
    Movie:   '',
    Showtime:   ''
  });

  useEffect(() => {
    fetch(`https://api.tvmaze.com/shows/${id}`)
      .then(response => response.json())
      .then(data => setShow(data))
      .catch(error => console.log(error))
  }, [id]);

  const handleFormChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  }

  const handleFormSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem('user', JSON.stringify(formData));
    setShowModal(true);
  }

  const handleBookTicket = () => {
    setFormData({
      ...formData,
      movie: show.name
    });
    setShowModal(true);
  }

  return (
    <>
      {show &&
        <div className="container1 mt-5">
          <h1>{show.name}</h1>
          <div className="row">
            <div className="grid-layer col-md-4 mb-4">
              <Card className='card'>
                <Card.Img variant="top" src={show.image.medium} />
                <Card.Body>
                  <Card.Text><strong>Language:</strong> {show.language}</Card.Text>
                  <Card.Text><strong>Genres:</strong> {show.genres.join(', ')}</Card.Text>
                  <Button className='m-button1' variant ="Primary" onClick={handleBookTicket}>Book Tickets</Button>
                </Card.Body>
              </Card>
            </div>
            <Card className='card1'>
              <p>{show.summary.replace(/<[^>]+>/g, '')}</p>
            </Card>
          </div>
        </div>
      }

      
      <Modal className='card2' show={showModal} onHide={() => setShowModal(true)}>
        <Modal.Header closeButton>
          <Modal.Title>Book Ticket</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form className='form' onSubmit={handleFormSubmit}>
            <Form.Group controlId="formName">
              <Form.Label>Name</Form.Label>
              <Form.Control type="text" name="name" value={formData.name} onChange={handleFormChange} required />
            </Form.Group>
            <Form.Group controlId="formEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" name="email" value={formData.email} onChange={handleFormChange} required />
            </Form.Group>
            <Form.Group controlId="formMovie">
              <Form.Label>Movie</Form.Label>
              <Form.Control type="text" name="movie" value={formData.movie} readOnly />
            </Form.Group>
            <Form.Group controlId="formShowtime">
              <Form.Label>Showtime</Form.Label>
              <Form.Control type="text" name="showtime" value={formData.showtime} onChange={handleFormChange} />
            </Form.Group>
            <Button  className='m-button3'variant="primary" type="submit">Submit</Button>
          </Form>
        </Modal.Body>
      </Modal>
      
    </>
  );
}

export default Details;
