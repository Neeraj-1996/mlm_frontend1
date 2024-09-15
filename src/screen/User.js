import React, { useState } from 'react';
import { Table, Button, Modal, Form } from 'react-bootstrap';

const UserRecords = () => {
  // Dummy data
  const users = [
    {
      id: 1,
      username: 'john_doe',
      email: 'john@example.com',
      mobile: '123-456-7890',
      shareId: 'SH123456',
      responderId: 'RSP123456',
      walletBalance: '$100.00',
      joiningDate: '2023-01-15',
    },
    {
      id: 2,
      username: 'jane_smith',
      email: 'jane@example.com',
      mobile: '987-654-3210',
      shareId: 'SH987654',
      responderId: 'RSP987654',
      walletBalance: '$250.00',
      joiningDate: '2023-02-20',
    },
  ];

  // State for modals
  const [showAddBalanceModal, setShowAddBalanceModal] = useState(false);
  const [showEditUserModal, setShowEditUserModal] = useState(false);

  // State for selected user
  const [selectedUser, setSelectedUser] = useState(null);

  const handleAddBalanceShow = (user) => {
    setSelectedUser(user);
    setShowAddBalanceModal(true);
  };

  const handleEditUserShow = (user) => {
    setSelectedUser(user);
    setShowEditUserModal(true);
  };

  const handleModalClose = () => {
    setShowAddBalanceModal(false);
    setShowEditUserModal(false);
    setSelectedUser(null);
  };

  const handleAddBalance = (e) => {
    e.preventDefault();
    // Implement add balance logic here
    console.log('Add balance for user:', selectedUser);
    handleModalClose();
  };

  const handleEditUser = (e) => {
    e.preventDefault();
    // Implement edit user logic here
    console.log('Edit user details:', selectedUser);
    handleModalClose();
  };

  return (
    <div className="container mt-4">
      <h2>User Records</h2>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>S. No.</th>
            <th>Username</th>
            <th>Email</th>
            <th>Mobile</th>
            <th>Share ID</th>
            <th>Responder ID</th>
            <th>Wallet Balance</th>
            <th>Add Wallet Balance</th>
            <th>Action</th>
            <th>Joining Date</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={user.id}>
              <td>{index + 1}</td>
              <td>{user.username}</td>
              <td>{user.email}</td>
              <td>{user.mobile}</td>
              <td>{user.shareId}</td>
              <td>{user.responderId}</td>
              <td>{user.walletBalance}</td>
              <td>
                <Button variant="success" size="sm" onClick={() => handleAddBalanceShow(user)}>
                  Add Balance
                </Button>
              </td>
              <td>
                <Button variant="primary" size="sm" onClick={() => handleEditUserShow(user)}>
                  Edit
                </Button>
                {' '}
                <Button variant="danger" size="sm">
                  Delete
                </Button>
              </td>
              <td>{user.joiningDate}</td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Add Balance Modal */}
      <Modal show={showAddBalanceModal} onHide={handleModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add Wallet Balance</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedUser && (
            <Form onSubmit={handleAddBalance}>
              <Form.Group controlId="formWalletAmount">
                <Form.Label>Amount</Form.Label>
                <Form.Control type="text" placeholder="Enter amount" required />
              </Form.Group>
              <Button variant="primary" type="submit">
                Add Balance
              </Button>
            </Form>
          )}
        </Modal.Body>
      </Modal>

      {/* Edit User Modal */}
      <Modal show={showEditUserModal} onHide={handleModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit User Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedUser && (
            <Form onSubmit={handleEditUser}>
              <Form.Group controlId="formUsername">
                <Form.Label>Username</Form.Label>
                <Form.Control
                  type="text"
                  defaultValue={selectedUser.username}
                  required
                />
              </Form.Group>
              <Form.Group controlId="formEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  defaultValue={selectedUser.email}
                  required
                />
              </Form.Group>
              <Form.Group controlId="formMobile">
                <Form.Label>Mobile</Form.Label>
                <Form.Control
                  type="text"
                  defaultValue={selectedUser.mobile}
                  required
                />
              </Form.Group>
              <Form.Group controlId="formShareId">
                <Form.Label>Share ID</Form.Label>
                <Form.Control
                  type="text"
                  defaultValue={selectedUser.shareId}
                  required
                />
              </Form.Group>
              <Form.Group controlId="formResponderId">
                <Form.Label>Responder ID</Form.Label>
                <Form.Control
                  type="text"
                  defaultValue={selectedUser.responderId}
                  required
                />
              </Form.Group>
              <Button variant="primary" type="submit">
                Save Changes
              </Button>
            </Form>
          )}
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default UserRecords;
