class Auth {
  /**
   * Authenticate a user. Save a token in Local Storage
   * 
   * @param {string} token  
   */
  static authenticateUser(token) {
    localStorage.setItem('token', token);
  }

  /**
   * Check if a user is authenticated (if a token is present in Local Storage)
   * 
   * @returns {boolean}
   */
  static isUserAuthenticated() {
    return localStorage.getItem('token') !== null;
  }

  /**
   * Deauthenticate a user. Remove token
   */
  static deauthenticateUser() {
    localStorage.removeItem('token');
  }

  /**
   * Get a token value
   * 
   * @returns {string}
   */
  static getToken() {
    return localStorage.getItem('token');
  }

}

export default Auth;
