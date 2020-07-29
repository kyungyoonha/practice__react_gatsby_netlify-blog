import React from "react"
import Layout from "../components/layout"
import SEO from "../components/seo"
import { graphql, StaticQuery } from "gatsby"
import Post from "../components/Post"

const IndexPage = () => (
  <Layout>
    <SEO title="Home" />
    <h1>Home page</h1>
    <StaticQuery
      query={indexQuery}
      render={data => {
        return (
          <div>
            {data.allMarkdownRemark.edges.map(({ node }) => (
              <Post
                title={node.frontmatter.title}
                author={node.frontmatter.author}
                path={node.frontmatter.path}
                date={node.frontmatter.date}
                body={node.frontmatter.body}
              />
            ))}
          </div>
        )
      }}
    />
  </Layout>
)

const indexQuery = graphql`
  query {
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      edges {
        node {
          id
          frontmatter {
            title
            date(formatString: "MMM Do YYYY")
            author
            path
          }
          excerpt
        }
      }
    }
  }
`

export default IndexPage

// npm install bootstrap reactstrap
// npm install gatsby-plugin-sass node-sass
// gatsby-config > plugins > 'gatsby-plugin-sass' 추가

// npm install gatsby-plugin-catch-links => 링크 이동시 리로딩이 아니라 싱글페이지로 작동
// gatsby-config > plugins > 'gatsby-plugin-catch-links' 추가

// npm install gatsby-transformer-remark
// gatsby-config > plugins > 'gatsby-transformer-remark' 추가
