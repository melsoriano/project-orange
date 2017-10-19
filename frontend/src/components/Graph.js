import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getEntries } from '../actions';
import Swipeable from 'react-swipeable';

class Graph extends Component {
  constructor(props) {
    super(props);

    this.state = {
      entries: []
    };
  }

  handleSwipeLeft() {
    alert('Swiped left!');
  }

  handleSwipeRight() {
    alert('Swiped right!');
  }

  componentWillMount() {
    this.props.getEntries();
  }

  render() {
    if (this.props.entries.length > 0) {
      return (
        <Swipeable
          onSwipedLeft={this.handleSwipeLeft}
          onSwipedRight={this.handleSwipeRight}
        >
          <div className="container" id="mainBox">
            {this.props.entries.map(entry => {
              return (
                <article key={entry.id} className="media">
                  <figure className="media-left">
                    <i className="fa fa-heart" />
                  </figure>
                  <div className="media-content">
                    <div className="content" id="entryText">
                      <p>
                        <strong>Entry {entry.id} </strong>
                        <small>{entry.createdAt}</small>
                        <br />
                        {entry.text}
                      </p>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </Swipeable>
      );
    } else {
      return <div>LOADING</div>;
    }
  }
}

const mapStatetoProps = state => {
  return { entries: state.entries };
};

const mapDispatchtoProps = dispatch => {
  return {
    getEntries: () => {
      dispatch(getEntries());
    }
  };
};

const ConnectedGraph = connect(mapStatetoProps, mapDispatchtoProps)(Graph);

export default ConnectedGraph;
