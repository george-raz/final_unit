import { users } from "./DB";
import User from "./User";

export default class SignUpForm extends User {

  constructor(firstName: string, lastName: string, username: string = "", email: string = "", password: string = "") {
    super(firstName, lastName, username, email, password);
  }

  signUp(username: string, email: string, password: string): User {
    let finUsername: string;
    let finEmail: string;
    let finPassword: string;
    let emailRegex: RegExp = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;
    let usernameRegex: RegExp = /(?:[@!$%&'*+/=?^_`{|}~-]+)/;
    if (username.length < 1) {
      throw new Error("Username is required")
    } else if (username.length > 100) {
      throw new Error("Username must be equal or less than 100 characters")
    } else if (username.length <= 2) {
      throw new Error("Username must be equal or more than 3 characters")
    } else if (username.match(usernameRegex)) {
      throw new Error("The following characters are restricted: @!$%&'*+/=?^_`{|}~-")
    } else if (users.toLocaleLowerCase().includes(username.toLocaleLowerCase())) {
      throw new Error("Username is already taken")
    }
    else finUsername = username.trim();

    if (email.length < 1) {
      throw new Error("Email is required")
    } else if (!email.match(emailRegex)) {
      throw new Error("Invalid email format")
    } else if (users.toLocaleLowerCase().includes(email.toLocaleLowerCase())) {
      throw new Error("Email is already taken")
    } else if (email != email.toLocaleLowerCase()) {
      throw new Error("Email must be in lowercase")
    }
    else finEmail = email.trim();

    if (password.length < 1) {
      throw new Error("Password is required")
    } else if (password.length < 8) {
      throw new Error("Password must be equal or more than 8 characters")
    } else if (password.length > 20) {
      throw new Error("Password must be equal or less than 20 characters")
    } else finPassword = password;

    return new User(this.firstName, this.lastName, finUsername, finEmail, finPassword)
  }
}