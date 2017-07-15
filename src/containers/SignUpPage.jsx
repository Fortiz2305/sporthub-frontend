import React, { PropTypes } from 'react';
import SignUpForm from '../components/SignUpForm.jsx';
import Config from '../config/config.js';

class SignUpPage extends React.Component {

  constructor(props, context) {
    super(props, context);

    this.state = {
      errors: {},
      user: {
        email: '',
        name: '',
        password: ''
      }
    };

    this.processForm = this.processForm.bind(this);
    this.changeUser = this.changeUser.bind(this);
  }

  /**
   * Change the user object.
   *
   * @param {object} event - the JavaScript event object
   */
  changeUser(event) {
    const field = event.target.name;
    const user = this.state.user;
    user[field] = event.target.value;

    this.setState({
      user
    });
  }

  /**
   * Process the form.
   *
   * @param {object} event - the JavaScript event object
   */
  processForm(event) {
    // prevent default action. in this case, action is the form submission event
    event.preventDefault();

    const name = encodeURIComponent(this.state.user.name);
    const email = encodeURIComponent(this.state.user.email);
    const password = encodeURIComponent(this.state.user.password);
    const formData = `name=${name}&email=${email}&password=${password}`;

    fetch(`http://${Config.backendURL}/auth/v1/signup`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/x-www-form-urlencoded'
      },
      body: formData
    })
    .then((response) => {
      return response.json();
    })
    .then((signUpData) => {
      if (signUpData.success === true) {
        this.setState({
          errors: {}
        });

        localStorage.setItem('successMessage', signUpData.message);

        this.context.router.replace('/login');
      } else {
        const errors = signUpData.errors ? signUpData.errors : {};
        errors.summary = signUpData.message;

        this.setState({
          errors
        });
      }
    });
  }

  /**
   * Render the component.
   */
  render() {
    return (
      <SignUpForm
        onSubmit={this.processForm}
        onChange={this.changeUser}
        errors={this.state.errors}
        user={this.state.user}
      />
    );
  }

}

SignUpPage.contextTypes = {
  router: PropTypes.object.isRequired
};

export default SignUpPage;
