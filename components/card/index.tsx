'use client'

import './index.scss'

import { useEffect } from 'react'
import { Card, Col, Row } from 'react-bootstrap'

import { CardContent } from '../../types'
import ButtonItem from '../button'

function CardItem({ contentList }: { contentList: Array<CardContent> }) {
    useEffect(() => {
        const handleResize = () => {
            const cardImage = document.querySelectorAll(".cardImage")

            if (
                window.matchMedia("(max-width: 768px)").matches &&
                window.matchMedia("(min-width: 576px)").matches
            ) {
                cardImage.forEach((img) => {
                    img.classList.add("rounded-start")
                })
            } else {
                cardImage.forEach((img) => {
                    img.classList.remove("rounded-start")
                })
            }
        }
        window.addEventListener("resize", handleResize)
        return () => window.removeEventListener("resize", handleResize)
    }, [])

    return (
        <Row xs={1} sm={1} md={3} lg={3} className="g-4">
            {contentList.map((content, index) => (
                <Col key={index}>
                    <Card border="light">
                        <Row className="g-0">
                            <Col xs={12} sm={6} md={12}>
                                <Card.Img
                                    className="cardImage"
                                    variant="top"
                                    src={content.img}
                                />
                            </Col>
                            <Col xs={12} sm={6} md={12}>
                                <Card.Body className="h-100 d-flex flex-column">
                                    <Card.Title>{content.title}</Card.Title>
                                    <Card.Text className="fr-16">
                                        {content.description}
                                    </Card.Text>
                                    <ButtonItem links={content.links} />
                                </Card.Body>
                            </Col>
                        </Row>
                    </Card>
                </Col>
            ))}
        </Row>
    )
}

export default CardItem
