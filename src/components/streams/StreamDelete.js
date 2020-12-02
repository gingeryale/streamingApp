import React from 'react';
import Modal from '../Modal';
import { connect } from 'react-redux';
import history from '../../history';
import { Link } from 'react-router-dom';
import { fetchStream, deleteStream } from '../../actions';


class StreamDelete extends React.Component {
    componentDidMount() {
        this.props.fetchStream(this.props.match.params.id)
    }
    renderActions() {
        const { id } = this.props.match.params;
        return (
            <>
                <button className="ui button negative"
                    onClick={() => this.props.deleteStream(id)}
                >Delete</button>
                <Link to='/' className="ui button">Cancel</Link>
            </>
        )
    }

    renderContent() {
        if (!this.props.stream) {
            return 'Are you sure you want to delete this stream?'
        }
        return `Delete ${this.props.stream.title} from your streams?`
    }


    render() {
        return (
            <>
                < Modal
                    onDismiss={() => history.push('/')}
                    title="Delete Stream"
                    content={this.renderContent()}
                    actions={this.renderActions()}
                />
            </>
        )

    }
}

const mapStateToProps = (state, ownProps) => {
    return { stream: state.streams[ownProps.match.params.id] }
}


export default connect(mapStateToProps, { fetchStream, deleteStream })(StreamDelete);