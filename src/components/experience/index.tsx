import './index.scss';

import { Container, Row } from 'react-bootstrap';

import { ListContent } from '../../types';
import List from '../list';

const experience = () => {
    const jobLists: Array<ListContent> = [
        {
            title: "Backend Software Engineer",
            subTitle: "@Foodpanda",
            duration: "Jun 2022 ~ Dec 2023",
            description: "Implemented...",
        },
    ];

    return (
        <Container>
            <Row sm={1} md={1} lg={2}>
                <List title="Job Experiences" contents={jobLists} />
            </Row>
        </Container>
    );
};

export default experience;
