import { Col } from 'react-bootstrap';

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
            <div key={index}>
                <h1>{list.title}</h1>
                <h2>{list.subTitle}</h2>
            </div>
        );
    });
    return (
        <Col>
            <h2 className="title">{title}</h2>
            {items}
        </Col>
    );
}

export default List;
