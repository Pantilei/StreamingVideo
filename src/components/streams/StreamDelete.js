import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Modal from "../Modal";
import { fetchStream, deleteStream } from "../../actions";

class StreamDelete extends React.Component {
  componentDidMount = () => {
    this.props.fetchStream(this.props.match.params.id);
  };

  // instead of wrapping into a div use <React.Fragment> it will produce invisible element in DOM
  // it is equavalent to <> </>
  renderActions = () => {
    const { id } = this.props.match.params;
    return (
      <>
        <button
          onClick={() => this.props.deleteStream(id)}
          type="button"
          className="btn btn-danger"
          data-dismiss="modal"
        >
          Delete
        </button>
        <Link to="/" type="button" className="btn btn-primary">
          Cancel
        </Link>
      </>
    );
  };

  renderContent = () => {
    if (!this.props.stream) {
      return "Are you sure you want to delete this stream?";
    } else {
      return `Are you sure you want to delete the stream with title: ${this.props.stream.title}?`;
    }
  };

  render() {
    return (
      <Modal
        header="Delete Stream"
        body={this.renderContent()}
        action={this.renderActions()}
      />
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return { stream: state.streams[ownProps.match.params.id] };
};

export default connect(mapStateToProps, { deleteStream, fetchStream })(
  StreamDelete
);
