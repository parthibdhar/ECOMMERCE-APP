import React from 'react'
import Layout from '../components/Layout/Layout'

const About = () => {
  return (
    <Layout>
       <div className="row aboutus ">
        <div className="col-md-6 ">
          <img
            src="/images/aboutus.jpg"
            alt="aboutus"
            style={{ width: "100%" }} />
        </div>
        <div className="col-md-4">
          <h1 className="bg-dark p-2 text-white text-center">ABOUT US</h1>
          <p className="text-justify mt-2">
            any query and info about prodduct feel free to call anytime we 24X7
            vaialible
          </p>
          <p className="mt-3">
            lorem Ipsum is simply dummy text of the printing and typesetting industry that remains true until
          </p>
          <p className="mt-3">
          lorem Ipsum is simply dummy text of the printing and typesetting industry that remains true until

          </p>
          <p className="mt-3">
          lorem Ipsum is simply dummy text of the printing and typesetting industry that remains true until

          </p>
        </div>
        </div>
    </Layout>
  )
}

export default About