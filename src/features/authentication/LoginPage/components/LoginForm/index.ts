"use client";

import LoginForm from "./LoginForm";
import { withLoginForm } from "./withLoginForm";

const ConnectedLoginForm = withLoginForm(LoginForm);

export { ConnectedLoginForm as LoginForm };
