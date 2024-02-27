import "./index.scss";

import { Container, Row } from "react-bootstrap";

import { ListContent } from "../../types";
import List from "../list";

const experience = () => {
    const jobLists: Array<ListContent> = [
        {
            title: "Backend Software Engineer",
            subTitle: "@Foodpanda Taiwan",
            duration: "Jun 2022 ~ Dec 2023",
            descriptions: [
                "Worked closely with client engineers, product managers, product analysts, and designers to seamlessly and punctually deliver the feature",
                "Developed and maintained the backend service for subscription functionality, ensuring accurate behavior through rigorous testing on staging",
                "Troubleshooted production issues using Datadog and AWS console, consistently resolving them within a 5-hour timeframe",
                "Performed unit tests and integration tests on key user flows to uphold a minimum code coverage of 70%",
            ],
        },
        {
            title: "Frontend Intern",
            subTitle: "@Wavelet Solutions",
            duration: "Jan 2021 - June 2021",
            descriptions: [
                "Implemented a responsive user interface using Ionic components for the e-commerce website that is used by retail chain stores",
                "Applied Angular Redux to automatically reflected the changes on user interface",
            ],
        },
    ];
    const eduLists: Array<ListContent> = [
        {
            title: "Bachelor of Computer Science, Advanced Computer Programming",
            subTitle: "@Monash University Malaysia",
            duration: "Feb 2019 - Mar 2022",
            descriptions: ["Graduated with a GPA of 3.8 on a 4.0 scale"],
        },
        {
            title: "Monash University Foundation Year",
            subTitle: "@Sunway College Malaysia",
            duration: "Jul 2017 - Nov 2018",
            descriptions: ["Graduated with a high distinction academic score"],
        },
    ];

    return (
        <Container>
            <Row sm={1} md={1} lg={2} className="g-4">
                <List key={0} title="Job Experience" contents={jobLists} />
                <List key={1} title="Education" contents={eduLists} />
            </Row>
        </Container>
    );
};

export default experience;
