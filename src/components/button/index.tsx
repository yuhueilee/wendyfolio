import './index.scss';

import { Button, Col, Row } from 'react-bootstrap';

function ButtonItem({ links }: { links: Array<string> }): JSX.Element {
    const buttons = links.map((link, index) => {
        return (
            <Col key={"btn-col-" + index}>
                <Button
                    key={"btn-" + index}
                    href={link}
                    target="_black"
                    className={"w-100 " + color(link)}
                >
                    {Label(link)} {Icon(link)}
                </Button>
            </Col>
        );
    });
    return (
        <Row sm={2} md={1} lg={2} className="g-1">
            {buttons}
        </Row>
    );
}

const Label = (link: string): string => {
    if (link.includes("github")) {
        return "Github";
    }

    return "Website";
};

const Icon = (link: string): JSX.Element => {
    if (link.includes("github")) {
        return <i className="bi bi-github"></i>;
    }

    return <i className="bi bi-box-arrow-up-right"></i>;
};

const color = (link: string): string => {
    if (link.includes("github")) {
        return "btn-tertiary";
    }

    return "btn-secondary";
};

export default ButtonItem;
