import React from "react"
import Layout from "../components/layout"
import SEO from "../components/seo"
import authors from "../util/authors"
import { Card, CardText, CardBody, CardTitle, Button, Row } from "reactstrap"
import JaneImage from "../images/jane.jpg"
import MinaImage from "../images/mina.jpg"
import { slugify } from "../util/utilityFunction"

const TeamPage = () => (
    <Layout pageTitle="Our Team">
        <SEO title="Team" />
        <Row className="mb-4">
            <div className="col-md-3">
                <img
                    src={JaneImage}
                    style={{ maxWidth: "100%" }}
                    lat="John profile"
                    alt=""
                />
            </div>
            <div class="col-md-8">
                <Card style={{ minHeight: "100%" }}>
                    <CardBody>
                        <CardTitle>{authors[0].name}</CardTitle>
                        <CardText>{authors[0].bio}</CardText>
                        <Button
                            className="text-uppercase"
                            color="primary"
                            href={`/author/${slugify(authors[0].name)}`}
                        >
                            View posts
                        </Button>
                    </CardBody>
                </Card>
            </div>
        </Row>
        <Row className="mb-4">
            <div className="col-md-3">
                <img
                    src={MinaImage}
                    style={{ maxWidth: "100%" }}
                    lat="John profile"
                    alt=""
                />
            </div>
            <div class="col-md-8">
                <Card style={{ minHeight: "100%" }}>
                    <CardBody>
                        <CardTitle>{authors[1].name}</CardTitle>
                        <CardText>{authors[1].bio}</CardText>
                        <Button
                            className="text-uppercase"
                            color="primary"
                            href={`/author/${slugify(authors[1].name)}`}
                        >
                            View posts
                        </Button>
                    </CardBody>
                </Card>
            </div>
        </Row>
    </Layout>
)

export default TeamPage
