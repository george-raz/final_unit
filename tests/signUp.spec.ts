import { expect } from "chai";
import SignUpForm from "../App/SignUpForm";

describe("Sing-up form suite", () => {
  it("Sign-up a new user", () => {
    let expected = {
      firstName: 'firstTest',
      lastName: 'lastTest',
      username: 'nickname',
      email: 'test@gmail.com',
      password: 'testpassword123'
    };
    let actual = new SignUpForm("firstTest", "lastTest").signUp("nickname", "test@gmail.com", "testpassword123");
    expect(actual).to.deep.equal(expected)
  })

  it("Sign-up with username of a min length", () => {
    let expected = 3;
    let actual = new SignUpForm("Jack", "Slim").signUp("joj", "test@gmail.com", "qwerty123").username.length;
    expect(actual).to.equal(expected)
  })

  it("Sign-up with username of a max length", () => {
    let expected = 100;
    let longValue = "ruffinthejungleruffinthejungleruffinthejungleruffinthejungleruffinthejungleruffinthejungleruffinthej"
    let actual = new SignUpForm("Jack", "Slim").signUp(`${longValue}`, "test@gmail.com", "qwerty123").username.length;
    expect(actual).to.equal(expected)
  })

  it("Check that spaces are trimmed for entered username during sign-up", () => {
    let expected = "test";
    let actual = new SignUpForm("Jack", "Slim").signUp(`  test  `, "test@gmail.com", "qwerty123").username;
    expect(actual).to.equal(expected)
  })

  it("Sign-up with username containing allowed special characters", () => {
    let expected = "test(#12,3.444)";
    let actual = new SignUpForm("Jack", "Slim").signUp(`test(#12,3.444)`, "test@gmail.com", "qwerty123").username;
    expect(actual).to.equal(expected)
  })

  it("Sign-up with username containing mixed case characters", () => {
    let expected = "tEsT";
    let actual = new SignUpForm("Jack", "Slim").signUp(`tEsT`, "test@gmail.com", "qwerty123").username;
    expect(actual).to.equal(expected)
  })

  it("Sign-up with not taken username", () => {
    let expected = "test";
    let actual = new SignUpForm("Jack", "Slim").signUp("test", "test@gmail.com", "qwerty123").username;
    expect(actual).to.equal(expected)
  })

  it("Sign-up with not taken email", () => {
    let expected = "test@gmail.com";
    let actual = new SignUpForm("Jack", "Slim").signUp("test", "test@gmail.com", "qwerty123").email;
    expect(actual).to.equal(expected)
  })

  it("Check that spaces are trimmed for entered email during sign-up", () => {
    let expected = "test@gmail.com";
    let actual = new SignUpForm("Jack", "Slim").signUp(`test`, "   test@gmail.com   ", "qwerty123").email;
    expect(actual).to.equal(expected)
  })

  it("Sign-up with password of a min length", () => {
    let expected = 8;
    let actual = new SignUpForm("Jack", "Slim").signUp("joj", "test@gmail.com", "qwerty12").password.length;
    expect(actual).to.equal(expected)
  })

  it("Sign-up with password of a max length", () => {
    let expected = 20;
    let actual = new SignUpForm("Jack", "Slim").signUp("joj", "test@gmail.com", "qwertyqwertyqwerty33").password.length;
    expect(actual).to.equal(expected)
  })

  it("Sign-up with password containing mixed case characters", () => {
    let expected = "qWeRty123";
    let actual = new SignUpForm("Jack", "Slim").signUp(`test`, "test@gmail.com", "qWeRty123").password;
    expect(actual).to.equal(expected)
  })
  
  it("Sign-up with password containing spaced from the edges", () => {
    let expected = 15
    let actual = new SignUpForm("Jack", "Slim").signUp(`test`, "test@gmail.com", "   qWeRty123   ").password.length;
    expect(actual).to.equal(expected)
  })

  it("Sing-up without username", () => {
    let expected = "Username is required";
    expect(() => new SignUpForm("Jack", "Slim").signUp("", "test@gmail.com", "qwerty123")).to.throw(expected)
  })

  it("Sign-up with less than minimum length username", () => {
    let expected = "Username must be equal or more than 3 characters";
    expect(() => new SignUpForm("Jack", "Slim").signUp("le", "test@gmail.com", "qwerty123")).to.throw(expected)
  })

  it("Sign-up with more than maximum length username", () => {
    let expected = "Username must be equal or less than 100 characters";
    let longValue = "ruffinthejungleruffinthejungleruffinthejungleruffinthejungleruffinthejungleruffinthejungleruffintheju"
    expect(() => new SignUpForm("Jack", "Slim").signUp(`${longValue}`, "test@gmail.com", "qwerty123")).to.throw(expected)
  })

  it("Sing-up with username containing restricted characters", () => {
    let expected = "The following characters are restricted: @!$%&'*+/=?^_`{|}~-";
    expect(() => new SignUpForm("Jack", "Slim").signUp("@!$%&'*+/=?^_`{|}~-", "test@gmail.com", "qwerty123")).to.throw(expected)
  })

  it("Sing-up with already existing username with exact match", () => {
    let expected = "Username is already taken";
    expect(() => new SignUpForm("Jack", "Slim").signUp("OleGGatOR", "test@gmail.com", "qwerty123")).to.throw(expected)
  })

  it("Sing-up with already existing username with different letter case match", () => {
    let expected = "Username is already taken";
    expect(() => new SignUpForm("Jack", "Slim").signUp("oLeggatOr", "test@gmail.com", "qwerty123")).to.throw(expected)
  })

  it("Sing-up without email", () => {
    let expected = "Email is required";
    expect(() => new SignUpForm("Jack", "Slim").signUp("test", "", "qwerty123")).to.throw(expected)
  })

  it("Sing-up with email not containing '@'", () => {
    let expected = "Invalid email format";
    expect(() => new SignUpForm("Jack", "Slim").signUp("test", "testgmail.com", "qwerty123")).to.throw(expected)
  })

  it("Sing-up with email not containing top level domain part", () => {
    let expected = "Invalid email format";
    expect(() => new SignUpForm("Jack", "Slim").signUp("test", "test@gmail", "qwerty123")).to.throw(expected)
  })
  
  it("Sing-up with email not containing local part", () => {
    let expected = "Invalid email format";
    expect(() => new SignUpForm("Jack", "Slim").signUp("test", "@gmail.com", "qwerty123")).to.throw(expected)
  })

  it("Sing-up with email containing spaces inside", () => {
    let expected = "Invalid email format";
    expect(() => new SignUpForm("Jack", "Slim").signUp("test", "test @ gma il.c om", "qwerty123")).to.throw(expected)
  })
  
  it("Sing-up with email with top level domain part separated by comma", () => {
    let expected = "Invalid email format";
    expect(() => new SignUpForm("Jack", "Slim").signUp("test", "test@gmail,com", "qwerty123")).to.throw(expected)
  })

  it("Sing-up with already existing email", () => {
    let expected = "Email is already taken";
    expect(() => new SignUpForm("Jack", "Slim").signUp("test", "jimbo@gmail.com", "qwerty123")).to.throw(expected)
  })

  it("Sing-up with email containing upper case characters", () => {
    let expected = "Invalid email format";
    expect(() => new SignUpForm("Jack", "Slim").signUp("test", "tEst@gmAil.cOm", "qwerty123")).to.throw(expected)
  })

  it("Sing-up without password", () => {
    let expected = "Password is required";
    expect(() => new SignUpForm("Jack", "Slim").signUp("test", "test@gmail.com", "")).to.throw(expected)
  })

  it("Sign-up with less than minimum length password", () => {
    let expected = "Password must be equal or more than 8 characters";
    expect(() => new SignUpForm("Jack", "Slim").signUp("test", "test@gmail.com", "qwerty1")).to.throw(expected)
  })
  
  it("Sign-up with more than maximum length password", () => {
    let expected = "Password must be equal or less than 20 characters";
    expect(() => new SignUpForm("Jack", "Slim").signUp("test", "test@gmail.com", "qwertyqwertyqwertyqwerty1")).to.throw(expected)
  })
})