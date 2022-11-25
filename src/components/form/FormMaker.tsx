import Router from "next/router";
import { useState } from "react";
import {
  Box,
  Flex,
  Heading,
  Image as ThemeImage,
  Input,
  Label,
  Paragraph,
  Textarea,
} from "theme-ui";
import { useVerify } from "../../hooks/useVerify";
import Loading from "../common/Loading";
import StoreAvatar from "../common/StoreAvatar";
import StoreCover from "../common/StoreCover";

import Logo from "../svg/logo";
import NearIcon from "../svg/near";
import ArrayCreator from "./ArrayCreator";
import FormButton from "./FormButton";
import LabeledInput from "./LabeledInput";
import MultiImageUpload from "./MultiImageUpload";
import TextChoices from "./TextChoices";

export default function FormMaker({
  form,
  isLoading,
  loadingText = "loading",
  initialAnswers = {},
  onSubmit,
}: {
  form: {
    config?: any;
    steps: any[];
  };
  isLoading?: boolean;
  loadingText?: string;
  initialAnswers?: any;
  onSubmit: (data: any) => void;
}) {
  const [step, setStep] = useState(0);
  const [data, setData] = useState<any>(initialAnswers);
  const [error, setError] = useState("");

  const verify = useVerify();

  const { config, steps } = form;

  const handleNext = async () => {
    // validate
    setError("Waiting for validation...");
    const { isValid, err } = await validateStep(
      steps[step],
      data[steps[step].name]
    );

    if (isValid) {
      setError("");
      if (step == steps.length - 1) {
        return onSubmit(data);
      } else {
        setStep(step + 1);
      }
    } else {
      setError(err);
    }
  };
  const handleBack = () => {
    if (step > 0) {
      setStep(step - 1);
      setError("");
    } else {
      Router.back();
    }
  };

  const validateStep = async (s: any, d: any) => {
    let err = "";

    const v = s.validation;

    if (v?.required && !d) {
      err = "This field is required";
    }

    if (
      (v?.min && d?.length < v.min) ||
      (v?.min && s?.type === "number" && d < v.min) ||
      (v?.min && s?.type === "price" && d < v.min)
    ) {
      if (s?.type === "text" || s?.type === "textarea") {
        err = `This field must be at least ${v.min} characters`;
      } else {
        err = `Minimum is ${v.min}`;
      }
    }

    if (
      (v?.max && d?.length > v.max) ||
      (v?.max && s?.type === "number" && d > v.max) ||
      (v?.max && s?.type === "price" && d > v.max)
    ) {
      if (s?.type === "text" || s?.type === "textarea") {
        err = `This field must be at most ${v.max} characters`;
      } else {
        err = `Maximum is ${v.max}`;
      }
    }
    // console.log("validating", d);

    if (v?.pattern) {
      if (v.pattern == "near_account_id") {
        d = d?.toLowerCase();
        if (!/^[a-z0-9]+$/i.test(d)) {
          err =
            "Invalid NEAR account ID: must be 3-64 characters, letters and numbers only";
        }
      } else if (v.pattern == "email") {
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(d)) {
          err = "Invalid email address";
        }
      } else if (v.pattern == "url") {
        if (
          !/^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/.test(d)
        ) {
          err = "Invalid URL";
        }
      } else if (v.pattern == "phone") {
        if (
          !/^\+?([0-9]{2})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/.test(
            d
          )
        ) {
          err = "Invalid phone number";
        }
      } else if (v.pattern == "yes") {
        if (d != "yes") {
          err = "You must type 'yes' to continue";
        }
      } else {
        if (!new RegExp(v.pattern).test(d)) {
          err = "Invalid pattern match: " + v.pattern;
        }
      }
      if (!v?.required && !d) {
        err = "";
      }
    }

    if (v?.useVerify) {
      for await (const fv of v.useVerify as any[]) {
        const [functionName, shouldReturn, errorMessage] = fv;
        if (!verify.hasOwnProperty(functionName)) {
          console.error("No such function in useVerify");
          continue;
        }
        // @ts-ignore
        const isValid = await verify[functionName](d);
        if (isValid != shouldReturn) {
          err = errorMessage || "Invalid";
        }
      }
    }

    // handle multiple fields
    if (s?.type === "fields") {
      for (const field of s.fields) {
        const { isValid, err: e } = await validateStep(
          field,
          data?.[field.name]
        );
        if (!isValid) {
          err = e;
          break;
        }
      }
    }

    return {
      isValid: err === "",
      err,
    };
  };

  return (
    <Flex
      sx={{
        position: "relative",
        minHeight: "100vh",
        minWidth: "100vw",
        height: "100%",
        width: "100%",
        flexDirection: "column",
        variant: "background.form",
        justifyContent: "center",
        alignItems: "center",
        p: 2,
      }}
    >
      <Box
        variant="box.card"
        sx={{
          width: "100%",
          maxWidth: "900px",
          p: 4,
          minHeight: [400, 400, 500, 600],
          display: "flex",
          flexDirection: "column",
          gap: 2,
        }}
      >
        {/* Header */}
        <Box mx="auto">{form?.config?.hideLogo && <Logo />}</Box>

        {isLoading && (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flex: 1,
              mb: 4,
            }}
          >
            <Loading size={1.4} text={loadingText} />
          </Box>
        )}
        {!isLoading && (
          <>
            {/* Main */}
            <Box
              sx={{
                flex: 1,
                mt: "8%",
                textAlign: "center",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Heading mb={3}>{steps[step]?.title || ""}</Heading>
              <Paragraph
                mb={4}
                sx={{
                  maxWidth: "600px",
                }}
              >
                {steps[step]?.subtitle || ""}
              </Paragraph>

              {steps[step].type === "text" && (
                <Input
                  key={steps[step].name}
                  variant="input.default"
                  type="text"
                  placeholder={steps[step].options.label}
                  sx={{ width: "100%", maxWidth: "540px" }}
                  onChange={(e) => {
                    setData({
                      ...data,
                      [steps[step].name]: e.target.value,
                    });
                  }}
                  value={data[steps[step].name] || ""}
                  onKeyUp={(e) => {
                    if (e.key === "Enter") {
                      handleNext();
                    }
                  }}
                  autoFocus={true}
                />
              )}

              {steps[step].type === "textarea" && (
                <Textarea
                  key={steps[step].name}
                  variant="input.default"
                  placeholder={steps[step].options.label}
                  sx={{
                    width: "100%",
                    maxWidth: "540px",
                    whiteSpace: "pre-wrap",
                  }}
                  onChange={(e) => {
                    setData({
                      ...data,
                      [steps[step].name]: e.target.value,
                    });
                  }}
                  value={data[steps[step].name] || ""}
                  autoFocus={true}
                  rows={4}
                  maxLength={steps[step].options.max}
                />
              )}

              {steps[step].type === "price" && (
                <LabeledInput
                  value={data[steps[step].name] || ""}
                  onChange={(e: any) => {
                    setData({
                      ...data,
                      [steps[step].name]: e.target.value,
                    });
                  }}
                  label={steps[step].options.label}
                  type="number"
                  icon={<NearIcon size={1.4} />}
                  autoFocus={true}
                  min={steps[step].validation.min || 0}
                  max={steps[step].validation.max || 10000000}
                  step={0.1}
                />
              )}

              {steps[step].type === "select" && (
                <TextChoices
                  options={steps[step].options}
                  value={data[steps[step].name] || ""}
                  onChange={(values: string[]) => {
                    setData({
                      ...data,
                      [steps[step].name]: values,
                    });
                  }}
                  max={steps[step].validation.max}
                />
              )}

              {steps[step].type === "fields" && (
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 3,
                  }}
                >
                  {steps[step].fields.map((field: any, i: number) => (
                    <Box key={i}>
                      <Label>{field.label}</Label>
                      <Input
                        key={i}
                        value={data[field.name] || ""}
                        onChange={(e: any) => {
                          setData({
                            ...data,
                            [field.name]: e.target.value,
                          });
                        }}
                        type={field.type}
                        autoFocus={i === 0}
                        min={field.validation.min || 0}
                        max={field.validation.max || 10000000}
                        step={0.1}
                        placeholder={field.placeholder}
                        variant="input.default"
                      />
                    </Box>
                  ))}
                </Box>
              )}

              {steps[step].type === "image" && (
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: 2,
                  }}
                >
                  <Input
                    variant="input.default"
                    type="text"
                    placeholder={"Add a direct link to your image"}
                    sx={{ maxWidth: "100%", width: "540px", mb: 3 }}
                    onChange={(e: any) => {
                      if (e.target.value.length > 1000) {
                        setError("Image URL is too long. Max 1000 characters.");
                        return;
                      }
                      const img = new Image();
                      img.src = e.target.value;
                      setData({
                        ...data,
                        [steps[step].name]: e.target.value,
                      });
                      img.onload = () => {
                        setError("");
                      };
                      img.onerror = () => {
                        setError("Invalid image URL");
                      };
                    }}
                    value={data[steps[step].name] || ""}
                  />
                  {steps[step].options.variant == "avatar" ? (
                    <StoreAvatar image={data[steps[step].name]} />
                  ) : steps[step].options.variant == "cover" ? (
                    <StoreCover image={data[steps[step].name]} height={130} />
                  ) : (
                    <ThemeImage
                      src={data[steps[step].name]}
                      sx={{
                        maxWidth: "440px",
                        maxHeight: "440px",
                        objectFit: "cover",
                        objectPosition: "center",
                        borderRadius: 20,
                        width: "200px",
                        height: "200px",
                        border: "1px solid #eee",
                      }}
                    />
                  )}
                </Box>
              )}

              {steps[step].type === "images" && (
                <MultiImageUpload
                  onChange={(arr: any) => {
                    setData({
                      ...data,
                      [steps[step].name]: arr,
                    });
                  }}
                  value={data[steps[step].name] || []}
                  placeholder={steps[step].options.placeholder}
                  max={steps[step].validation.max}
                  setError={setError}
                />
              )}

              {steps[step].type === "array" && (
                <ArrayCreator
                  onChange={(arr: any) => {
                    setData({
                      ...data,
                      [steps[step].name]: arr,
                    });
                  }}
                  value={data[steps[step].name] || []}
                  placeholder={steps[step].options.placeholder}
                  max={steps[step].validation.max}
                  maxLength={steps[step].validation.maxLength}
                  setError={setError}
                />
              )}
            </Box>

            {/* Footer */}
            <Paragraph sx={{ color: "red", textAlign: "center", my: 3 }}>
              {error}
            </Paragraph>
            <Box
              sx={{
                display: "flex",
                gap: 2,
              }}
            >
              <FormButton
                variant="back"
                sx={{
                  mr: "auto",
                }}
                onClick={handleBack}
              >
                Back
              </FormButton>
              {!steps[step]?.validation?.required && step < steps.length - 1 && (
                <FormButton onClick={handleNext} variant="skip">
                  Skip
                </FormButton>
              )}
              <FormButton onClick={handleNext}>
                {step < steps.length - 1
                  ? "Next"
                  : config?.submitText || "Submit"}
              </FormButton>
            </Box>
          </>
        )}
      </Box>
    </Flex>
  );
}
