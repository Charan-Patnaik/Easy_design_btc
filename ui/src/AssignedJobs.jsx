import React, { useState } from 'react';
import { Button, Container, Row, Col, Image } from 'react-bootstrap';

export default function AssignedJobs() {
  const [activeStage, setActiveStage] = useState(0);
  const stages = ['Stage 1', 'Stage 2', 'Stage 3', 'Stage 4', 'Stage 5', 'Stage 6'];

  const handleButtonClick = (index) => {
    setActiveStage(index);
  };

  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <h1 className='text-center'>Job Status</h1>
        <Col md={6} className="text-center">
          {/* Image from previous upload. Ensure the image URL is correctly set. */}
          <Image src="https://via.placeholder.com/300" className="mb-3" style={{ width: '100%' }} />

          {/* Stages Buttons */}
          <div className="d-flex flex-column align-items-center">
            {stages.map((stage, index) => (
              <Button
                key={index}
                onClick={() => handleButtonClick(index)}
                style={{
                  backgroundColor: index <= activeStage ? 'red' : 'green',
                  margin: '5px',
                  width: '100%'  // Increase width to full available space within the column
                }}
              >
                {stage}
              </Button>
            ))}
          </div>
        </Col>
      </Row>
    </Container>
  );
}
