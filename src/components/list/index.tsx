import './index.scss';

import { Col, Row } from 'react-bootstrap';

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
            <Row key={index} className="w-100">
                <h1>{list.title}</h1>
                <h2>{list.subTitle}</h2>
            </Row>
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
