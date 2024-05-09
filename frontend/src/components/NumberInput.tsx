import { TextField, TextFieldProps } from "@mui/material";
import { ChangeEvent, useCallback, useEffect, useState } from "react";
import { useDict } from "../hooks/locale";

export function FloatTextField({
  value,
  setValue,
  setError,
  textFieldProps,
}: {
  value: number;
  setValue?: (newValue: number) => void;
  setError?: (error: boolean) => void;
  textFieldProps?: TextFieldProps;
}) {
  const dict = useDict();
  const [currentText, setCurrentText] = useState("");
  const [helperText, setHelperText] = useState("");

  const onValueChange = useCallback(
    ({
      target: { value },
    }: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const cValue = value.trim().replace(/ +/g, "").replaceAll(",", ".");
      if (cValue === "0-") {
        setCurrentText("-");
        setHelperText(dict.common.error.invalidNum);
      } else if (cValue === "-") {
        setValue ? setValue(0) : undefined;
      } else if (cValue.endsWith(".")) {
        setCurrentText(cValue);
        setHelperText(dict.common.error.invalidNum);
      } else if (cValue.length === 0) {
        setValue ? setValue(0) : undefined;
      } else {
        const numVal = Number(cValue);
        if (!isNaN(numVal)) {
          setValue ? setValue(numVal) : undefined;
        }
      }
    },
    [dict.common.error.invalidNum, setValue],
  );

  const onBlur = useCallback(() => {
    setCurrentText(value.toString());
    setHelperText("");
  }, [value]);

  useEffect(() => {
    setCurrentText(value.toString());
    setHelperText("");
  }, [value]);
  useEffect(() => {
    if (setError) setError(helperText.length > 0);
  }, [helperText.length, setError]);

  return (
    <TextField
      type='text'
      value={currentText}
      onChange={onValueChange}
      onBlur={onBlur}
      helperText={helperText.length > 0 ? helperText : undefined}
      error={helperText.length > 0}
      {...textFieldProps}
    />
  );
}

export function IntTextField({
  value,
  setValue,
  setError,
  textFieldProps,
}: {
  value: number;
  setValue: (newValue: number) => void;
  setError?: (error: boolean) => void;
  textFieldProps?: Omit<
    TextFieldProps,
    "value" | "onChange" | "onBlur" | "helperText" | "error" | "errorStyle"
  >;
}) {
  const dict = useDict();
  const [helperText, setHelperText] = useState("");
  const [currentText, setCurrentText] = useState("");

  const onValueChange = useCallback(
    ({
      target: { value },
    }: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const cValue = value.trim().replace(/ +/g, "");
      if (cValue === "0-") {
        setCurrentText("-");
        setHelperText(dict.common.error.invalidNum);
      } else if (cValue === "-") {
        setValue(0);
      } else if (cValue.length === 0) {
        setValue(0);
      } else {
        const numVal = Number(cValue);
        if (Number.isInteger(numVal)) {
          setValue(numVal);
        }
      }
    },
    [dict.common.error.invalidNum, setValue],
  );
  const onBlur = useCallback(() => {
    setCurrentText(value.toString());
    setHelperText("");
  }, [value]);

  useEffect(() => {
    setCurrentText(value.toString());
    setHelperText("");
  }, [value]);
  useEffect(() => {
    if (setError) setError(helperText.length > 0);
  }, [helperText.length, setError]);

  return (
    <TextField
      type='text'
      value={currentText}
      onChange={onValueChange}
      onBlur={onBlur}
      helperText={helperText.length > 0 ? helperText : undefined}
      error={helperText.length > 0}
      {...textFieldProps}
    />
  );
}
