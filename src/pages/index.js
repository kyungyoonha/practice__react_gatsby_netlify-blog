import React from "react"
import Layout from "../components/layout"
import SEO from "../components/seo"
import { graphql, StaticQuery } from "gatsby"
import Post from "../components/Post"

const IndexPage = () => (
  <Layout pageTitle="CodeBlog">
    <SEO title="Home" />
    <StaticQuery
      query={indexQuery}
      render={data => {
        return (
          <div>
            {data.allMarkdownRemark.edges.map(({ node }) => (
              <Post
                key={node.id}
                title={node.frontmatter.title}
                author={node.frontmatter.author}
                slug={node.fields.slug}
                date={node.excerpt}
                body={node.frontmatter.body}
                fluid={node.frontmatter.image.childImageSharp.fluid}
                tags={node.frontmatter.tags}
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
            tags
            image {
              childImageSharp {
                fluid(maxWidth: 600) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
          }
          fields {
            slug
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

// 각 페이지 만들기 => gatsby-node.js
// createPages()로 만들어주고 맨 마지막에 context로 넘기는 변수(slug)는
// 각 페이지에서 query를 조회할때 $slug 형태로 받아 올 수 있다.
// 받아온 변수를 이용하여 각 페이지에 해당하는 데이터만 조회하여 뿌려준다.
