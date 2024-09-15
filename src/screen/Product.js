import React, { useState } from 'react';
import { Table, Button, Modal, Form } from 'react-bootstrap';

const ProductTable = () => {
  const [showForm, setShowForm] = useState(false);
  const [products, setProducts] = useState([
    {
      id: 1,
      name: 'Product A',
      level: 'bonze',
      ratio: '10  : 15 ',
      price: '$15.00',
      image: 'https://via.placeholder.com/100',
    },
    {
      id: 2,
      name: 'Product B',
      level: 'silver',
      ratio: '15 : 20',
      price: '$20.00',
      image: 'https://via.placeholder.com/100',
    },
  ]);

  const [newProduct, setNewProduct] = useState({
    name: '',
    level: '',
    ratio: '',
    profit: '',
    price: '',
    image: '',
  });

  const handleShowForm = () => setShowForm(true);
  const handleCloseForm = () => setShowForm(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProduct((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAddProduct = () => {
    setProducts((prev) => [
      ...prev,
      { ...newProduct, id: prev.length + 1 },
    ]);
    setNewProduct({
      name: '',
      level: '',
      ratio: '',
      price: '',
      image: '',
    });
    handleCloseForm();
  };

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between mb-3">
        <h2>Product Table</h2>
        <Button variant="primary" onClick={handleShowForm}>
          Add Product
        </Button>
      </div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>S. No.</th>
            <th>Product Name</th>
            <th>Level</th>
            <th>price Ratio</th>
            <th>Price</th>
            <th>Profit</th>
            <th>Image</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product, index) => (
            <tr key={product.id}>
              <td>{index + 1}</td>
              <td>{product.name}</td>
              <td>{product.level}</td>
              <td>{product.ratio}</td>
              <td>{product.price}</td>
              <td>Usdt 0.323</td>
              <td>
                <img src={product.image} alt={product.name} style={{ width: '100px' }} />
              </td>
              <td>
                <Button variant="warning" size="sm" className="me-2">
                  Edit
                </Button>
                <Button variant="danger" size="sm">
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Add Product Form Modal */}
      <Modal show={showForm} onHide={handleCloseForm}>
        <Modal.Header closeButton>
          <Modal.Title>Add New Product</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="formProductName">
              <Form.Label>Product Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter product name"
                name="name"
                value={newProduct.name}
                onChange={handleInputChange}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formLevel">
              <Form.Label>Level</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter level"
                name="level"
                value={newProduct.level}
                onChange={handleInputChange}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formRatio">
              <Form.Label>Ratio Between</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter ratio"
                name="ratio"
                value={newProduct.ratio}
                onChange={handleInputChange}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formPrice">
              <Form.Label>Price</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter price"
                name="price"
                value={newProduct.price}
                onChange={handleInputChange}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formImage">
              <Form.Label>Image URL</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter image URL"
                name="image"
                value={newProduct.image}
                onChange={handleInputChange}
              />
            </Form.Group>

            <Button variant="primary" onClick={handleAddProduct}>
              Add Product
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default ProductTable;
