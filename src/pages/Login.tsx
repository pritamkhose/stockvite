import React from "react";
import {
  Link,
  useLocation,
  useNavigation,
  useActionData,
} from "react-router-dom";
import { Table, Container, Modal, Button } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import github from "./../images/github.png";
import email from "./../images/email.png";
import axios from "axios";

import FacebookLogin from "react-facebook-login";
import { GoogleLogin, GoogleLogout } from "react-google-login";
import GitHubLogin from "react-github-login";

const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID;
const FACEBOOK_CLIENT_ID = import.meta.env.VITE_FACEBOOK_CLIENT_ID;
const GITHUB_CLIENT_ID = import.meta.env.VITE_GITHUB_CLIENT_ID;
let APP_AUTH_LOGIN = import.meta.env.VITE_APP_AUTH_LOGIN;
APP_AUTH_LOGIN = {
  google: false,
  facebook: false,
  github: true,
  email: true,
};
const baseURL =
  import.meta.env.VITE_APP_API_URL !== undefined
    ? import.meta.env.VITE_APP_API_URL
    : "";
console.log("Env:", {
  env: import.meta.env.DEV ? import.meta.env : null,
  baseURL,
  APP_AUTH_LOGIN,
});

import { DataType, APIResponseType, APIError } from "./Login.model";
import LoginPasswordPopup from "../components/LoginPasswordPopup";

const Login = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const from = params.get("from") || "/";

  const navigation = useNavigation();
  const isLoggingIn = navigation.formData?.get("username") != null;

  const actionData = useActionData() as { error: string } | undefined;

  const [state, setState] = React.useState({
    isLogined: localStorage.getItem("name") || "" ? true : false,
    show: false,
    code: "",
    email: localStorage.getItem("email") || "",
  });

  const login = (response: APIResponseType) => {
    if (response.accessToken) {
      updateInfo(
        "google",
        response.tokenId,
        response.profileObj.email,
        response.profileObj.name,
        response.profileObj.imageUrl,
        response
      );
    } else {
      alert("Google Login Failed");
    }
  };

  const updateInfo = (
    accessWith: string,
    accessToken: string,
    email: string,
    name: string,
    imageUrl: string,
    info: APIResponseType
  ) => {
    localStorage.clear();
    axios
      .post(baseURL + "auth/social", {
        accessWith,
        accessToken,
        email,
        name,
        imageUrl,
        date: Date.now(),
        info,
      })
      .then(
        (response: any) => {
          if (response.status === 200 || response.status === 201) {
            saveData(response.data);
          } else {
            alert("Something went Wrong! Try again...");
            console.error(response);
          }
        },
        (error: APIError) => {
          console.log(error);
          alert("Something went Wrong! Try again...");
        }
      );
  };

  const logout = () => {
    setState({
      ...state,
      isLogined: false,
    });
    localStorage.clear();
    toast.warn("Logout", {
      position: "bottom-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
    // props.updateLogin();
    // props.history.push('/');
     window.dispatchEvent(new Event("storage"));
  };

  const handleLoginFailure = () => {
    localStorage.clear();
    alert("Google - Failed to login!");
  };

  const handleLogoutFailure = () => {
    localStorage.clear();
    alert("Google - Failed to logout!");
  };

  const handleLoginFacebook = (response: APIResponseType) => {
    if (response.accessToken) {
      setState({ ...state, isLogined: true });
      updateInfo(
        "facebook",
        response.accessToken,
        response.email,
        response.name,
        response.picture.data.url,
        response
      );
    } else {
      alert("Facebook - Failed to login!");
    }
  };

  const handleLoginGithubFailure = (response: APIResponseType) => {
    console.error(response);
    localStorage.clear();
    alert("Github - Failed to login!");
  };

  const handleLoginGithub = (response: APIResponseType) => {
    localStorage.clear();
    console.log("Github response:", response);
    if (response.code != null && response.code !== undefined) {
      axios
        .post(baseURL + "auth/github", {
          code: response.code,
        })
        .then(
          (response) => {
            if (response.status === 200 || response.status === 201) {
              saveData(response.data);
            } else {
              alert("Something went Wrong! Try again...");
              console.error(response);
            }
          },
          (error) => {
            console.log(error);
            alert("Something went Wrong! Try again...");
          }
        );
    } else {
      handleLoginGithubFailure(response);
    }
  };

  const handleLoginPopup = (data: DataType) => {
    setState({
      ...state,
      show: !state.show,
    });
    if (data.uid !== null && data.uid !== undefined) {
      saveData(data);
    }
  };

  const saveData = (data: DataType) => {
    localStorage.setItem("token", data.token);
    localStorage.setItem("uid", data.uid);
    localStorage.setItem("email", data.email);
    localStorage.setItem("name", data.name);
    localStorage.setItem("imageUrl", data.imageUrl);
    localStorage.setItem("date", data.date);
    localStorage.setItem("accessWith", data.accessWith);
    setState({
      ...state,
      isLogined: true,
    });
    window.dispatchEvent(new Event("storage"));
  };

  const getProfile = () => {
    return (
      <Table>
        <tbody>
          <tr>
            <td colSpan={2}>
              <img
                src={localStorage.getItem("imageUrl")}
                alt=""
                height="150"
                width="150"
              ></img>
            </td>
          </tr>
          <tr>
            <td>Name</td>
            <td>{localStorage.getItem("name")}</td>
          </tr>
          <tr>
            <td>Email</td>
            <td>{localStorage.getItem("email")}</td>
          </tr>
          {localStorage.getItem("accessWith") != null ? (
            <tr>
              <td>Acess with</td>
              <td>{localStorage.getItem("accessWith").toUpperCase()}</td>
            </tr>
          ) : null}
          <tr>
            <td>Last Login</td>
            <td>{localStorage.getItem("date")}</td>
          </tr>
          <tr>
            <td>User ID</td>
            <td>{localStorage.getItem("uid")}</td>
          </tr>
           <tr>
            <td>Device</td>
            <td>{window.navigator.userAgent}</td>
          </tr>
          <tr>
            <td>
              <Link to="/watchlist" className="btn btn-primary">
                Watchlist
              </Link>
            </td>
            <td>
              <Link to="/portfolio" className="btn btn-primary">
                Portfolio
              </Link>
            </td>
          </tr>
          <tr>
            <td colSpan={2}>
              <Button type="submit" className="btn btn-danger" onClick={logout}>
                Logout
              </Button>
            </td>
          </tr>
        </tbody>
      </Table>
    );
  };

  return (
    <div>
      <Container fluid className="center">
        <div>
          {state.isLogined ? (
            <>
              {localStorage.getItem("name") === null ? null : getProfile()}
              {/* {APP_AUTH_LOGIN.google ? (
                <GoogleLogout
                  clientId={GOOGLE_CLIENT_ID}
                  buttonText="Logout"
                  onClick={logout}
                  onLogoutSuccess={logout}
                  onFailure={handleLogoutFailure}
                ></GoogleLogout>
              ) : null} */}
              <ToastContainer />
            </>
          ) : (
            <div>
              <br />
              <br />
              <br />
              {/* {APP_AUTH_LOGIN.google ? (
                <GoogleLogin
                  clientId={GOOGLE_CLIENT_ID}
                  buttonText="Sign in with Google"
                  onSuccess={login}
                  onFailure={handleLoginFailure}
                  cookiePolicy={"single_host_origin"}
                  responseType="code,token"
                />
              ) : null} */}
              <br />
              <br />
              <br />
              {APP_AUTH_LOGIN.facebook ? (
                <FacebookLogin
                  appId={FACEBOOK_CLIENT_ID}
                  autoLoad={false}
                  fields="name,email,picture"
                  icon="fa-facebook"
                  callback={handleLoginFacebook}
                />
              ) : null}

              {APP_AUTH_LOGIN.github && (
                <>
                  <br />
                  <br />
                  <br />
                  <GitHubLogin
                    clientId={GITHUB_CLIENT_ID}
                    onSuccess={handleLoginGithub}
                    onFailure={handleLoginGithubFailure}
                    buttonText="Login with Github"
                    valid={true}
                    redirectUri=""
                    className="btn-lg btn-info"
                  >
                    <img src={github} alt="Github" height="30"></img>
                    &nbsp;&nbsp;Login with Github&nbsp;&nbsp;
                  </GitHubLogin>
                </>
              )}

              {APP_AUTH_LOGIN.email && (
                <>
                  <br />
                  <br />
                  <br />
                  <button
                    className="btn-lg btn-success"
                    onClick={handleLoginPopup}
                  >
                    <img src={email} alt="Github" height="30"></img>
                    &nbsp;&nbsp;Login with Email&nbsp;&nbsp;
                  </button>
                </>
              )}

              <Modal
                show={state.show}
                onHide={handleLoginPopup}
                style={{ maxWidth: "100%" }}
              >
                <div
                  style={{
                    width: "100%",
                    marginTop: "12px",
                    paddingRight: "12px",
                  }}
                >
                  <button onClick={handleLoginPopup} className="CloseBtn">
                    X
                  </button>
                  <LoginPasswordPopup
                    handleLoginPopup={handleLoginPopup}
                    email={state.email}
                  />
                </div>
              </Modal>
            </div>
          )}
        </div>
      </Container>
    </div>
  );
};

export default Login;
