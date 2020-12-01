import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchStreams } from '../../actions';


class StreamList extends React.Component {
    componentDidMount() {
        this.props.fetchStreams();
    }
    renderAdmin(stream) {
        if (stream.userId === this.props.currentUserId) {
            return (
                <div className="right floated content">
                    <button className="ui blue basic button">EDIT</button>
                    <button className="ui red basic button">Delete</button>
                </div>
            )
        }
    }

    renderList() {
        return this.props.streams.map((s) => {
            return (
                <div className="item" key={s.id}>
                    {this.renderAdmin(s)}
                    <i className="large middle aligned icon camera" />
                    <div className="content">
                        {s.title}
                        <div className="decsription">
                            {s.description}
                        </div>
                    </div>

                </div>
            )
        })
    }

    renderCreateStream() {
        if (this.props.isSignedIn) {
            return (
                <div style={{ textAlign: 'right' }}>
                    <Link to="/streams/new" className="ui button primary">Create Stream</Link>
                </div>
            )
        }
    }

    render() {
        return (
            <div>
                <h2>Streams</h2>
                <div className="ui celled list">{this.renderList()}</div>
                {this.renderCreateStream()}
            </div>
        )
    }
}

// convert values pairs into an array
// creating an array called this.props.streams
const mapStateToProps = (state) => {
    return {
        streams: Object.values(state.streams),
        currentUserId: state.auth.userId,
        isSignedIn: state.auth.isSignedIn
    }
}
export default connect(mapStateToProps, { fetchStreams })(StreamList);