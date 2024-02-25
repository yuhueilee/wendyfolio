import './index.scss';

import { Card, Col, ListGroup } from 'react-bootstrap';

import { ListContent } from '../../types';

function List({
    title,
    contents,
}: {
    title: string;
    contents: Array<ListContent>;
}): JSX.Element {
    const items = contents.map((list, index) => {
        return (
            <Card key={index}>
                <Card.Body>
                    <Card.Title>{list.title}</Card.Title>
                    <Card.Subtitle>{list.subTitle}</Card.Subtitle>
                    <Card.Text className="duration">{list.duration}</Card.Text>
                    <ListGroup as="ol" numbered>
                        {list.descriptions.map((paragraph, index) => {
                            return (
                                <ListGroup.Item
                                    as="li"
                                    key={index}
                                    className="fr-16"
                                >
                                    {paragraph}
                                </ListGroup.Item>
                            );
                        })}
                    </ListGroup>
                </Card.Body>
            </Card>
        );
    });
    return (
        <Col sm={12} md={6} lg={6}>
            <h2 className="title w-100">{title}</h2>
            {items}
        </Col>
    );
}

export default List;
