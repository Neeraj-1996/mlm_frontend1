import React, { useState } from 'react';
import { Table, Button, Modal, Form } from 'react-bootstrap';

const PlanTable = () => {
  const [showForm, setShowForm] = useState(false);
  const [plans, setPlans] = useState([
    {
      id: 1,
      title: 'Basic Plan',
      commission: '5%',
      price: '$10',
      image: 'https://via.placeholder.com/100', // Example image
    },
    {
      id: 2,
      title: 'Premium Plan',
      commission: '10%',
      price: '$20',
      image: 'https://via.placeholder.com/100', // Example image
    },
  ]);

  const [currentPlan, setCurrentPlan] = useState({
    id: null,
    title: '',
    commission: '',
    price: '',
    image: '',
  });

  const [isEditing, setIsEditing] = useState(false);

  const handleShowForm = (plan = null) => {
    if (plan) {
      // Populate the form with plan data for editing
      setCurrentPlan({ ...plan });
      setIsEditing(true);
    } else {
      // Prepare the form for adding a new plan
      setCurrentPlan({
        id: null,
        title: '',
        commission: '',
        price: '',
        image: '',
      });
      setIsEditing(false);
    }
    setShowForm(true);
  };

  const handleCloseForm = () => setShowForm(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentPlan((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSavePlan = () => {
    if (isEditing) {
      // Update existing plan
      setPlans((prev) =>
        prev.map((plan) =>
          plan.id === currentPlan.id ? { ...currentPlan } : plan
        )
      );
    } else {
      // Add new plan
      setPlans((prev) => [
        ...prev,
        { ...currentPlan, id: prev.length + 1 },
      ]);
    }
    setCurrentPlan({
      id: null,
      title: '',
      commission: '',
      price: '',
      image: '',
    });
    handleCloseForm();
  };

  const handleDeletePlan = (id) => {
    setPlans((prev) => prev.filter((plan) => plan.id !== id));
  };

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between mb-3">
        <h2>Manage Plans</h2>
        <Button variant="primary" onClick={() => handleShowForm()}>
          Add Plan
        </Button>
      </div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>S. No.</th>
            <th>Title</th>
            <th>Commission</th>
            <th>Price</th>
            <th>Image</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {plans.map((plan, index) => (
            <tr key={plan.id}>
              <td>{index + 1}</td>
              <td>{plan.title}</td>
              <td>{plan.commission}</td>
              <td>{plan.price}</td>
              <td>
                <img src={plan.image} alt={plan.title} style={{ width: '100px' }} />
              </td>
              <td>
                <Button
                  variant="warning"
                  size="sm"
                  className="me-2"
                  onClick={() => handleShowForm(plan)}
                >
                  Edit
                </Button>
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => handleDeletePlan(plan.id)}
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Add/Edit Plan Form Modal */}
      <Modal show={showForm} onHide={handleCloseForm}>
        <Modal.Header closeButton>
          <Modal.Title>{isEditing ? 'Edit Plan' : 'Add New Plan'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="formTitle">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter plan title"
                name="title"
                value={currentPlan.title}
                onChange={handleInputChange}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formCommission">
              <Form.Label>Commission</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter commission percentage"
                name="commission"
                value={currentPlan.commission}
                onChange={handleInputChange}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formPrice">
              <Form.Label>Price</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter plan price"
                name="price"
                value={currentPlan.price}
                onChange={handleInputChange}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formImage">
              <Form.Label>Image URL</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter image URL"
                name="image"
                value={currentPlan.image}
                onChange={handleInputChange}
              />
            </Form.Group>

            <Button variant="primary" onClick={handleSavePlan}>
              {isEditing ? 'Save Changes' : 'Add Plan'}
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default PlanTable;
