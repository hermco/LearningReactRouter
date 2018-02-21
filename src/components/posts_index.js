import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchPosts } from '../actions';
import _ from 'lodash';
import { Link } from 'react-router-dom';

class PostsIndex extends Component {
  componentDidMount(){
    this.props.fetchPosts();
  }

  renderPosts(){
    if (_.isEmpty(this.props.posts))
      return <div>No data to display!</div>
    return _.map(this.props.posts, post => { //_.map converts an object into an array, and parses it!
      return (
        <div key={post.id}>
          <li className="list-group-item" key={post.id}>
            <Link  to={`/posts/${post.id}`} key={post.id}>{post.title}</Link>
          </li>
        </div>
      );
    });
  }

  render(){
    return (
      <div>
      <div className="row justify-content-between mt-2 mb-2">
          <div className="col-4">
            <h3>Posts</h3>
          </div>
          <div className="col-4">
            <Link className="btn btn-primary" to="/posts/new">Add a Post</Link>
          </div>
        </div>
        <ul className="list-group">
          {this.renderPosts()}
        </ul>
      </div>
    );
  }
}

function mapStateToProps({ posts }){ //subscribing to posts in the global state
  return {posts}; //addind posts to props
}

export default connect(mapStateToProps, { fetchPosts })(PostsIndex);
