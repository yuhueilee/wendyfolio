import './index.scss';

import { Button, Col, Container, Image, Row } from 'react-bootstrap';

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
                    className="d-flex flex-column introduction"
                >
                    <h1>Wendy (Lee Yu Huei)</h1>
                    <h2>Software Engineer</h2>
                    <h4>Never stop learning and improving!</h4>
                    <div>
                        <Button variant="link" className="ps-0">
                            wendylee70127@gmail.com
                        </Button>
                        <Button variant="link" className="ps-0">
                            Github
                        </Button>
                        <Button variant="link" className="ps-0">
                            LinkedIn
                        </Button>
                    </div>
                </Col>
            </Row>
        </Container>
    );
};

export default Introduction;
