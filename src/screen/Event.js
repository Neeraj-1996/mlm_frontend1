import React, { useState } from 'react';
import { Table, Button, Modal, Form } from 'react-bootstrap';

const EventTable = () => {
  const [showForm, setShowForm] = useState(false);
  const [events, setEvents] = useState([
    {
      id: 1,
      title: 'Annual Company Picnic',
      startDate: '2024-09-01T12:00',
      endDate: '2024-09-01T18:00',
      description: 'A fun day for the whole company at the park.',
      image: 'https://via.placeholder.com/100', // Example image
    },
    {
      id: 2,
      title: 'Quarterly Business Review',
      startDate: '2024-10-15T09:00',
      endDate: '2024-10-15T17:00',
      description: 'Reviewing business performance and future goals.',
      image: 'https://via.placeholder.com/100', // Example image
    },
  ]);

  const [currentEvent, setCurrentEvent] = useState({
    id: null,
    title: '',
    startDate: '',
    endDate: '',
    description: '',
    image: '',
  });

  const [isEditing, setIsEditing] = useState(false);

  const handleShowForm = (event = null) => {
    if (event) {
      // Populate the form with event data for editing
      setCurrentEvent({ ...event });
      setIsEditing(true);
    } else {
      // Prepare the form for adding a new event
      setCurrentEvent({
        id: null,
        title: '',
        startDate: '',
        endDate: '',
        description: '',
        image: '',
      });
      setIsEditing(false);
    }
    setShowForm(true);
  };

  const handleCloseForm = () => setShowForm(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentEvent((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSaveEvent = () => {
    if (isEditing) {
      // Update existing event
      setEvents((prev) =>
        prev.map((event) =>
          event.id === currentEvent.id ? { ...currentEvent } : event
        )
      );
    } else {
      // Add new event
      setEvents((prev) => [
        ...prev,
        { ...currentEvent, id: prev.length + 1 },
      ]);
    }
    setCurrentEvent({
      id: null,
      title: '',
      startDate: '',
      endDate: '',
      description: '',
      image: '',
    });
    handleCloseForm();
  };

  const handleDeleteEvent = (id) => {
    setEvents((prev) => prev.filter((event) => event.id !== id));
  };

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between mb-3">
        <h2>Manage Events</h2>
        <Button variant="primary" onClick={() => handleShowForm()}>
          Add Event
        </Button>
      </div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>S. No.</th>
            <th>Title</th>
            <th>Start Date</th>
            <th>End Date</th>
            <th>Description</th>
            <th>Image</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {events.map((event, index) => (
            <tr key={event.id}>
              <td>{index + 1}</td>
              <td>{event.title}</td>
              <td>{new Date(event.startDate).toLocaleString()}</td>
              <td>{new Date(event.endDate).toLocaleString()}</td>
              <td>{event.description}</td>
              <td>
                <img src={event.image} alt={event.title} style={{ width: '100px' }} />
              </td>
              <td>
                <Button
                  variant="warning"
                  size="sm"
                  className="me-2"
                  onClick={() => handleShowForm(event)}
                >
                  Edit
                </Button>
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => handleDeleteEvent(event.id)}
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Add/Edit Event Form Modal */}
      <Modal show={showForm} onHide={handleCloseForm}>
        <Modal.Header closeButton>
          <Modal.Title>{isEditing ? 'Edit Event' : 'Add New Event'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="formTitle">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter event title"
                name="title"
                value={currentEvent.title}
                onChange={handleInputChange}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formStartDate">
              <Form.Label>Start Date</Form.Label>
              <Form.Control
                type="datetime-local"
                name="startDate"
                value={currentEvent.startDate}
                onChange={handleInputChange}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formEndDate">
              <Form.Label>End Date</Form.Label>
              <Form.Control
                type="datetime-local"
                name="endDate"
                value={currentEvent.endDate}
                onChange={handleInputChange}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formDescription">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Enter event description"
                name="description"
                value={currentEvent.description}
                onChange={handleInputChange}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formImage">
              <Form.Label>Image URL</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter image URL"
                name="image"
                value={currentEvent.image}
                onChange={handleInputChange}
              />
            </Form.Group>

            <Button variant="primary" onClick={handleSaveEvent}>
              {isEditing ? 'Save Changes' : 'Add Event'}
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default EventTable;
