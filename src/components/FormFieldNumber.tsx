import { FormGroup, Label } from "reactstrap";
import { Field } from "react-final-form";

const FormFieldNumber = (props: any) => {
  function required(value: string) {
    return value && value.length > 0 ? undefined : "Enter vaild input";
  }

  function mustBeNumber(value: number) {
    return isNaN(value) ? "Must be a number" : undefined;
  }

  function invalidLength(value: string) {
    return value.length >= props.maxLength && value.length <= props.minLength
      ? undefined
      : "Enter vaild input";
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
      validate={composeValidators(required, mustBeNumber, invalidLength)}
    >
      {({ input, meta }) => (
        <FormGroup>
          {props.label === false ? null : <Label>{props.hint}</Label>}
          <Field
            required={props.required}
            disabled={props.disabled}
            type="number"
            minLength={props.minLength}
            maxLength={props.maxLength}
            min={props.min}
            max={props.max}
            name={props.name}
            step={props.step}
            className="form-control"
            component="input"
            style={{ textAlign: "right" }}
            placeholder={
              props.placeholder !== undefined
                ? props.placeholder
                : "Enter " + props.hint
            }
            defaultValue={props.value !== undefined ? props.value : 0}
          />
          {meta.error && meta.touched && <span>{meta.error}</span>}
        </FormGroup>
      )}
    </Field>
  );
};

export default FormFieldNumber;
