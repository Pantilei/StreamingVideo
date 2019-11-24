import React from "react";
import { connect } from "react-redux";
import { fetchStreams } from "../../actions";
import { Link } from "react-router-dom";
import "../../styles.css";

class StreamList extends React.Component {
  componentDidMount() {
    this.props.fetchStreams();
  }

  renderAdmin(stream) {
    if (this.props.currentUserId === stream.userId) {
      return (
        <div className="button">
          <Link
            to={`/streams/edit/${stream.id}`}
            className="btn btn-primary m-3"
          >
            Edit
          </Link>
          <Link to={`/streams/delete/${stream.id}`} className="btn btn-danger">
            Delete
          </Link>
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
            <Link to={`/streams/${stream.id}`}>
              <h5 className="mt-0">{stream.title}</h5>
            </Link>
            <p>{stream.description}</p>
          </div>
          {this.renderAdmin(stream)}
        </div>
      );
    });
  };

  renderCreate() {
    if (this.props.isSignedIn) {
      return (
        <div style={{ textAlign: "right" }}>
          <Link to="/streams/new" className=" btn btn-success m-2">
            Create new stream
          </Link>
        </div>
      );
    }
  }

  render() {
    return (
      <div>
        <h2>Streams</h2>
        {this.renderList()}
        {this.renderCreate()}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    currentUserId: state.auth.userId,
    streams: Object.values(state.streams),
    isSignedIn: state.auth.isSignedIn
  };
};

export default connect(mapStateToProps, { fetchStreams })(StreamList);
