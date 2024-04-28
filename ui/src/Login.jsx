import React, { useState } from 'react';
import { Form, Button, Alert, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for redirection

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate(); // Initialize useNavigate

  const handleSubmit = (e) => {
    e.preventDefault();
    // Reset error state
    setError('');

    // Redirect based on username
    if (username === 'buyer') {
      navigate('/buyer'); // Redirect to the buyer page
      console.log('Redirected to Buyer page');
    } else if (username === 'designer') {
      navigate('/designer'); // Redirect to the designer page
      console.log('Redirected to Designer page');
    } else {
      setError('Invalid username');
    }
  };

  return (
    <div className="container mt-5">
      <Row className="justify-content-center">
        <Col md={6}>
          <div className="text-center">
            <h2>Login</h2>
          </div>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formUsername">
              <Form.Label>Username:</Form.Label>
              <Form.Control type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
            </Form.Group>
            <Form.Group controlId="formPassword">
              <Form.Label>Password:</Form.Label>
              <Form.Control type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            </Form.Group>
            <div className="text-center">
              <Button className='mt-3' variant="primary" type="submit">Login</Button>
            </div>
          </Form>
        </Col>
      </Row>
    </div>
  );
};

export default Login;