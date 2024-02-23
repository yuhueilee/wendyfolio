import './index.scss';

import { Col, Container, Row } from 'react-bootstrap';

import CardItem from '../card';

const Project = () => {
    return (
        <Container>
            <Row key={0}>
                <Col class="d-flex justify-content-center">
                    <h2 className="title">Side Projects</h2>
                </Col>
            </Row>
            <Row key={1}>
                <Col>
                    {CardItem([
                        {
                            img:
                                process.env.PUBLIC_URL +
                                "/images/project-1.png",
                            title: "Penguin Battle",
                            description: "An online boardgame",
                        },
                    ])}
                </Col>
            </Row>
        </Container>
    );
};

export default Project;
