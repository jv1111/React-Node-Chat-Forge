import { Formik, Form } from "formik";
import { Link } from "react-router-dom";

import AuthCard from "../../components/auth/AuthCard";
import AuthFormHeader from "../../components/auth/AuthFormHeader";
import AuthPanel from "../../components/auth/AuthPanel";
import Logo from "../../components/auth/Logo";
import PasswordInput from "../../components/auth/PasswordInput";

import Button from "../../components/ui/Button";
import Input from "../../components/ui/Input";

const initialValues = {
  email: "",
  password: "",
};

const Login = () => {
  const login = async (values, { setSubmitting }) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 1200));
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
          title="Welcome back"
          description="Sign in to manage your API keys and chat integrations."
        />

        <Formik initialValues={initialValues} onSubmit={login}>
          {({ isSubmitting }) => (
            <Form className="flex flex-col gap-5">
              <Input
                name="email"
                label="Email"
                type="email"
                placeholder="you@company.com"
                autoComplete="email"
              />

              <PasswordInput
                name="password"
                placeholder="••••••••••"
                autoComplete="current-password"
              />

              <Button type="submit" loading={isSubmitting}>
                Sign In
              </Button>
            </Form>
          )}
        </Formik>

        <p className="text-center text-sm text-white/40">
          New to ChatForge?{" "}
          <Link
            to="/register"
            className="font-medium text-primary hover:text-secondary"
          >
            Create an account
          </Link>
        </p>
      </section>
    </AuthCard>
  );
};

export default Login;
