import { useState } from "react";
import { Container, Button } from "reactstrap";
import Loading from "./Loading";
import { Form } from "react-final-form";
import axios from "axios";
import FormFieldText from "./FormFieldText";
import FormFieldEmail from "./FormFieldEmail";

const LoginPasswordPopup = (props: any) => {
  const [isLoaded, setIsLoaded] = useState(false);

  const baseURL =
    (import.meta.env.VITE_APP_API_URL !== undefined
      ? import.meta.env.VITE_APP_API_URL
      : "") + "api/";

  const onFormSubmit = (values: any) => {
    setIsLoaded(true);
    axios.post(baseURL + "auth/emailpass", values).then(
      (response) => {
        console.log(response);
        setIsLoaded(false);
        if (response.status === 200) {
          props.handleLoginPopup(response.data);
        } else {
          alert(response.data.errorMsg);
        }
      },
      (error) => {
        setIsLoaded(false);
        console.error(error);
        alert("Something went Wrong! Try again...");
      }
    );
  };

  return (
    <>
      <div style={{ margin: "12px" }}>
        <Container>
          <div className="center">
            <h2>Login</h2>
            {isLoaded ? <Loading /> : null}
          </div>
          <Form
            onSubmit={(values) => onFormSubmit(values)}
            render={({ handleSubmit, submitting }) => (
              <form onSubmit={handleSubmit}>
                <FormFieldEmail name="email" hint="Email ID" value={""} />
                <FormFieldText
                  name="password"
                  type="password"
                  hint="Password"
                  value={""}
                  required={false}
                />
                <div className="buttons center">
                  <Button type="submit" color="success" disabled={submitting}>
                    Submit
                  </Button>
                </div>
              </form>
            )}
          />
        </Container>
      </div>
    </>
  );
};

export default LoginPasswordPopup;
