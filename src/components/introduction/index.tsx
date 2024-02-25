import './index.scss';

import { Col, Container, Image, Row } from 'react-bootstrap';

const Introduction = () => {
    return (
        <Container>
            <Row sm={1} md={2} lg={2} className="d-flex justify-content-center">
                <Col
                    key={0}
                    xs={12}
                    sm={5}
                    md={5}
                    className="d-flex justify-content-center"
                >
                    <Image
                        src={
                            process.env.PUBLIC_URL + "/images/profile-pic.jpeg"
                        }
                        roundedCircle
                        className="profile"
                    />
                </Col>
                <Col
                    key={1}
                    xs={12}
                    sm={7}
                    md={7}
                    className="d-flex introduction"
                >
                    <h1>Wendy (Lee Yu Huei)</h1>
                </Col>
            </Row>
        </Container>
    );
};

export default Introduction;
