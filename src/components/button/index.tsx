import './index.scss';

import { Button, Col, Row } from 'react-bootstrap';

function ButtonItem({ links }: { links: Array<string> }): JSX.Element {
    const fullWidth = 12;
    const halfWidth = fullWidth / 2;
    // Set the column width to be half if there're more than one buttons.
    const colWidth = links.length > 1 ? halfWidth : fullWidth;

    const buttons = links.map((link, index) => {
        return (
            <Col
                key={"btn-col-" + index}
                sm={colWidth}
                md={fullWidth}
                lg={colWidth}
            >
                <Button
                    key={"btn-" + index}
                    href={link}
                    target="_black"
                    className={"description w-100 " + color(link)}
                >
                    {label(link)} {icon(link)}
                </Button>
            </Col>
        );
    });
    return (
        <Row sm={2} md={1} lg={1} className="g-1 mt-auto">
            {buttons}
        </Row>
    );
}

const label = (link: string): string => {
    if (link.includes("github")) {
        return "Github";
    }

    return "Website";
};

const icon = (link: string): JSX.Element => {
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
