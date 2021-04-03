import React from 'react';
import Modal from '../Modal';
import history from '../../history';
import { connect } from 'react-redux';
import { fetchStream, deleteStream } from '../../actions';
import {Link} from 'react-router-dom'
class StreamDelete extends React.Component {
    componentDidMount() {
        this.props.fetchStream(this.props.match.params.id);
    }
    onDelete() {
        this.props.deleteStream(this.props.match.params.id);
        
    }
    renderActions() {
        return (<React.Fragment>
            <button className="ui button negative" onClick={() => this.onDelete()}>Delete</button>
            <Link to="/" className="ui button">Cancel</Link>
        </React.Fragment>);
    }

    renderContent() {
        if (!this.props.stream) {
            return "Are you sure want to delete this stream?";
        }
        return "Are you sure want to delete this stream " + this.props.stream.title + " ?"
    }
    render() {
        return (
            <div><Modal
                title="Delete Stream"
                description={this.renderContent()}
                actions={this.renderActions()}
                onDismiss={() => history.push('/')} />
            </div>
        )
    }
}

const mapStateToProps = (state, props) => {
    return {
        stream: state.streams[props.match.params.id]
    }
}
export default connect(mapStateToProps, { fetchStream, deleteStream })(StreamDelete);