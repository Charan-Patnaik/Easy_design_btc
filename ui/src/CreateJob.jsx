import React, { useState } from 'react';
import { Button, Form, Image, Container, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for redirection

const CreateJob = () => {
    const [image, setImage] = useState(null);
    const navigate = useNavigate(); // Hook to navigate programmatically

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                setImage(e.target.result); // Display the loaded image
            };
            reader.readAsDataURL(file);
        }
    };

    const handleCancel = () => {
        setImage(null); // Remove the image and reset the input
    };

    const handleSave = () => {
        // Save logic here (you may want to handle the state or database update)
        console.log('Job saved with image');
        navigate('/assignedjob'); // Redirect to the AssignedJob page after save
    };

    return (
            <Row className="mt-2">
                <Col md={6}>
                    <h2>Create Job</h2>
                    <Form>
                        <Form.Group>
                            <Form.Label>Upload Image</Form.Label>
                            <Form.Control type="file" onChange={handleImageChange} />
                        </Form.Group>
                        {image && (
                            <div>
                                <Image src={image} thumbnail />
                                <Button variant="danger" onClick={handleCancel} className="mr-2">Cancel</Button>
                                <Button variant="primary" onClick={handleSave}>Save</Button>
                            </div>
                        )}
                    </Form>
                </Col>
            </Row>
    );
};

export default CreateJob;