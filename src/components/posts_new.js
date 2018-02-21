import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux'
import { createPost } from '../actions';

class PostsNew extends Component {

  renderField(field){ //event handler
    const {meta : {touched, error}} = field; //pulling meta from field, then touched & error from meta
    const showError = `form-group ${touched && error ? 'has-danger' : ''}`;

    return (
      <div className={showError}>
        <label>{ field.label }</label>
        <input
          className="form-control"
          type="text"
          {...field.input}   //kind of inherit of onChange onBlur etc... for input fields already definied in Field or redux-form
        />
        <div className="text-help">
          {touched ? error : ''} {/* This basically adds the error message if the form has been touched */}
        </div>
      </div>
    );
  }

  onSubmit(values) {
    this.props.createPost(values, () => { this.props.history.push('/'); } );
  }

  render(){
    const { handleSubmit } = this.props; //const handleSubmit = this.props.handleSubmit;
    return ( //call handleSubmit from redux form, then call our onSubmit as a callback
      <div>
        <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
          <Field label="Title" name="title" component={this.renderField} />
          <Field label="Categories" name="categories" component={this.renderField} />
          <Field label="Post Content" name="content" component={this.renderField} />
          <button type="submit" className="btn btn-primary">Submit</button>
          <Link to="/" className="btn btn-danger">Cancel</Link>
        </form>
      </div>
    );
  }
}

function validate(values) {
  const errors = {};

  if (!values.title)
    errors.title = "Enter a title!";
  if (!values.categories)
    errors.categories = "Enter categories!";
  if (!values.content)
    errors.content = "Enter a content!";

  return errors;
}

export default reduxForm({
  validate,
  form:'PostsNewForm' //kind of an id for our form that it has its specific state
})(
  //when giving connect a 2nd argument that hasn't been through dispatch, it does it by itself.
  connect(null, { createPost }) (PostsNew) //so no need to call dispatch ourself, or even bindActionCreators
);
