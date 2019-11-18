import React from "react";
import { Field, reduxForm } from "redux-form";

class StreamCreate extends React.Component {
  renderInput({ input, label }) {
    /* console.log(formProps); */
    // we take all props and pass them as atributes to input, shorter version
    return (
      <div className="form-group">
        <label>{label}</label>
        <input className="form-control" {...input} />
      </div>
    );
    // we take just 2 props
    /* return (
      <input
        onChange={formProps.input.onChange}
        value={formProps.input.value}
      />
    ); */
  }

  render() {
    return (
      // Field component does not know anything about label, so it will pass label as additional prop to renderInput
      <form>
        <Field name="title" component={this.renderInput} label="Enter Title" />
        <Field
          name="description"
          component={this.renderInput}
          label="Enter Description"
        />
      </form>
    );
  }
}

export default reduxForm({
  form: "streamCreate"
})(StreamCreate);
