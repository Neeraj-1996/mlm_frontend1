import React, { useState } from 'react';
import { Table, Button, Modal, Form } from 'react-bootstrap';

const CountryTable = () => {
  const [showForm, setShowForm] = useState(false);
  const [countries, setCountries] = useState([
    {
      id: 1,
      name: 'United States',
      code: 'US',
      flag: 'https://flagcdn.com/w320/us.png', // Example flag image
    },
    {
      id: 2,
      name: 'Canada',
      code: 'CA',
      flag: 'https://flagcdn.com/w320/ca.png', // Example flag image
    },
  ]);

  const [newCountry, setNewCountry] = useState({
    id: null,
    name: '',
    code: '',
    flag: '',
  });

  const [isEditing, setIsEditing] = useState(false);

  const handleShowForm = (country = null) => {
    if (country) {
      // If a country is passed, populate the form with its data for editing
      setNewCountry({ ...country });
      setIsEditing(true);
    } else {
      // If no country is passed, prepare the form for adding a new country
      setNewCountry({
        id: null,
        name: '',
        code: '',
        flag: '',
      });
      setIsEditing(false);
    }
    setShowForm(true);
  };

  const handleCloseForm = () => setShowForm(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewCountry((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSaveCountry = () => {
    if (isEditing) {
      // Update existing country
      setCountries((prev) =>
        prev.map((country) =>
          country.id === newCountry.id ? { ...newCountry } : country
        )
      );
    } else {
      // Add new country
      setCountries((prev) => [
        ...prev,
        { ...newCountry, id: prev.length + 1 },
      ]);
    }
    setNewCountry({
      id: null,
      name: '',
      code: '',
      flag: '',
    });
    handleCloseForm();
  };

  const handleDeleteCountry = (id) => {
    setCountries((prev) => prev.filter((country) => country.id !== id));
  };

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between mb-3">
        <h2>Country Code Table</h2>
        <Button variant="primary" onClick={() => handleShowForm()}>
          Add Country
        </Button>
      </div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>S. No.</th>
            <th>Country Name</th>
            <th>Code</th>
            <th>Flag</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {countries.map((country, index) => (
            <tr key={country.id}>
              <td>{index + 1}</td>
              <td>{country.name}</td>
              <td>{country.code}</td>
              <td>
                <img src={country.flag} alt={country.name} style={{ width: '50px' }} />
              </td>
              <td>
                <Button
                  variant="warning"
                  size="sm"
                  className="me-2"
                  onClick={() => handleShowForm(country)}
                >
                  Edit
                </Button>
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => handleDeleteCountry(country.id)}
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Add/Edit Country Form Modal */}
      <Modal show={showForm} onHide={handleCloseForm}>
        <Modal.Header closeButton>
          <Modal.Title>{isEditing ? 'Edit Country' : 'Add New Country'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="formCountryName">
              <Form.Label>Country Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter country name"
                name="name"
                value={newCountry.name}
                onChange={handleInputChange}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formCode">
              <Form.Label>Country Code</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter country code"
                name="code"
                value={newCountry.code}
                onChange={handleInputChange}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formFlag">
              <Form.Label>Flag URL</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter flag image URL"
                name="flag"
                value={newCountry.flag}
                onChange={handleInputChange}
              />
            </Form.Group>

            <Button variant="primary" onClick={handleSaveCountry}>
              {isEditing ? 'Save Changes' : 'Add Country'}
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default CountryTable;
