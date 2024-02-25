import './index.scss';

import { Col, Container, Row } from 'react-bootstrap';

const Introduction = () => {
    return (
        <Container>
            <Row sm={2} md={1} lg={1}>
                <Col key={0}></Col>
                <Col key={1}></Col>
            </Row>
        </Container>
    );
};

export default Introduction;
