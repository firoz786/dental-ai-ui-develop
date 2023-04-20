import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { BrowserRouter as Router } from "react-router-dom";
import PatientSignup from "../PatientSignup";
import renderer from "react-test-renderer";

const handlePatientSignupTest = () => {
  return (
    <Router>
      <PatientSignup />
    </Router>
  );
};

jest.setTimeout(3000);

describe("Testing Sign up for unit testing", () => {
  window.matchMedia =
    window.matchMedia ||
    function () {
      return {
        matches: false,
        addListener: function () {},
        removeListener: function () {},
      };
    };
  // 1
  test("Testing Page rendering", () => {
    render(handlePatientSignupTest());
  });
  // 2
  test("testing for the sign up page title", () => {
    render(handlePatientSignupTest());
    const SignupTitle = screen.getByText("Sign up with Ivory AI");
    expect(SignupTitle).toBeInTheDocument();
  });
  // 3
  test("testing for the sign up page subtitle", () => {
    render(handlePatientSignupTest());
    const SignupSubtitle = screen.getByText(
      "and experience the revolution in high tech dental care..."
    );
    expect(SignupSubtitle).toBeInTheDocument();
  });
  // 4
  test("testing for the Name input tag label", () => {
    render(handlePatientSignupTest());
    const SignupSubtitle = screen.getByText("Name");
    expect(SignupSubtitle).toBeInTheDocument();
  });
  // 5
  test("testing for the Username input tag label", () => {
    render(handlePatientSignupTest());
    const Name = screen.getByText("Username");
    expect(Name).toBeInTheDocument();
  });
  // 6
  test("testing for the Password input tag label", () => {
    render(handlePatientSignupTest());
    const Password = screen.getByText("Password");
    expect(Password).toBeInTheDocument();
  });
  // 7
  test("testing for the Confirm Password input tag label", () => {
    render(handlePatientSignupTest());
    const ConfirmPassword = screen.getByText("Confirm Password");
    expect(ConfirmPassword).toBeInTheDocument();
  });
  // 8
  test("testing for the Gender input tag label", () => {
    render(handlePatientSignupTest());
    const Gender = screen.getByText("Gender");
    expect(Gender).toBeInTheDocument();
  });
  // 9
  test("testing for the email input tag label", () => {
    render(handlePatientSignupTest());
    const Email = screen.getByText("Email");
    expect(Email).toBeInTheDocument();
  });
  // 10
  test("testing for the Address input tag label", () => {
    render(handlePatientSignupTest());
    const Address = screen.getByText("Address");
    expect(Address).toBeInTheDocument();
  });
  // 11
  test("testing for the Apartment input tag label", () => {
    render(handlePatientSignupTest());
    const Apartment = screen.getByText("Apartment / Suite Etc.,");
    expect(Apartment).toBeInTheDocument();
  });
  // 12
  test("testing for the City input tag label", () => {
    render(handlePatientSignupTest());
    const City = screen.getByText("City");
    expect(City).toBeInTheDocument();
  });
  // 13
  test("testing for the State input tag label", () => {
    render(handlePatientSignupTest());
    const State = screen.getByText("State / Province");
    expect(State).toBeInTheDocument();
  });
  // 14
  test("testing for the Country input tag label", () => {
    render(handlePatientSignupTest());
    const Country = screen.getByText("Country");
    expect(Country).toBeInTheDocument();
  });
  // 15
  test("testing for the Zip Code input tag label", () => {
    render(handlePatientSignupTest());
    const ZipCode = screen.getByText("Zip Code");
    expect(ZipCode).toBeInTheDocument();
  });
  // 16
  test("testing for the Insurance ID input tag label", () => {
    render(handlePatientSignupTest());
    const InsuranceID = screen.getByText("Insurance ID");
    expect(InsuranceID).toBeInTheDocument();
  });
  // 17
  test("testing for the Citizen ID input tag label", () => {
    render(handlePatientSignupTest());
    const CitizenID = screen.getByText("Citizen ID");
    expect(CitizenID).toBeInTheDocument();
  });
  // 18
  test("testing for the Blood Group input tag label", () => {
    render(handlePatientSignupTest());
    const BloodGroup = screen.getByText("Blood Group");
    expect(BloodGroup).toBeInTheDocument();
  });

  // 19
  test("testing for name input tag render", () => {
    render(handlePatientSignupTest());
    const NameInput = screen.getByTestId("jest-input-name");
    expect(NameInput).toBeInTheDocument();
  });
  // 20
  test("testing for Username input tag render", () => {
    render(handlePatientSignupTest());
    const userNameInput = screen.getByTestId("jest-input-username");
    expect(userNameInput).toBeInTheDocument();
  });
  // 21
  test("testing for Password input tag render", () => {
    render(handlePatientSignupTest());
    const PasswordInput = screen.getByTestId("jest-input-password");
    expect(PasswordInput).toBeInTheDocument();
  });
  // 22
  test("testing for Confirm Password input tag render", () => {
    render(handlePatientSignupTest());
    const ConfirmPasswordInput = screen.getByTestId(
      "jest-input-confirm-password"
    );
    expect(ConfirmPasswordInput).toBeInTheDocument();
  });
  // 23
  test("testing for gender input tag render", () => {
    render(handlePatientSignupTest());
    const GenderInput = screen.getByTestId("jest-input-gender");
    expect(GenderInput).toBeInTheDocument();
  });
  // 24
  test("testing for email input tag render", () => {
    render(handlePatientSignupTest());
    const EmailInput = screen.getByTestId("jest-input-email");
    expect(EmailInput).toBeInTheDocument();
  });
  // 25
  test("testing for phone input tag render", () => {
    render(handlePatientSignupTest());
    const phoneInput = screen.getByTestId("jest-input-phone");
    expect(phoneInput).toBeInTheDocument();
  });
  // 26
  test("testing for Address input tag render", () => {
    render(handlePatientSignupTest());
    const addressInput = screen.getByTestId("jest-input-address");
    expect(addressInput).toBeInTheDocument();
  });
  // 27
  test("testing for Apartment input tag render", () => {
    render(handlePatientSignupTest());
    const apartmentInput = screen.getByTestId("jest-input-apartment");
    expect(apartmentInput).toBeInTheDocument();
  });
  // 28
  test("testing for City input tag render", () => {
    render(handlePatientSignupTest());
    const cityInput = screen.getByTestId("jest-input-city");
    expect(cityInput).toBeInTheDocument();
  });
  // 29
  test("testing for State input tag render", () => {
    render(handlePatientSignupTest());
    const stateInput = screen.getByTestId("jest-input-state");
    expect(stateInput).toBeInTheDocument();
  });
  // 30
  test("testing for country input tag render", () => {
    render(handlePatientSignupTest());
    const countryInput = screen.getByTestId("jest-input-country");
    expect(countryInput).toBeInTheDocument();
  });
  // 31
  test("testing for insurance input tag render", () => {
    render(handlePatientSignupTest());
    const insuranceInput = screen.getByTestId("jest-input-insuranceid");
    expect(insuranceInput).toBeInTheDocument();
  });
  // 32
  test("testing for citizenid input tag render", () => {
    render(handlePatientSignupTest());
    const citizenidInput = screen.getByTestId("jest-input-citizenid");
    expect(citizenidInput).toBeInTheDocument();
  });
  // 33
  test("testing for bloodgroup input tag render", () => {
    render(handlePatientSignupTest());
    const bloodgroupInput = screen.getByTestId("jest-input-bloodgroup");
    expect(bloodgroupInput).toBeInTheDocument();
  });
  // 34
  test("testing for signupbtn render", () => {
    render(handlePatientSignupTest());
    const signupbtnInput = screen.getByTestId("jest-signup-btn");
    expect(signupbtnInput).toBeInTheDocument();
  });
  // 35
  test("testing for signupbgimage render", () => {
    render(handlePatientSignupTest());
    const signupbgimage = screen.getByTestId("jest-signupbgimage");
    expect(signupbgimage).toBeInTheDocument();
  });
  // 36
  test("testing for Copyright text render", () => {
    render(handlePatientSignupTest());
    const signupbgimage = screen.getByText(
      "Copyright © 2023. All Rights Reserved."
    );
    expect(signupbgimage).toBeInTheDocument();
  });
  // 37
  test("testing for Ivory AI logo render", () => {
    render(handlePatientSignupTest());
    const signupbgimage = screen.getByTestId("jest-ivory-logo");
    expect(signupbgimage).toBeInTheDocument();
  });

  // 38
  test("testing for error message for mandatory name", async () => {
    render(handlePatientSignupTest());
    const testByTestId = screen.getByTestId("jest-signup-btn");
    fireEvent.click(testByTestId);
    await new Promise((r) => setTimeout(r, 1000));
    const enterName = screen.getByText("Please enter your Name!");
    expect(enterName).toBeInTheDocument();
  });
  // 39
  test("testing for error message when user enters white spaces in name", async () => {
    render(handlePatientSignupTest());
    const testByTestId = screen.getByTestId("jest-input-name");
    expect(testByTestId).toBeInTheDocument();
    userEvent.type(testByTestId, "  ");
    await new Promise((r) => setTimeout(r, 1000));
    const testByText = screen.getByText("No white spaces");
    expect(testByText).toBeInTheDocument();
  });
  // 40
  test("testing for error message for mandatory username", async () => {
    render(handlePatientSignupTest());
    const testByTestId = screen.getByTestId("jest-signup-btn");
    fireEvent.click(testByTestId);
    await new Promise((r) => setTimeout(r, 1000));
    const testByText = screen.getByText("Please enter your Username!");
    expect(testByText).toBeInTheDocument();
  });
  // 41
  test("testing for error message when user enter less characters", async () => {
    render(handlePatientSignupTest());
    const testByTestId = screen.getByTestId("jest-input-username");
    expect(testByTestId).toBeInTheDocument();
    userEvent.type(testByTestId, "i");
    await new Promise((r) => setTimeout(r, 1000));
    const testByText = screen.getByText("Please enter minimum 8 characters");
    expect(testByText).toBeInTheDocument();
  });
  // 42
  test("testing for error message when user enters white spaces in username", async () => {
    render(handlePatientSignupTest());
    const testByTestId = screen.getByTestId("jest-input-username");
    expect(testByTestId).toBeInTheDocument();
    userEvent.type(testByTestId, "  ");
    await new Promise((r) => setTimeout(r, 1000));
    const testByText = screen.getByText("No white spaces");
    expect(testByText).toBeInTheDocument();
  });
  // 43
  test("testing for error message when user enters other symbols in username", async () => {
    render(handlePatientSignupTest());
    const testByTestId = screen.getByTestId("jest-input-username");
    expect(testByTestId).toBeInTheDocument();
    userEvent.type(testByTestId, "iamrk+");
    await new Promise((r) => setTimeout(r, 1000));
    const testByText = screen.getByText(
      "Username can only contain letters, numbers, fullstops, and underscores."
    );
    expect(testByText).toBeInTheDocument();
  });
  // 44
  test("testing for error message for mandatory password", async () => {
    render(handlePatientSignupTest());
    const testByTestId = screen.getByTestId("jest-signup-btn");
    fireEvent.click(testByTestId);
    await new Promise((r) => setTimeout(r, 1000));
    const testByText = screen.getByText("Enter Password");
    expect(testByText).toBeInTheDocument();
  });
  // 45
  test("testing for error message when user enters less than 8 characters", async () => {
    render(handlePatientSignupTest());
    const testByTestId = screen.getByTestId("jest-input-password");
    expect(testByTestId).toBeInTheDocument();
    userEvent.type(testByTestId, "p");
    await new Promise((r) => setTimeout(r, 1000));
    const testByText = screen.getByText(
      "Password must be atleast 8 characters"
    );
    expect(testByText).toBeInTheDocument();
  });
  // 46
  test("testing for error message when user enters wrong password format", async () => {
    render(handlePatientSignupTest());
    const testByTestId = screen.getByTestId("jest-input-password");
    expect(testByTestId).toBeInTheDocument();
    userEvent.type(testByTestId, "p");
    await new Promise((r) => setTimeout(r, 1000));
    const testByText = screen.getByText(
      "Password must contain first letter capital and at least one alphanumeric character and a symbol from @#$%^&*"
    );
    expect(testByText).toBeInTheDocument();
  });
  // 47
  test("testing for error message when user enters empty spaces", async () => {
    render(handlePatientSignupTest());
    const testByTestId = screen.getByTestId("jest-input-password");
    expect(testByTestId).toBeInTheDocument();
    userEvent.type(testByTestId, " ");
    await new Promise((r) => setTimeout(r, 1000));
    const testByText = screen.getByText("No white spaces");
    expect(testByText).toBeInTheDocument();
  });
  // 48
  test("testing for error message for mandatory re enter password", async () => {
    render(handlePatientSignupTest());
    const testByTestId = screen.getByTestId("jest-signup-btn");
    fireEvent.click(testByTestId);
    await new Promise((r) => setTimeout(r, 1000));
    const testByText = screen.getByText("Enter Password");
    expect(testByText).toBeInTheDocument();
  });
  // 49
  test("testing for error message when user enters less than 8 characters while re entering", async () => {
    render(handlePatientSignupTest());
    const testByTestId = screen.getByTestId("jest-input-confirm-password");
    expect(testByTestId).toBeInTheDocument();
    userEvent.type(testByTestId, "p");
    await new Promise((r) => setTimeout(r, 1000));
    const testByText = screen.getByText(
      "Password must be atleast 8 characters"
    );
    expect(testByText).toBeInTheDocument();
  });
  // 50
  test("testing for error message when user enters wrong password format in re enter password", async () => {
    render(handlePatientSignupTest());
    const testByTestId = screen.getByTestId("jest-input-confirm-password");
    expect(testByTestId).toBeInTheDocument();
    userEvent.type(testByTestId, "p");
    await new Promise((r) => setTimeout(r, 1000));
    const testByText = screen.getByText(
      "Password must contain first letter capital and at least one alphanumeric character and a symbol from @#$%^&*"
    );
    expect(testByText).toBeInTheDocument();
  });
  // 51
  test("testing for error message when user enters empty spaces in re enter password", async () => {
    render(handlePatientSignupTest());
    const testByTestId = screen.getByTestId("jest-input-confirm-password");
    expect(testByTestId).toBeInTheDocument();
    userEvent.type(testByTestId, " ");
    await new Promise((r) => setTimeout(r, 1000));
    const testByText = screen.getByText("No white spaces");
    expect(testByText).toBeInTheDocument();
  });
  // 52
  test("testing for error message when user enters different passwords", async () => {
    render(handlePatientSignupTest());
    const testByTestIdPassword = screen.getByTestId("jest-input-password");
    expect(testByTestIdPassword).toBeInTheDocument();
    userEvent.type(testByTestIdPassword, "Qwerty@123");
    const testByTestId = screen.getByTestId("jest-input-confirm-password");
    expect(testByTestId).toBeInTheDocument();
    userEvent.type(testByTestId, "Qwerty@124");
    await new Promise((r) => setTimeout(r, 1000));
    const testByText = screen.getByText(
      "The two passwords that you entered do not match!"
    );
    expect(testByText).toBeInTheDocument();
  });
  // 53
  test("testing for error message for mandatory gender", async () => {
    render(handlePatientSignupTest());
    const testByTestId = screen.getByTestId("jest-input-gender");
    fireEvent.click(testByTestId);
    await new Promise((r) => setTimeout(r, 1000));
    const testByText = screen.getByText("Select Gender");
    expect(testByText).toBeInTheDocument();
  });
  // 54
  test("testing for error message for mandatory email", async () => {
    render(handlePatientSignupTest());
    const testByTestId = screen.getByTestId("jest-signup-btn");
    fireEvent.click(testByTestId);
    await new Promise((r) => setTimeout(r, 1000));
    const testByText = screen.getByText("Enter email");
    expect(testByText).toBeInTheDocument();
  });
  // 55
  test("testing for error message when user enters wrong email format", async () => {
    render(handlePatientSignupTest());
    const testByTestId = screen.getByTestId("jest-input-email");
    expect(testByTestId).toBeInTheDocument();
    userEvent.type(testByTestId, "kahbarbvrwbn.com");
    await new Promise((r) => setTimeout(r, 1000));
    const testByText = screen.getByText("Enter valid email address");
    expect(testByText).toBeInTheDocument();
  });
  // 56
  test("testing for error message for mandatory Phone number", async () => {
    render(handlePatientSignupTest());
    const testByTestId = screen.getByTestId("jest-signup-btn");
    fireEvent.click(testByTestId);
    await new Promise((r) => setTimeout(r, 1000));
    const testByText = screen.getByText(
      "Please enter phone number with country code"
    );
    expect(testByText).toBeInTheDocument();
  });
  // 57
  test("testing for error message for mandatory address", async () => {
    render(handlePatientSignupTest());
    const testByTestId = screen.getByTestId("jest-signup-btn");
    fireEvent.click(testByTestId);
    await new Promise((r) => setTimeout(r, 1000));
    const testByText = screen.getByText("Enter Address");
    expect(testByText).toBeInTheDocument();
  });
  // 58
  test("testing for error message for mandatory apartment", async () => {
    render(handlePatientSignupTest());
    const testByTestId = screen.getByTestId("jest-signup-btn");
    fireEvent.click(testByTestId);
    await new Promise((r) => setTimeout(r, 1000));
    const testByText = screen.getByText("Enter Apartment / Suite Etc.,");
    expect(testByText).toBeInTheDocument();
  });
  // 59
  test("testing for error message for mandatory city", async () => {
    render(handlePatientSignupTest());
    const testByTestId = screen.getByTestId("jest-signup-btn");
    fireEvent.click(testByTestId);
    await new Promise((r) => setTimeout(r, 1000));
    const testByText = screen.getByText("Enter City");
    expect(testByText).toBeInTheDocument();
  });
  // 60
  test("testing for error message for mandatory state", async () => {
    render(handlePatientSignupTest());
    const testByTestId = screen.getByTestId("jest-signup-btn");
    fireEvent.click(testByTestId);
    await new Promise((r) => setTimeout(r, 1000));
    const testByText = screen.getByText("Enter State / Province");
    expect(testByText).toBeInTheDocument();
  });
  // 61
  test("testing for error message for mandatory country", async () => {
    render(handlePatientSignupTest());
    const testByTestId = screen.getByTestId("jest-signup-btn");
    fireEvent.click(testByTestId);
    await new Promise((r) => setTimeout(r, 1000));
    const testByText = screen.getByText("Enter Country");
    expect(testByText).toBeInTheDocument();
  });
  // 62
  test("testing for error message for mandatory zip code", async () => {
    render(handlePatientSignupTest());
    const testByTestId = screen.getByTestId("jest-signup-btn");
    fireEvent.click(testByTestId);
    await new Promise((r) => setTimeout(r, 1000));
    const testByText = screen.getByText("Enter Zip code");
    expect(testByText).toBeInTheDocument();
  });
  // 63
  test("testing for error message for mandatory citizen id", async () => {
    render(handlePatientSignupTest());
    const testByTestId = screen.getByTestId("jest-signup-btn");
    fireEvent.click(testByTestId);
    await new Promise((r) => setTimeout(r, 1000));
    const testByText = screen.getByText("Enter Citizen ID");
    expect(testByText).toBeInTheDocument();
  });
  // 64
  test("testing for error message for mandatory blood group", async () => {
    render(handlePatientSignupTest());
    const testByTestId = screen.getByTestId("jest-signup-btn");
    fireEvent.click(testByTestId);
    await new Promise((r) => setTimeout(r, 1000));
    const testByText = screen.getByText("Select blood group");
    expect(testByText).toBeInTheDocument();
  });
  // 65 - snapshot
  test("Snapshot testing for PatientLoginPage", () => {
    const rendderingPatientSignupPage = renderer
      .create(handlePatientSignupTest())
      .toJSON();
    expect(rendderingPatientSignupPage).toMatchSnapshot();
  });
});
