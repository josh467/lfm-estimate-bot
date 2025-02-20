import React, { useState } from 'react';
import { Form, Button, Container, Row, Col, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

function EstimateForm() {
  const [formData, setFormData] = useState({
    projectType: '',
    size: '',
    materials: '',
    location: ''
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const response = await fetch('/api/estimates', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(formData)
      });
      if (response.ok) {
        const result = await response.json();
        navigate('/dashboard', { state: { estimateId: result.id } });
      } else {
        throw new Error('Failed to create estimate');
      }
    } catch (err) {
      setError('Failed to create estimate. Please try again.');
    }
  };

  return (
    <Container>
      <Row className="justify-content-md-center mt-5">
        <Col xs={12} md={6}>
          <h2 className="text-center mb-4">Create New Estimate</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formProjectType">
              <Form.Label>Project Type</Form.Label>
              <Form.Control
                type="text"
                name="projectType"
                value={formData.projectType}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formSize">
              <Form.Label>Size (sq ft)</Form.Label>
              <Form.Control
                type="number"
                name="size"
                value={formData.size}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formMaterials">
              <Form.Label>Materials</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                name="materials"
                value={formData.materials}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formLocation">
              <Form.Label>Location</Form.Label>
              <Form.Control
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Button variant="primary" type="submit" className="w-100">
              Create Estimate
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

export default EstimateForm;
