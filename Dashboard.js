import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { useAuth } from '../contexts/AuthContext';
import { Link } from 'react-router-dom';

function Dashboard() {
  const { user } = useAuth();
  const [estimates, setEstimates] = useState([]);

  useEffect(() => {
    // Fetch estimates from API
    const fetchEstimates = async () => {
      try {
        const response = await fetch('/api/estimates', {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });
        if (response.ok) {
          const data = await response.json();
          setEstimates(data);
        } else {
          console.error('Failed to fetch estimates');
        }
      } catch (error) {
        console.error('Error fetching estimates:', error);
      }
    };

    fetchEstimates();
  }, []);

  return (
    <Container className="mt-4">
      <h1 className="mb-4">Welcome, {user.name}</h1>
      <Row>
        <Col md={8}>
          <Card>
            <Card.Header>Recent Estimates</Card.Header>
            <Card.Body>
              {estimates.length > 0 ? (
                <ul>
                  {estimates.slice(0, 5).map(estimate => (
                    <li key={estimate.id}>
                      {estimate.projectDetails.type} - ${estimate.estimatedCost}
                    </li>
                  ))}
                </ul>
              ) : (
                <p>No recent estimates</p>
              )}
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card>
            <Card.Header>Quick Actions</Card.Header>
            <Card.Body>
              <Link to="/estimate">
                <Button variant="primary" className="w-100 mb-2">Create New Estimate</Button>
              </Link>
              <Link to="/projects">
                <Button variant="secondary" className="w-100">View All Projects</Button>
              </Link>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default Dashboard;
