import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getPost, deletePost } from '../actions';
import { Link } from 'react-router-dom';

class PostsDetail extends Component {

  constructor(props){
    super(props);
    this.renderPost = this.renderPost.bind(this);
  }

  componentDidMount() {
    const { id } = this.props.match.params;
    this.props.getPost(id);
  }

  renderPost() {
    if (!this.props.post)
      return (<div>Loading ...</div>);
    const { post : { title, categories, content }} = this.props;
    return (
      <div>
        <h4 className="card-title">
            { title }
        </h4>
        <div className="post-categories">
          <h6 className="card-subtitle mb-2 text-muted">
          Categories: { categories }
          </h6>
        </div>
        <div className="post-content">
          { content }
        </div>
      </div>
    );
  }

  onDeleteClick(){
    this.props.deletePost(this.props.match.params.id, () => { this.props.history.push('/');});
  }

  render() {
    return (
      <div>
        <div className="row justify-content-between">
          <div className="col-4 mt-3 mb-3">
            <Link  to='/'> > Back to the posts </Link>
          </div>
          <div className="col-4 mt-3 mb-3">
            <button className="btn btn-danger" onClick={this.onDeleteClick.bind(this)}>
              Delete
            </button>
          </div>
        </div>
        <div className="row col card card-block">
          {this.renderPost()}
        </div>
      </div>
    );
  };
}

function mapStateToProps({ posts }, ownProps){
  return {post : posts[ownProps.match.params.id]};
}

export default connect(mapStateToProps, {getPost, deletePost})(PostsDetail);
