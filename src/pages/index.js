import React from "react"

import Layout from "../components/layout"
import SEO from "../components/seo"

const IndexPage = () => (
  <Layout>
    <SEO title="Home" />
    <h1>Home page</h1>
  </Layout>
)

export default IndexPage

// npm install bootstrap reactstrap
// npm install gatsby-plugin-sass node-sass
// gatsby-config > plugins > 'gatsby-plugin-sass' 추가

// npm install gatsby-plugin-catch-links => 링크 이동시 리로딩이 아니라 싱글페이지로 작동
// gatsby-config > plugins > 'gatsby-plugin-catch-links' 추가
