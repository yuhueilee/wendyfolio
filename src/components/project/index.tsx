import './index.scss';

import { Col, Container, Row } from 'react-bootstrap';

import { CardContent } from '../../types';
import CardItem from '../card';

const Project = () => {
    const contentList: Array<CardContent> = [
        {
            img: process.env.PUBLIC_URL + "/images/project-1.png",
            title: "Penguin Battle",
            description: "An online boardgame",
            links: [
                "https://github.com/yuhueilee/penguin-game",
                "https://penguin-battle.netlify.app/",
            ],
        },
        {
            img: process.env.PUBLIC_URL + "/images/project-1.png",
            title: "Penguin Battle",
            description: "An online boardgame",
            links: ["https://penguin-battle.netlify.app/"],
        },
        {
            img: process.env.PUBLIC_URL + "/images/project-1.png",
            title: "Penguin Battle",
            description: "An online boardgame",
            links: [],
        },
    ];

    return (
        <Container>
            <Row key={0}>
                <Col className="d-flex justify-content-center">
                    <h2 className="title">Side Projects</h2>
                </Col>
            </Row>
            <Row key={1}>
                <Col>{CardItem(contentList)}</Col>
            </Row>
        </Container>
    );
};

export default Project;
