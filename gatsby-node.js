const { slugify } = require("./src/util/utilityFunction")
const path = require("path")
const authors = require("./src/util/authors")

// 각 스키마의 모든 노드가 생길때마다 실행된다.
// 포스트를 만들때마다 title로 slug(path)를 자동적으로 만들어줌
// 매번 slug(path)를 만들어 줄 필요 없다.
exports.onCreateNode = ({ node, actions }) => {
  const { createNodeField } = actions
  if (node.internal.type === "MarkdownRemark") {
    const slugFromTitle = slugify(node.frontmatter.title)
    createNodeField({
      node,
      name: "slug",
      value: slugFromTitle,
    })
  }
}

exports.createPages = ({ actions, graphql }) => {
  const { createPage } = actions
  const singlePostTemplate = path.resolve("src/templates/single-post.js")

  return graphql(`
    {
      allMarkdownRemark {
        edges {
          node {
            frontmatter {
              author
              tags
            }
            fields {
              slug
            }
          }
        }
      }
    }
  `).then(res => {
    if (res.errors) return Promise.reject(res.errors)

    const posts = res.data.allMarkdownRemark.edges

    posts.forEach(({ node }) => {
      createPage({
        path: node.fields.slug,
        component: singlePostTemplate,
        context: {
          // Passing slug for template to use get post
          // 쿼리문 조회할대 $slug 로 받아짐
          // $slug 와 db에 slug일치하는 데이터만 뽑음
          slug: node.fields.slug,
          // find author imageHUrl form authors and pass it to the single post template
          imageUrl: authors.find(x => x.name === node.frontmatter.author)
            .imageUrl,
        },
      })
    })
  })
}
