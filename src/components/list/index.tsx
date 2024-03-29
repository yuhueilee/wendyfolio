import "./index.scss";

import { Card, Col, ListGroup } from "react-bootstrap";

import { ListContent } from "../../types";

function List({
    title,
    contentList,
}: {
    title: string;
    contentList: Array<ListContent>;
}): JSX.Element {
    const items = contentList.map((list, index) => {
        return (
            <Card key={index} border="light" className="mb-3">
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
                                    className="fr-16 px-0 pt-0"
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
