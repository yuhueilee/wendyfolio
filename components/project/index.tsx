'use client'

import "./index.scss"

import { Col, Container, Row } from "react-bootstrap"

import { CardContent } from "../../types"
import CardItem from "../card"

const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? ''

const Project = () => {
    const contentList: Array<CardContent> = [
        {
            img: BASE_PATH + "/images/project-1.png",
            title: "Penguin Battle",
            description:
                "A turn-based board game developed using the React framework, leveraging boardgame.io library for game logic implementation",
            links: [
                "https://github.com/yuhueilee/penguin-game",
                "https://penguin-battle.netlify.app/",
            ],
        },
    ]

    return (
        <Container>
            <Row key={0}>
                <Col className="d-flex justify-content-center">
                    <h2 className="title">Side Projects</h2>
                </Col>
            </Row>
            <Row key={1}>
                <Col>
                    <CardItem contentList={contentList} />
                </Col>
            </Row>
        </Container>
    )
}

export default Project
