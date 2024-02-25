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
            descriptions: ["Implemented...", "Integrated..."],
        },
    ];
    const eduLists: Array<ListContent> = [
        {
            title: "Bachelor of Computer Science",
            subTitle: "@Monash University Malaysia",
            duration: "Jun 2022 ~ Dec 2023",
            descriptions: ["Implemented..."],
        },
    ];

    return (
        <Container>
            <Row sm={1} md={1} lg={2} className="g-4">
                <List key={0} title="Job Experiences" contents={jobLists} />
                <List key={1} title="Education" contents={eduLists} />
            </Row>
        </Container>
    );
};

export default experience;
