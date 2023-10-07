import * as React from "react"
import Layout from '../components/Layout/'

// Step 2: Define your component
const IndexPage = () => {
  return (
    <Layout>
      <p>Welcome to Golf Savants, a golf analytics website focused on giving users the tools necessary to 
        become profitable DFS players as well as +EV bettors. We are here to help you make smarter decisions in daily fantasy sports and golf betting. 
        Whether you're a seasoned golf aficionado or just getting started, our comprehensive suite of cutting-edge data tools 
        and analytics will be your trusty caddy on the course to success.
        </p>
    </Layout>
  )
}

// You'll learn about this in the next task, just copy it for now
export const Head = () => <title>Golf Savants</title>

// Step 3: Export your component
export default IndexPage