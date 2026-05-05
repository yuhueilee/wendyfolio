"use client";

import { Button, Col, Container, Image, Row } from "react-bootstrap";
import profileImg from "../../public/images/profile-pic.jpeg";

import "./index.scss";

const Introduction = () => {
    return (
        <Container>
            <Row
                sm={1}
                md={2}
                lg={2}
                className="g-2 d-flex justify-content-center pt-1"
            >
                <Col
                    key={0}
                    xs={12}
                    sm={5}
                    lg={4}
                    className="d-flex justify-content-center"
                >
                    <Image
                        src={profileImg.src}
                        roundedCircle
                        className="profile"
                        alt="Wendy Lee"
                    />
                </Col>
                <Col
                    key={1}
                    xs={12}
                    sm={7}
                    lg={8}
                    className="d-flex flex-column introduction"
                >
                    <h1 className="fsb-36 name">Wendy (Lee Yu Huei)</h1>
                    <h2 className="fb-24 position">Software Engineer</h2>
                    <h4 className="fr-16 bio">
                        Never stop learning and improving!
                    </h4>
                    <div className="d-flex flex-row h-100">
                        <div className="align-self-end links">
                            <Button
                                variant="link"
                                className="ps-0 py-0 fr-16 link-warning"
                            >
                                wendylee70127@gmail.com
                            </Button>
                            <Button
                                variant="link"
                                className="ps-0 py-0 fr-16 link-warning"
                                href="https://github.com/yuhueilee"
                                target="_blank"
                            >
                                Github
                            </Button>
                            <Button
                                variant="link"
                                className="ps-0 py-0 fr-16 link-warning"
                                href="https://www.linkedin.com/in/yuhueilee-wendy/"
                                target="_blank"
                            >
                                LinkedIn
                            </Button>
                        </div>
                    </div>
                </Col>
            </Row>
        </Container>
    );
};

export default Introduction;
