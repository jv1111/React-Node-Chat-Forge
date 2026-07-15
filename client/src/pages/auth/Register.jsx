import { Formik, Form } from "formik";
import { Link, useNavigate } from "react-router-dom";

import AuthCard from "../../components/auth/AuthCard";
import AuthFormHeader from "../../components/auth/AuthFormHeader";
import AuthPanel from "../../components/auth/AuthPanel";
import Logo from "../../components/auth/Logo";

import Button from "../../components/ui/Button";
import Input from "../../components/ui/Input";
import PasswordInput from "../../components/auth/PasswordInput";
import { registerSchema } from "../../validation";
import * as authService from "../../services/auth.service";

const initialValues = {
  username: "",
  password: "",
  confirmPassword: "",
};

const Register = () => {
  const navigate = useNavigate();

  const register = async (values, { setSubmitting, setStatus }) => {
    try {
      setStatus(null);

      const response = await authService.register({
        username: values.username,
        password: values.password,
      });

      console.log(response);

      navigate("/");
    } catch (error) {
      setStatus(error.response?.data?.message ?? "Something went wrong.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <AuthCard>
      <AuthPanel
        title="Ship your first chat endpoint today."
        description="Create a free ChatForge account to get an API key, sandbox credits, and access to every SDK in minutes."
        endpoint="forge.keys.create"
        features={[
          "Free sandbox credits on signup",
          "No credit card required",
          "Full API access in under 5 minutes",
        ]}
      >
        <pre className="overflow-x-auto p-4 text-[12.5px] leading-relaxed">
          <code>
            <span className="text-secondary">POST</span>{" "}
            <span className="text-white/70">/v1/api-keys</span>
            {"\n\n"}
            <span className="text-white/40">{"{"}</span>
            {"\n  "}
            <span className="text-primary">"plan"</span>
            <span className="text-white/40">:</span>{" "}
            <span className="text-white/70">"sandbox"</span>
            <span className="text-white/40">,</span>
            {"\n  "}
            <span className="text-primary">"credits"</span>
            <span className="text-white/40">:</span>{" "}
            <span className="text-secondary">10000</span>
            {"\n"}
            <span className="text-white/40">{"}"}</span>
            {"\n\n"}
            <span className="text-success/80">201 · created</span>
            {"\n"}
            <span className="text-white/60">key: sk_test_•••9c1e</span>
            <span className="animate-[forge-blink_1s_steps(1)_infinite] text-primary">
              ▍
            </span>
          </code>
        </pre>
      </AuthPanel>

      <section className="auth-form">
        <div className="md:hidden">
          <Logo />
        </div>

        <AuthFormHeader
          title="Create your account"
          description="Start building with the ChatForge API for free."
        />

        <Formik
          initialValues={initialValues}
          validationSchema={registerSchema}
          validateOnBlur
          validateOnChange={false}
          onSubmit={register}
        >
          {({ isSubmitting, status }) => (
            <Form className="flex flex-col gap-5">
              <Input
                name="username"
                label="Username"
                placeholder="johnsmith"
                autoComplete="username"
              />

              <PasswordInput
                name="password"
                label="Password"
                placeholder="At least 8 characters"
                autoComplete="new-password"
              />

              <PasswordInput
                name="confirmPassword"
                label="Confirm Password"
                placeholder="Re-enter your password"
                autoComplete="new-password"
              />

              {status && (
                <p className="rounded-lg border border-danger/20 bg-danger/10 px-3 py-2 text-sm text-danger">
                  {status}
                </p>
              )}

              <Button type="submit" loading={isSubmitting}>
                Create Account
              </Button>
            </Form>
          )}
        </Formik>

        <p className="text-center text-[11px] leading-relaxed text-white/30">
          By creating an account you agree to our{" "}
          <Link to="/terms" className="text-white/50 hover:text-primary">
            Terms of Service
          </Link>{" "}
          and{" "}
          <Link to="/privacy" className="text-white/50 hover:text-primary">
            Privacy Policy
          </Link>
          .
        </p>

        <p className="text-center text-sm text-white/40">
          Already have an account?{" "}
          <Link
            to="/"
            className="font-medium text-primary hover:text-secondary"
          >
            Sign In
          </Link>
        </p>
      </section>
    </AuthCard>
  );
};

export default Register;
