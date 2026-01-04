import CommonLogo from "@/components/Others/authentication/common/CommonLogo";
import { Col, Container, Row } from "reactstrap";
import Link from "next/link";
import { useState } from "react";
import { Facebook, Linkedin, Twitter } from "react-feather";
import { Button, FormGroup, Input, Label, FormFeedback } from "reactstrap";
import {
  CreateAccount,
  DoNotAccount,
  EmailAddress,
  EnterEmailPasswordLogin,
  FacebookHeading,
  ForgotPassword,
  Password,
  RememberPassword,
  SignIn,
  SignInAccount,
  SignInWith,
  TwitterHeading,
  linkedInHeading,
} from "utils/Constant";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { loginUser } from "../../../redux/slices/authSlice";

const Login = () => {
  const [showPassWord, setShowPassWord] = useState(false);
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { loading, error } = useAppSelector((state) => state.auth);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data: any) => {
    try {
      const resultAction = await dispatch(loginUser(data));
      if (loginUser.fulfilled.match(resultAction)) {
        toast.success("Login successful");
        router.push("/dashboard/default");
      } else {
        if (resultAction.payload) {
          toast.error(resultAction.payload as string);
        } else {
          toast.error("Login failed");
        }
      }
    } catch (err) {
      toast.error("An unexpected error occurred");
    }
  };

  return (
    <Container fluid className="p-0">
      <Row className="m-0">
        <Col xs={12} className="p-0">
          <div className="login-card login-dark">
            <div>
              <div>
                <CommonLogo />
              </div>
              <div className="login-main">
                <form className="theme-form" onSubmit={handleSubmit(onSubmit)}>
                  <h4>{SignInAccount}</h4>
                  <p>{EnterEmailPasswordLogin}</p>
                  <FormGroup>
                    <Label className="col-form-label">{EmailAddress}</Label>
                    <Input
                      type="text" // Changed from email to text as username is often used
                      placeholder="Username"
                      invalid={!!errors.username}
                      {...register("username", { required: "Username is required" })}
                    />
                    {errors.username && (
                      <FormFeedback>{errors.username.message as string}</FormFeedback>
                    )}
                  </FormGroup>
                  <FormGroup>
                    <Label className="col-form-label">{Password}</Label>
                    <div className="form-input position-relative">
                      <Input
                        type={showPassWord ? "text" : "password"}
                        placeholder="*********"
                        invalid={!!errors.password}
                        {...register("password", { required: "Password is required" })}
                      />
                      <div className="show-hide">
                        <span
                          onClick={() => setShowPassWord(!showPassWord)}
                          className={!showPassWord ? "show" : ""}
                        />
                      </div>
                      {errors.password && (
                        <FormFeedback>{errors.password.message as string}</FormFeedback>
                      )}
                    </div>
                  </FormGroup>
                  <FormGroup className="mb-0 form-group">
                    <div className="checkbox p-0">
                      <Input id="checkbox1" type="checkbox" />
                      <Label className="text-muted" htmlFor="checkbox1">
                        {RememberPassword}
                      </Label>
                    </div>
                    <Link
                      className="link"
                      href="/pages/authentication/forget-pwd"
                    >
                      {ForgotPassword}
                    </Link>
                    <div className="text-end mt-3">
                      <Button
                        color="primary"
                        className="btn-block w-100"
                        type="submit"
                        disabled={loading}
                      >
                        {loading ? "Loading..." : SignIn}
                      </Button>
                    </div>
                  </FormGroup>
                  <h6 className="text-muted mt-4 or">{SignInWith}</h6>
                  <div className="social mt-4">
                    <div className="btn-showcase">
                      <a
                        className="btn btn-light"
                        href="https://www.linkedin.com/login"
                        target="_blank"
                        rel="noreferrer"
                      >
                        {" "}
                        <Linkedin className="txt-linkedin" /> {linkedInHeading}
                      </a>
                      <a
                        className="btn btn-light"
                        href="https://twitter.com/login?lang=en"
                        target="_blank"
                        rel="noreferrer"
                      >
                        <Twitter className="txt-twitter" />
                        {TwitterHeading}
                      </a>
                      <a
                        className="btn btn-light"
                        href="https://www.facebook.com/"
                        target="_blank"
                        rel="noreferrer"
                      >
                        <Facebook className="txt-fb" />
                        {FacebookHeading}
                      </a>
                    </div>
                  </div>
                  <p className="mt-4 mb-0 text-center">
                    {DoNotAccount}
                    <Link
                      className="ms-2"
                      href="/pages/authentication/register-simple"
                    >
                      {CreateAccount}
                    </Link>
                  </p>
                </form>
              </div>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
