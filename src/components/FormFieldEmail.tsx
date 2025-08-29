import { FormGroup, Label } from "reactstrap";
import { Field } from "react-final-form";

const FormFieldEmail = (props: any) => {
  const pattern = new RegExp(
    /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i
  );

  function mustBeEmail(value: string) {
    if (!pattern.test(value)) {
      return value ? "Must be a vaild Email ID" : undefined;
    }
  }

  function required(value: string) {
    return value && value.length > 5 ? undefined : "";
  }

  const composeValidators =
    (...validators: any) =>
    (value: any) =>
      validators.reduce(
        (error: any, validator: any) => error || validator(value),
        undefined
      );

  return (
    <Field
      name={props.name}
      validate={composeValidators(required, mustBeEmail)}
    >
      {({ input, meta }) => (
        <FormGroup>
          {props.label === false ? null : <Label>{props.hint}</Label>}
          <Field
            required
            disabled={props.disabled}
            type="email"
            name={props.name}
            className="form-control"
            component="input"
            style={{ textAlign: "right" }}
            placeholder={
              props.placeholder !== undefined
                ? props.placeholder
                : "Enter a vaild " + props.hint
            }
            defaultValue={
              props.value !== undefined && props.value.length > 0
                ? props.value
                : ""
            }
          />
          {meta.error && meta.touched && <span>{meta.error}</span>}
        </FormGroup>
      )}
    </Field>
  );
};

export default FormFieldEmail;
