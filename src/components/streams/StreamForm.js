import React from "react";
import { Field, reduxForm } from "redux-form";

class StreamForm extends React.Component {
  renderError({ touched, error }) {
    if (error && touched) {
      return <div className="alert alert-danger mt-3 p-1">{error}</div>;
    }
    /* console.log(error);
    console.log(touched); */
  }

  renderInput = ({ input, label, meta }) => {
    /* console.log(formProps); */
    // we take all props and pass them as atributes to input, shorter version
    /* console.log(meta); */
    return (
      <div className="form-group">
        <label>{label}</label>
        <input className="form-control" {...input} autoComplete="off" />
        {this.renderError(meta)}
      </div>
    );
    // we take just 2 props
    /* return (
      <input
        onChange={formProps.input.onChange}
        value={formProps.input.value}
      />
    ); */
  };

  onSubmit = formValues => {
    this.props.onSubmit(formValues);
  };

  render() {
    /* console.log(this.props); */
    return (
      // Field component does not know anything about label, so it will pass label as additional prop to renderInput
      <form onSubmit={this.props.handleSubmit(this.onSubmit)}>
        <Field name="title" component={this.renderInput} label="Enter Title" />
        <Field
          name="description"
          component={this.renderInput}
          label="Enter Description"
        />
        <button className="btn btn-primary">Submit</button>
      </form>
    );
  }
}

const validate = formValues => {
  const errors = {};

  if (!formValues.title) {
    errors.title = "You must enter a title!";
  }
  if (!formValues.description) {
    errors.description = "You must enter a description";
  }

  return errors;
};

export default reduxForm({
  form: "streamForm",
  //everytime we interact with form validate function will run, and returned object key/value will pass to component wrapped
  // with <Field/> tag with the same name as key in object, in this case it is renderInput component, which will recieve
  //in first input the error value with key title with name meta
  validate: validate
})(StreamForm);

/* export default reduxForm({
  form: "streamCreate",
  validate: validate
})(StreamCreate); */

//you can use connect() function together with reduxForm in this way
/* export default connect()(reduxForm({
  form: "streamCreate",
  validate: validate
})(StreamCreate)); */
