import React, { PropTypes } from 'react';
import LoginForm from '../components/LoginForm.jsx';
import Auth from '../modules/Auth.jsx';
import Config from '../config/config.js';


class LoginPage extends React.Component {

 constructor(props, context) {
    super(props, context);

    this.state = {
      errors: {},
      user: {
        email: '',
        password: ''
      }
    };

    this.processForm = this.processForm.bind(this);
    this.changeUser = this.changeUser.bind(this);
  }

  /**
   * Process the form.
   *
   * @param {object} event - the JavaScript event object
   */
  processForm(event) {
    // prevent default action. in this case, action is the form submission event
    event.preventDefault();

    const email = encodeURIComponent(this.state.user.email);
    const password = encodeURIComponent(this.state.user.password);
    const formData = `email=${email}&password=${password}`;

    fetch(`http://${Config.backendURL}/auth/v1/login`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/x-www-form-urlencoded'
      },
      body: formData
    })
    .then((response) => {
      return response.json()
    })
    .then((loginData) => {
      if (loginData.success === true) {
        this.setState({
          errors: {}
        });

        Auth.authenticateUser(loginData.token);

        this.context.router.replace('/');
      } else {
        const errors = loginData.errors ? loginData.errors : {};
        errors.summary = loginData.message;

        this.setState({
          errors
        });
      }
    });
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
   * Render the component.
   */
  render() {
    return (
      <LoginForm
        onSubmit={this.processForm}
        onChange={this.changeUser}
        errors={this.state.errors}
        user={this.state.user}
      />
    );
  }

}

LoginPage.contextTypes = {
  router: PropTypes.object.isRequired
};

export default LoginPage;
