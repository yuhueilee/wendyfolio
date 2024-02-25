import './index.scss';

import { Col, Container, Image, Row } from 'react-bootstrap';

const Introduction = () => {
    return (
        <Container>
            <Row sm={2} md={1} lg={1}>
                <Col key={0}>
                    <Image
                        src={
                            process.env.PUBLIC_URL + "/images/profile-pic.jpeg"
                        }
                        roundedCircle
                        className="profile"
                    />
                </Col>
                <Col key={1}></Col>
            </Row>
        </Container>
    );
};

export default Introduction;
