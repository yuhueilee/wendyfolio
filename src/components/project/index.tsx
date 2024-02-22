import './index.scss';

import { Col, Container, Row } from 'react-bootstrap';

const Project = () => {
    return (
        <Container>
            <Row>
                <Col>
                    <div className="layout">
                        <h2 className="title">Side Projects</h2>
                    </div>
                </Col>
            </Row>
        </Container>
    );
};

export default Project;
