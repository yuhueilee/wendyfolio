import { Card, Col, Row } from 'react-bootstrap';

import { CardContent } from '../../types';

const CardItem = (contentList: Array<CardContent>) => {
    return (
        <Row md={1} lg={3}>
            {contentList.map((content, index) => (
                <Col key={index}>
                    <Card>
                        <Card.Img variant="top" src={content.img} />
                        <Card.Body>
                            <Card.Title>{content.title}</Card.Title>
                            <Card.Body>{content.description}</Card.Body>
                        </Card.Body>
                    </Card>
                </Col>
            ))}
        </Row>
    );
};

export default CardItem;
