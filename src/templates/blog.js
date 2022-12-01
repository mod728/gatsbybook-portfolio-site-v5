import * as React from "react"
import { graphql, Link } from "gatsby"
import { GatsbyImage } from "gatsby-plugin-image"
import Layout from "../components/layout"
import Pagination from "../components/pagination" 
import * as style from "../styles/blog.module.scss"

const Blog = (props) => {
    return (
        <Layout>
            <div className={style.wrapper}>
                <div className={style.container}>
                    <h1>Blog</h1>
                    <p>エンジニアの日常生活をお届けします</p>
                    {props.data.allMarkdownRemark.edges.map((singleBlog, index) => (
                            <div className={style.blogCard} key={index}>                            
                                <div className={style.textContainer}>
                                    <h3>{singleBlog.node.frontmatter.title}</h3>
                                    <p>{singleBlog.node.frontmatter.excerpt}</p>
                                    <p>{singleBlog.node.frontmatter.date}</p>
                                    <Link to={`/blog${singleBlog.node.fields.slug}`}>Read More</Link>
                                </div>
                                <GatsbyImage image={singleBlog.node.frontmatter.image.childImageSharp.gatsbyImageData} alt="card-image" className={style.cardImg} />
                            </div>
                        )
                    )}
                </div>
                <Pagination pageContext={props.pageContext} /> 
            </div>
        </Layout>
    )
}

export default Blog

export const query = graphql`
query BlogQuery ($skip: Int!, $limit: Int!) {
    allMarkdownRemark(
          sort: {frontmatter: {id: DESC}}
          limit: $limit
          skip: $skip 
      ){
      edges {
        node {
          frontmatter {
            date
            excerpt
            id
            title
            image {
              childImageSharp {
                  gatsbyImageData(
                      placeholder: BLURRED, 
                      formats: [AUTO, WEBP, AVIF], 
                      quality: 90
                  )
              }
            }
          }
          fields {
            slug
          }
        }
      }
    }
  }
`