import { Col, Container, Row } from 'react-bootstrap';

const experience = () => {
    return (
        <Container>
            <Row key={0}>
                <Col className="d-flex justify-content-center">
                    <h2 className="title">Job Experiences</h2>
                </Col>
            </Row>
            <Row key={1}></Row>
        </Container>
    );
};

export default experience;
