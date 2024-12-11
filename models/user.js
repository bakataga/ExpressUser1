/* Ce fichier définit une classe User avec un constructeur qui prend username et password comme paramètres. 
Cette classe est utilisée pour créer des instances d'utilisateur. */

class User {
  /**
   * @param {string} username
   * @param {string} password
   * @param {string} role
   */
  constructor(username, password, role = "user") {
    this.username = username;
    this.password = password;
    this.role = role;
  }
}

module.exports = User;
