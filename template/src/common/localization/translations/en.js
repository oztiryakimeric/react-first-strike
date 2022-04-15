const en = {
  translation: {
    "tr-TR": "Türkçe",
    "en-EN": "English",
    appName: "React First Strike",

    formValidation: {
      emptyField: "This field can't be empty",
      emailLabel: "E-mail",
      passwordLabel: "Password",
      wrongEmail: "Please enter a valid e-mail address",
      wrongPassword: "Your password must be at least 6 characters long",
      passwordMatch: "Password must match",
    },
    resetPasswordDialog: {
      title: "Reset your password",
      submit: "Send reset e-mail",
      sendSuccessful: "Password reset e-mail send",
      sendFail: "There is an error. Try again.",
    },
    loginDialog: {
      title: "Login",
      or: "OR",
      submit: "Login",
      loginSuccessful: "Sucessfull login",
      lostPassword: "Forgot password?",
      createAccountText: "Not registered yet?",
      createAccountLink: "Create an Account",
    },
    registerDialog: {
      title: "Create an account",
      confirmPasswordLabel: "Confirm password",
      confirmPasswordError: "Passwords don't match",
      registerSuccessful: "Account created",
      submit: "Register",
    },
    profileMenu: {
      login: "Login",
    },
    profileDialog: {
      title: "Profile",
      email: "E-mail",
      createdAt: "Account Creation Date",
      id: "ID",
      logout: "Logout",
    },
    socialSignIn: {
      success: "Login successfull",
    },
    settingsDrawer: {
      title: "Settings",
      language: "Language",
      themeMode: "Theme mode",
      themeDark: "Dark",
      themeLight: "Light",
    },
    authErrors: {
      "auth/user-not-found":
        "There is no user record corresponding to this e-mail.",
      "auth/wrong-password": "The password is invalid.",
      "auth/account-exists-with-different-credential":
        "An account already exists with the same email address but different sign-in credentials. Sign in using a provider associated with this email address.",
      "auth/email-already-in-use":
        "The email address is already in use by another account.",
      "auth/unkown-exception": "There is an error, please try again.",
    },
    homePage: {
      appName: "React First Strike",
      description:
        "Pre-configured and ready to use CRA template. To save time in setting common things -firebase, authentication, localization etc- up for new project. Just clone and start developing without wasting time in doing same stuffs for every project.",
    },
  },
};

export default en;
