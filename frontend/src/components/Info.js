import React, { Component } from "react";
import { Link } from "react-router-dom";

class Info extends Component {
  render() {
    return (
      <div className="mainGraph_container hero is-fullheight">
        <section className="hero is-small">
          <div className="hero-body">
            <div className="container is-mobile">
              <h1 className="title">Information</h1>
              <h2 className="subtitle">About our team</h2>
              <div className="columns">
                <div className="column">
                  <div className="card">
                    <div className="card-content">
                      <div className="media">
                        <div className="media-left">
                          <figure className="image is-128x128">
                            <img
                              src="https://bulma.io/images/placeholders/96x96.png"
                              alt="Placeholder image"
                            />
                          </figure>
                        </div>
                        <div className="media-content">
                          <p className="title is-4">Name Here</p>
                          <p className="subtitle is-6">@namehere</p>
                        </div>
                      </div>
                      <div className="content">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        Phasellus nec iaculis mauris.
                        <Link
                          to="react"
                          target="_blank"
                          to="http://reactjs.org"
                        >
                          #reactjs
                        </Link>
                        <Link
                          to="victory"
                          target="_blank"
                          to="https://formidable.com/open-source/victory/"
                        >
                          #victory
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="column">
                  <div className="card">
                    <div className="card-content">
                      <div className="media">
                        <div className="media-left">
                          <figure className="image is-128x128">
                            <img
                              src="https://bulma.io/images/placeholders/96x96.png"
                              alt="Placeholder image"
                            />
                          </figure>
                        </div>
                        <div className="media-content">
                          <p className="title is-4">Name Here</p>
                          <p className="subtitle is-6">@namehere</p>
                        </div>
                      </div>
                      <div className="content">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        Phasellus nec iaculis mauris.
                        <Link
                          to="react"
                          target="_blank"
                          to="http://reactjs.org"
                        >
                          #reactjs
                        </Link>
                        <Link
                          to="victory"
                          target="_blank"
                          to="https://formidable.com/open-source/victory/"
                        >
                          #victory
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="column">
                  <div className="card">
                    <div className="card-content">
                      <div className="media">
                        <div className="media-left">
                          <figure className="image is-128x128">
                            <img
                              src="https://bulma.io/images/placeholders/96x96.png"
                              alt="Placeholder image"
                            />
                          </figure>
                        </div>
                        <div className="media-content">
                          <p className="title is-4">Name Here</p>
                          <p className="subtitle is-6">@namehere</p>
                        </div>
                      </div>
                      <div className="content">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        Phasellus nec iaculis mauris.
                        <Link
                          to="react"
                          target="_blank"
                          to="http://reactjs.org"
                        >
                          #reactjs
                        </Link>
                        <Link
                          to="victory"
                          target="_blank"
                          to="https://formidable.com/open-source/victory/"
                        >
                          #victory
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="column">
                  <div className="card">
                    <div className="card-content">
                      <div className="media">
                        <div className="media-left">
                          <figure className="image is-128x128">
                            <img
                              src="https://bulma.io/images/placeholders/96x96.png"
                              alt="Placeholder image"
                            />
                          </figure>
                        </div>
                        <div className="media-content">
                          <p className="title is-4">Name Here</p>
                          <p className="subtitle is-6">@namehere</p>
                        </div>
                      </div>
                      <div className="content">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        Phasellus nec iaculis mauris.
                        <Link
                          to="react"
                          target="_blank"
                          to="http://reactjs.org"
                        >
                          #reactjs
                        </Link>
                        <Link
                          to="victory"
                          target="_blank"
                          to="https://formidable.com/open-source/victory/"
                        >
                          #victory
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }
}

export default Info;
