import React from "react";
import { connect } from "react-redux";
import flv from "flv.js";

import { fetchStream } from "../../actions";

class StreamShow extends React.Component {
  //In order to get reference to video(or any other) element
  //that is JSX and not HTML inside the REACT define constructor method
  constructor(props) {
    super(props);
    this.videoRef = React.createRef();
  }

  componentDidMount() {
    const { id } = this.props.match.params;

    this.props.fetchStream(id);
    this.buildPlayer();
  }
  // whenever there is an update in page this function is invoked
  componentDidUpdate() {
    //stop atempting to stream the video, and detach itself from the video element
    this.buildPlayer();
  }

  // in order to cleanup some resources that component were using
  // or clean up some resources that were created
  componentWillUnmount() {
    console.log("I am unmounted");
    this.player.destroy();
  }

  buildPlayer() {
    if (this.player || !this.props.stream) {
      return;
    }

    const { id } = this.props.match.params;

    this.player = flv.createPlayer({
      type: "flv",
      url: `http://localhost:8000/live/${id}.flv`
    });
    this.player.attachMediaElement(this.videoRef.current);
    this.player.load();
  }

  render() {
    if (!this.props.stream) {
      return <div>Loading...</div>;
    }

    const { title, description } = this.props.stream;

    return (
      <div>
        <video ref={this.videoRef} controls style={{ width: "100%" }} />
        <h1>{title}</h1>
        <h5>{description}</h5>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return { stream: state.streams[ownProps.match.params.id] };
};
export default connect(mapStateToProps, { fetchStream })(StreamShow);
