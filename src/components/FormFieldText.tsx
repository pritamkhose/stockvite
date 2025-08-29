import { FormGroup, Label } from "reactstrap";
import { Field } from "react-final-form";

const FormFieldText = (props: any) => {
  function required(value: string) {
    return value && value.length > 0 ? undefined : "Enter vaild input";
  }

  const composeValidators =
    (...validators: any) =>
    (value: any) =>
      validators.reduce(
        (error: any, validator: any) => error || validator(value),
        undefined
      );

  return (
    <Field name={props.name} validate={composeValidators(required)}>
      {({ input, meta }) => (
        <FormGroup>
          {props.label === false ? null : <Label>{props.hint}</Label>}
          <Field
            required={props.required}
            disabled={props.disabled}
            type={props.type ? props.type : "text"}
            name={props.name}
            className="form-control"
            component="input"
            style={{ textAlign: "right" }}
            placeholder={
              props.placeholder !== undefined
                ? props.placeholder
                : "Enter " + props.hint
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

export default FormFieldText;
