import './index.scss';

import { Col, Container, Row } from 'react-bootstrap';

import CardItem from '../card';

const Project = () => {
    return (
        <Container>
            <Row>
                <Col>
                    <h2 className="title">Side Projects</h2>
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
