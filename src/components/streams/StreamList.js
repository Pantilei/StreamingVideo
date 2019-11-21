import React from "react";
import { connect } from "react-redux";
import { fetchStreams } from "../../actions";
import "../../styles.css";

class StreamList extends React.Component {
  componentDidMount() {
    this.props.fetchStreams();
  }

  renderAdmin(stream) {
    if (this.props.currentUserId === stream.userId) {
      return (
        <div className="button">
          <button className="btn btn-primary m-3">Edit</button>
          <button className="btn btn-danger">Delete</button>
        </div>
      );
    }
  }

  renderList = () => {
    return this.props.streams.map(stream => {
      return (
        <div className="media mt-3" key={stream.id}>
          <img
            src="https://66.media.tumblr.com/276eeec6ab6ee2dce7373580e5ffa35c/tumblr_n2fx9yLS411tvfpg9o1_500.gifv"
            className="mr-3"
            alt="..."
            width="64"
          />
          <div className="media-body">
            <h5 className="mt-0">{stream.title}</h5>
            <p>{stream.description}</p>
          </div>
          {this.renderAdmin(stream)}
        </div>
      );
    });
  };

  render() {
    return (
      <div>
        <h2>Streams</h2>
        {this.renderList()}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    currentUserId: state.auth.userId,
    streams: Object.values(state.streams)
  };
};

export default connect(mapStateToProps, { fetchStreams })(StreamList);
