import React from 'react';
import { clearSubmitErrors, Field, reduxForm } from 'redux-form';


class StreamCreate extends React.Component {
    // pass meta object and destructure props we need
    renderError({ error, touched }) {
        if (touched && error) {
            return (
                <div className="ui message">
                    <div className="header">{error}</div>
                </div>
            )
        }
    }



    //renderInput(formProps) {
    //<input {...formProps.input}
    renderInput = ({ input, label, meta }) => {
        const className = `field ${meta.error && meta.touched ? 'error' : ''}`;
        return (
            <div className={className}>
                <label>{label}</label>
                <input {...input} autoComplete="off"
                // onChange={formProps.input.onChange}
                // value={formProps.input.value}
                />
                {/* <div>{meta.error}</div> */}
                <div>{this.renderError(meta)}</div>
            </div>
        )
    }
    onSubmit(formValues) {
        console.log(formValues)
    }

    render() {
        return (
            <div>
                <form onSubmit={this.props.handleSubmit(this.onSubmit)} className="ui form">
                    <Field name="title" component={this.renderInput} label="Enter Title" />
                    <Field name="description" component={this.renderInput} label="Enter Description" />
                    <button className="ui button">Submit</button>
                </form>
            </div>
        )
    }
}


const validate = (formValues) => {
    const errors = {};
    if (!formValues.title) {
        errors.title = "You must enter a title"
    }

    if (!formValues.description) {
        errors.description = "You must enter a decsription"
    }

    return errors;
}


export default reduxForm({
    form: 'streamCreate', validate
})(StreamCreate);

/// key value form: 'streamCreate, validate: validate