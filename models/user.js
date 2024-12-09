/* Ce fichier définit une classe User avec un constructeur qui prend username et password comme paramètres. 
Cette classe est utilisée pour créer des instances d'utilisateur. */

class User {
  /**
   * @param {string} username
   * @param {string} password
   */
  constructor(username, password) {
    this.username = username;
    this.password = password;
  }
}

module.exports = User;
