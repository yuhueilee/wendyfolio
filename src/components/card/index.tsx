import './index.scss';

import { Card, Col, Row } from 'react-bootstrap';

import { CardContent } from '../../types';

const CardItem = (contentList: Array<CardContent>) => {
    window.addEventListener("rounded card image", () => {
        const cardImage = document.querySelectorAll("img");

        if (window.matchMedia("(min-width: 769px)").matches) {
            cardImage.forEach((img) => {
                img.classList.add("rounded-start");
            });
        } else if (
            window.matchMedia("(min-width: 576px)").matches ||
            window.matchMedia("(min-width: 992px)").matches
        ) {
            cardImage.forEach((img) => {
                img.classList.remove("rounded-start");
            });
        }
    });

    return (
        <Row xs={1} sm={1} md={1} lg={3} className="g-4">
            {contentList.map((content, index) => (
                <Col key={index}>
                    <Card border="light">
                        <Row className="g-0">
                            <Col sm={12} md={6} lg={12}>
                                <Card.Img variant="top" src={content.img} />
                            </Col>
                            <Col sm={12} md={6} lg={12}>
                                <Card.Body>
                                    <Card.Title>{content.title}</Card.Title>
                                    <Card.Text>{content.description}</Card.Text>
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
