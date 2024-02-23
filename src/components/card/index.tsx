import { Col, Row } from 'react-bootstrap';

import { CardContent } from '../../types';

const Card = (contentList: Array<CardContent>) => {
    return (
        <Row md={1} lg={3}>
            {contentList.map((_, index) => (
                <Col key={index}></Col>
            ))}
        </Row>
    );
};

export default Card;
