import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import PatientLogin from "../Login";
import { BrowserRouter as Router } from "react-router-dom";
import userEvent from "@testing-library/user-event";
import renderer from "react-test-renderer";
const LoginPage = () => {
  return (
    <Router>
      <PatientLogin />
    </Router>
  );
};

jest.setTimeout(30000);

describe("Writing test case for Patient Login Page", () => {
  window.matchMedia =
    window.matchMedia ||
    function () {
      return {
        matches: false,
        addListener: function () {},
        removeListener: function () {},
      };
    };
  test("testing for PatientLogin page rendering or not", () => {
    render(<LoginPage />);
  });
  test("1, testing  for 'Ivory-logo' appearing or not", () => {
    render(<LoginPage />);
    const ivoryLogo = screen.getByTestId("Ivory-logo");
    expect(ivoryLogo).toBeInTheDocument();
  });
  test("2, testing for 'Login to' text rendering or not", () => {
    render(<LoginPage />);
    const LoginToText = screen.getByText("Login to");
    expect(LoginToText).toBeInTheDocument();
  });
  test("3, testing for 'your Account' text rendering or not", () => {
    render(<LoginPage />);
    const yourAccount = screen.getByText("your Account");
    expect(yourAccount).toBeInTheDocument();
  });
  test("4, testing for 'Username' text rendering or not", () => {
    render(<LoginPage />);
    const UserName = screen.getByText("Username");
    expect(UserName).toBeInTheDocument();
  });
  test("5, testing for 'user-name-input' input tag appearing or not", () => {
    render(<LoginPage />);
    const userNameInput = screen.getByTestId("user-name-input");
    expect(userNameInput).toBeInTheDocument();
  });
  test("6, testing for 'Password' text rendering or not", () => {
    render(<LoginPage />);
    const Password = screen.getByText("Password");
    expect(Password).toBeInTheDocument();
  });
  test("7, testing for 'password-input' input tag appearing or not", () => {
    render(<LoginPage />);
    const passwordInput = screen.getByTestId("password-input");
    expect(passwordInput).toBeInTheDocument();
  });
  test("8, testing for 'Forgot Password' text rendering or not", () => {
    render(<LoginPage />);
    const ForgotPassword = screen.getByText("Forgot Password");
    expect(ForgotPassword).toBeInTheDocument();
  });
  test("9, test case for 'remember-me-check-box' check-box is appearing or not", () => {
    render(<LoginPage />);
    const rememberMeCheckbox = screen.getByTestId("remember-me-check-box");
    expect(rememberMeCheckbox).toBeInTheDocument();
  });
  test("10, testing for 'Remember me' text rendering or not", () => {
    render(<LoginPage />);
    const rememberMe = screen.getByText("Remember me");
    expect(rememberMe).toBeInTheDocument();
  });
  test("11, test case for 'login-submit-btn' is appearing or not", () => {
    render(<LoginPage />);
    const loginSubmitBtn = screen.getByTestId("login-submit-btn");
    expect(loginSubmitBtn).toBeInTheDocument();
  });
  test("12, test case for 'Login' text on loginBtn rendering or not", () => {
    render(<LoginPage />);
    const login = screen.getByText("Login");
    expect(login).toBeInTheDocument();
  });
  //   test("13 test case for 'Copy rights' text rendering or not", () => {
  //     render(<LoginPage />);
  //     const copyRightsText = screen.getByText(
  //       "Copyright @ 2023. All Rights Reserved"
  //     );
  //     expect(copyRightsText).toBeInTheDocument();
  //   });
  test("14, test case for 'New Here?' text rendering or not", () => {
    render(<LoginPage />);
    const newHere = screen.getByText("New Here?");
    expect(newHere).toBeInTheDocument();
  });
  test("15, test case for 'suggestion text in login page' text rendering or not", () => {
    render(<LoginPage />);
    const suggestionText = screen.getByText(
      "Sign up and discover a whole new World of AI based treatment"
    );
    expect(suggestionText).toBeInTheDocument();
  });
  test("16, test case for 'sign-up-btn' in login page is appearing or not", () => {
    render(<LoginPage />);
    const signUpBtn = screen.getByTestId("sign-up-btn");
    expect(signUpBtn).toBeInTheDocument();
  });
  test("17, test case for 'Sign Up' text on Sign-up-Btn in login page is rendering or not", () => {
    render(<LoginPage />);
    const signUp = screen.getByText("Sign up");
    expect(signUp).toBeInTheDocument();
  });
  test("18, test case to username for error message", async () => {
    render(<LoginPage />);
    const loginSubmitBtn = screen.getByTestId("login-submit-btn");
    fireEvent.click(loginSubmitBtn);
    await new Promise((r) => setTimeout(r, 1000));
    const enterUserName = screen.getByText("Please enter your username!");
    expect(enterUserName).toBeInTheDocument();
  });
  test("19, test case to password for error message", async () => {
    render(<LoginPage />);
    const loginSubmitBtn = screen.getByTestId("login-submit-btn");
    fireEvent.click(loginSubmitBtn);
    await new Promise((r) => setTimeout(r, 1000));
    const enterPassword = screen.getByText("Please enter your password!");
    expect(enterPassword).toBeInTheDocument();
  });
  test("20, test case for error message when user enter less characters in userName Input", async () => {
    render(<LoginPage />);
    const userNameInput = screen.getByTestId("user-name-input");
    userEvent.type(userNameInput, "Bh");
    await new Promise((r) => setTimeout(r, 1000));
    const enterMinChar = screen.getByText("Please enter minimum 4 characters");
    expect(enterMinChar).toBeInTheDocument();
  });
  test("21, test case for error message when user enter more than 30 characters in userName Input", async () => {
    render(<LoginPage />);
    const userNameInput = screen.getByTestId("user-name-input");
    userEvent.type(userNameInput, "bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb");
    await new Promise((r) => setTimeout(r, 1000));
    const enterMaxChar = screen.getByText("Please enter miximum 30 characters");
    expect(enterMaxChar).toBeInTheDocument();
  });
  test("22, test case for error message when user enter only white spaces in userName Input", async () => {
    render(<LoginPage />);
    const userNameInput = screen.getByTestId("user-name-input");
    userEvent.type(userNameInput, "      ");
    await new Promise((r) => setTimeout(r, 1000));
    const whiteSpaces = screen.getByText("No white spaces");
    expect(whiteSpaces).toBeInTheDocument();
  });
  test("23, test case for error message when user enter only white spaces and enter less than 4 characters in userName Input", async () => {
    render(<LoginPage />);
    const userNameInput = screen.getByTestId("user-name-input");
    userEvent.type(userNameInput, "  ");
    await new Promise((r) => setTimeout(r, 1000));
    const whiteSpaces = screen.getByText("No white spaces");
    expect(whiteSpaces).toBeInTheDocument();
    const enterMinChar = screen.getByText("Please enter minimum 4 characters");
    expect(enterMinChar).toBeInTheDocument();
  });
  test("24, test case for error message when user only enter white spaces and enter more than 30 characters", async () => {
    render(<LoginPage />);
    const userNameInput = screen.getByTestId("user-name-input");
    userEvent.type(userNameInput, "                                ");
    await new Promise((r) => setTimeout(r, 1000));
    const whiteSpaces = screen.getByText("No white spaces");
    expect(whiteSpaces).toBeInTheDocument();
    const enterMaxChar = screen.getByText("Please enter miximum 30 characters");
    expect(enterMaxChar).toBeInTheDocument();
  });
  test("25, test case for error message when user enter wrong pattern in Password Input", async () => {
    render(<LoginPage />);
    const passwordInput = screen.getByTestId("password-input");
    userEvent.type(passwordInput, "bhaf");
    await new Promise((r) => setTimeout(r, 1000));
    const passwordPattern = screen.getByText(
      "Password must contain a capital letter and at least one alphanumeric character and one symbol from @#$%^&*_"
    );
    expect(passwordPattern).toBeInTheDocument();
  });
  test("26, test case for error message when user enter only white spaces in Password Input", async () => {
    render(<LoginPage />);
    const passwordInput = screen.getByTestId("password-input");
    userEvent.type(passwordInput, "  ");
    await new Promise((r) => setTimeout(r, 1000));
    const whiteSpaces = screen.getByText("No white spaces");
    expect(whiteSpaces).toBeInTheDocument();
    const passwordPattern = screen.getByText(
      "Password must contain a capital letter and at least one alphanumeric character and one symbol from @#$%^&*_"
    );
    expect(passwordPattern).toBeInTheDocument();
  });
  test("27, test case for error message when user enter only white spaces more than 30 characters in Password Input", async () => {
    render(<LoginPage />);
    const passwordInput = screen.getByTestId("password-input");
    userEvent.type(passwordInput, "                                ");
    await new Promise((r) => setTimeout(r, 1000));
    const enterMaxChar = screen.getByText(
      "Please enter miximum 30 characters only"
    );
    expect(enterMaxChar).toBeInTheDocument();
    const whiteSpaces = screen.getByText("No white spaces");
    expect(whiteSpaces).toBeInTheDocument();
    const passwordPattern = screen.getByText(
      "Password must contain a capital letter and at least one alphanumeric character and one symbol from @#$%^&*_"
    );
    expect(passwordPattern).toBeInTheDocument();
  });
  test("28, test case for error message when user enter more than 30 characters and without a perfect password pattern in Password Input", async () => {
    render(<LoginPage />);
    const passwordInput = screen.getByTestId("password-input");
    userEvent.type(passwordInput, "                                ");
    await new Promise((r) => setTimeout(r, 1000));
    const enterMaxChar = screen.getByText(
      "Please enter miximum 30 characters only"
    );
    expect(enterMaxChar).toBeInTheDocument();
    const passwordPattern = screen.getByText(
      "Password must contain a capital letter and at least one alphanumeric character and one symbol from @#$%^&*_"
    );
    expect(passwordPattern).toBeInTheDocument();
  });
  test("29, test case for error message when user enter more than 30 characters and with proper password pattern in Password Input", async () => {
    render(<LoginPage />);
    const passwordInput = screen.getByTestId("password-input");
    userEvent.type(
      passwordInput,
      "Bhargav@12bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb"
    );
    await new Promise((r) => setTimeout(r, 1000));
    const enterMaxChar = screen.getByText(
      "Please enter miximum 30 characters only"
    );
    expect(enterMaxChar).toBeInTheDocument();
  });
  test("30, test case for error message when user entered correct credentials", async () => {
    render(<LoginPage />);
    const userNameInput = screen.getByTestId("user-name-input");
    userEvent.type(userNameInput, "Bhargav");
    const passwordInput = screen.getByTestId("password-input");
    userEvent.type(passwordInput, "Bhargav@12");
    const loginSubmitBtn = screen.getByTestId("login-submit-btn");
    fireEvent.click(loginSubmitBtn);
    await new Promise((r) => setTimeout(r, 2000));
    const wrongCredetials = screen.getByText("Successfully Logged in !");
    expect(wrongCredetials).toBeInTheDocument();
  });
  test("31, test case for error message when user entered wrong credentials", async () => {
    render(<LoginPage />);
    const userNameInput = screen.getByTestId("user-name-input");
    userEvent.type(userNameInput, "Bhargavvvv");
    const passwordInput = screen.getByTestId("password-input");
    userEvent.type(passwordInput, "Bhargav@12");
    const loginSubmitBtn = screen.getByTestId("login-submit-btn");
    fireEvent.click(loginSubmitBtn);
    await new Promise((r) => setTimeout(r, 2000));
    const wrongCredetials = screen.getByText(
      "Invalid username or password. Please try again."
    );
    expect(wrongCredetials).toBeInTheDocument();
  });
  test("Snapshot testing for PatientLoginPage", () => {
    const rendderingPatientLoginPage = renderer.create(<LoginPage />).toJSON();
    expect(rendderingPatientLoginPage).toMatchSnapshot();
  });
});
