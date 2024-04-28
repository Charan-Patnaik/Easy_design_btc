import React from 'react';
import { Card } from 'react-bootstrap';

const ImageList = () => {
  return (
    <div>
      <h2 className='mb-4'>Assigned Jobs</h2>
      <div style={{ overflowX: 'auto', whiteSpace: 'nowrap' }}>
        {[...Array(10).keys()].map((index) => (
          <div key={index} style={{ display: 'inline-block', marginRight: '10px' }}>
            <Card className='m-2' style={{ width: '200px' }}>
              <Card.Img variant="top" src={`https://via.placeholder.com/150?text=Image${index + 1}`} />
              <Card.Body>
                <Card.Title>Image {index + 1}</Card.Title>
                <Card.Text>
                  Some subtext for Image {index + 1}
                </Card.Text>
              </Card.Body>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImageList;