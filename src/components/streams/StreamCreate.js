import React from "react";
import { Field, reduxForm } from "redux-form";

class StreamCreate extends React.Component {
  renderInput(formProps) {
    /* console.log(formProps); */
    // we take all props and pass them as atributes to input, shorter version
    return <input {...formProps.input} />;
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
