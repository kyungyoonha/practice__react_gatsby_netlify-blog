const { slugify } = require("./src/util/utilityFunction")
const path = require("path")
const authors = require("./src/util/authors")
const _ = require("lodash")

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

    const templates = {
        singlePost: path.resolve("src/templates/single-post.js"),
        tagsPage: path.resolve("src/templates/tags-page.js"),
        tagPosts: path.resolve("src/templates/tag-posts.js"),
        postList: path.resolve("src/templates/post-list.js"),
        authorPosts: path.resolve("src/templates/author-posts.js"),
    }

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

        // Create single blog post pages
        posts.forEach(({ node }) => {
            createPage({
                path: node.fields.slug,
                component: templates.singlePost,
                context: {
                    // Passing slug for template to use get post
                    // 쿼리문 조회할대 $slug 로 받아짐
                    // $slug 와 db에 slug일치하는 데이터만 뽑음
                    slug: node.fields.slug,
                    // find author imageUrl form authors and pass it to the single post template
                    imageUrl: authors.find(
                        x => x.name === node.frontmatter.author
                    ).imageUrl,
                },
            })
        })

        // Get all tags
        let tags = []
        _.each(posts, edge => {
            if (_.get(edge, "node.frontmatter.tags")) {
                tags = tags.concat(edge.node.frontmatter.tags)
            }
        })

        // ['design', 'code', ...]
        // {design: 5, code: 6, ...}
        let tagPostCounts = {}
        tags.forEach(tag => {
            tagPostCounts[tag] = (tagPostCounts[tag] || 0) + 1
        })

        tags = _.uniq(tags)

        // Create tags page
        createPage({
            path: `/tags`,
            component: templates.tagsPage,
            context: {
                tags,
                tagPostCounts,
            },
        })

        // Create tag posts pages
        tags.forEach(tag => {
            createPage({
                path: `/tag/${slugify(tag)}`,
                component: templates.tagPosts,
                context: {
                    tag,
                },
            })
        })

        const postsPerPage = 2
        const numberOfPages = Math.ceil(posts.length / postsPerPage)

        Array.from({ length: numberOfPages }).forEach((_, index) => {
            const isFirstPage = index === 0
            const currentPage = index + 1

            if (isFirstPage) return

            createPage({
                path: `/page/${currentPage}`,
                component: templates.postList,
                context: {
                    limit: postsPerPage,
                    skip: index * postsPerPage,
                    currentPage,
                    numberOfPages,
                },
            })
        })

        authors.forEach(author => {
            console.log(author.name)
            createPage({
                path: `/author/${slugify(author.name)}`,
                component: templates.authorPosts,
                context: {
                    authorName: author.name,
                    imageUrl: author.imageUrl,
                },
            })
        })
    })
}
