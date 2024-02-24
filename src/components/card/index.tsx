import './index.scss';

import { Card, Col, Row } from 'react-bootstrap';

import { CardContent } from '../../types';
import ButtonItem from '../button';

const CardItem = (contentList: Array<CardContent>) => {
    window.addEventListener("resize", () => {
        const cardImage = document.querySelectorAll("img");

        if (
            window.matchMedia("(max-width: 768px)").matches &&
            window.matchMedia("(min-width: 576px)").matches
        ) {
            cardImage.forEach((img) => {
                img.classList.add("rounded-start");
            });
        } else {
            cardImage.forEach((img) => {
                img.classList.remove("rounded-start");
            });
        }
    });

    return (
        <Row xs={1} sm={1} md={3} lg={3} className="g-4">
            {contentList.map((content, index) => (
                <Col key={index}>
                    <Card border="light">
                        <Row className="g-0">
                            <Col xs={12} sm={6} md={12}>
                                <Card.Img variant="top" src={content.img} />
                            </Col>
                            <Col xs={12} sm={6} md={12}>
                                <Card.Body className="h-100 d-flex flex-column">
                                    <Card.Title>{content.title}</Card.Title>
                                    <Card.Text>{content.description}</Card.Text>
                                    <ButtonItem links={content.links} />
                                </Card.Body>
                            </Col>
                        </Row>
                    </Card>
                </Col>
            ))}
        </Row>
    );
};

export default CardItem;
