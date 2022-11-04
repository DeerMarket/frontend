import { useState } from "react";
import Choices from "../../../components/form/ImageChoices";
import FormLayout from "../../../components/layouts/Form";

// Images
import clientImage from "../../../assets/svg/client.svg";
import freelancerImage from "../../../assets/svg/freelancer.svg";
import fixedImage from "../../../assets/svg/price-tag.svg";
import hourlyImage from "../../../assets/svg/price-time.svg";
import monthlyImage from "../../../assets/svg/price-month.svg";

import {
  Box,
  Button,
  Flex,
  Heading,
  IconButton,
  Input,
  Label,
  Link,
  Paragraph,
  Textarea,
} from "theme-ui";
import TextChoices from "../../../components/form/TextChoices";
import ArrayCreator from "../../../components/form/ArrayCreator";
import LabeledInput from "../../../components/form/LabeledInput";
import NearIcon from "../../../components/svg/near";
import Router from "next/router";
import Loading from "../../../components/common/Loading";

const service_categories = [
  "Design",
  "Marketing",
  "Writing",
  "Video",
  "Audio",
  "Programming",
  "Business",
  "Other",
];

const default_answers = {
  userType: "",
  contractType: "",
  otherId: "",
  serviceCategory: "",
  deliverables: [],
  description: "",
  duration: "",
  budget: "",
  acceptTerms: false,
  termsURL:
    "https://docs.google.com/document/d/1QuvxHYjImqv_P-yp453RILlgu1wsa6Yqbr3tcyVtGgU/view",
};

const total_steps = 9;

const answers_validation = {
  userType: {
    required: true,
    equals: ["client", "freelancer"],
  },
  contractType: {
    required: true,
    equals: ["fixed", "hourly", "monthly"],
  },
  otherId: {
    required: true,
    regex: /^(?!^\.)[a-zA-Z0-9.]{2,64}\.near$/,
    message: "Invalid NEAR account ID",
  },
  serviceCategory: {
    required: true,
    equals: service_categories,
  },
  deliverables: {
    required: true,
    type: "array",
    min: 1,
    max: 5,
    message: "Must add between 1 and 5 deliverables",
  },
  description: {
    required: true,
    min: 100,
    max: 10000,
  },
  duration: {
    required: true,
    min_count: 1,
    max_count: 365,
  },
  budget: {
    required: true,
    min_count: 1,
    max_count: 1000000,
  },
  acceptTerms: {
    required: true,
    equals: [true],
  },
};

const validate_answer = (key: string, value: any) => {
  let valid = true;
  let message = "";
  // @ts-ignore
  const rules = answers_validation[key];

  if (rules.required && (!value || value === "" || value.length === 0)) {
    valid = false;
    message = "This field is required";
  }

  if (rules.type && rules.type === "array" && !Array.isArray(value)) {
    valid = false;
    message = "This field must be an array";
  }

  if (rules.equals && !rules.equals.includes(value)) {
    valid = false;
    message =
      "This field must be one of the following: " + rules.equals.join(", ");
  }

  if (rules.min && value.length < rules.min) {
    valid = false;
    message = "This field must be at least " + rules.min + " characters";
  }

  if (rules.max && value.length > rules.max) {
    valid = false;
    message = "This field must be less than " + rules.max + " characters";
  }

  if (rules.min_count && value < rules.min_count) {
    valid = false;
    message = "This field must be at least " + rules.min_count;
  }

  if (rules.max_count && value > rules.max_count) {
    valid = false;
    message = "This field must be less than " + rules.max_count;
  }

  if (rules.regex && !rules.regex.test(value)) {
    valid = false;
    message = "This field is invalid";
  }

  if (rules.length && value.length !== rules.length) {
    valid = false;
    message = "This field must be " + rules.length + " characters";
  }

  return {
    valid: valid,
    message: rules.message || message,
  };
};

export default function Create() {
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1);
  const [error, setError] = useState("");
  const [answers, setAnswers] = useState(default_answers);

  const handleAnswer = (key: string, value: any) => {
    setAnswers({ ...answers, [key]: value });
  };

  const handleNext = () => {
    // validate
    const { valid, message } = validate_answer(
      Object.keys(answers)[step - 1],
      // @ts-ignore
      answers[Object.keys(answers)[step - 1]]
    );

    if (!valid) return setError(message || "Invalid input");
    setError("");

    if (step === total_steps) handleSubmit();
    setStep(step + 1);
  };

  const handleBack = () => {
    if (step === 1) {
      Router.push("/dashboard");
      return;
    }
    setStep(step - 1);
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const result = {
        user_type: answers.userType,
        other_id: answers.otherId,
        category: answers.serviceCategory,
        description: answers.description,
        deliverables: JSON.stringify(answers.deliverables),
        duration: answers.duration,
        terms_url: answers.termsURL,
        accept_terms: answers.acceptTerms,
        total: answers.budget,
      };
      console.log(result);
      Router.push("/dashboard");
    } catch (e) {
      console.log(e);
      setError("Error creating contract");
    }
    setLoading(false);
  };

  return (
    <FormLayout>
      <Box
        sx={{
          mx: "auto",
          my: 0,
          width: "700px",
          textAlign: "center",
        }}
      >
        {/* back button */}
        {step != total_steps && (
          <Flex mb={2}>
            <IconButton onClick={handleBack}>
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M19 12H5"
                  stroke="inherit"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></path>
                <path
                  d="M12 19L5 12L12 5"
                  stroke="inherit"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></path>
              </svg>
            </IconButton>
          </Flex>
        )}

        {/* Step 1 - Client or Freelancer   */}
        {step == 1 && (
          <>
            <FormHeader
              title="Are you a client or a freelancer?"
              description=""
            />
            <Choices
              options={[
                {
                  value: "client",
                  image: clientImage,
                  title: "Client",
                  description: "Contracting with a freelancer",
                },
                {
                  value: "freelancer",
                  image: freelancerImage,
                  title: "Freelancer",
                  description: "Contracting with a client",
                },
              ]}
              setSelected={(value: string) => handleAnswer("userType", value)}
              selected={answers?.userType}
            />
          </>
        )}
        {/* Step 2 - Contract Type   */}
        {step == 2 && (
          <>
            <FormHeader title="Choose the type of contract" description="" />
            <Choices
              options={[
                {
                  value: "fixed",
                  image: fixedImage,
                  title: "Fixed Price",
                  description:
                    answers["userType"] === "freelancer"
                      ? "Get payed a fixed price for a project"
                      : "Pay a fixed price for a project",
                },
                {
                  value: "hourly",
                  image: hourlyImage,
                  title: "Hourly Rate",
                  description:
                    answers["userType"] == "freelancer"
                      ? "Get payed by the hours you work"
                      : "Pay by the hours worked",
                  comingSoon: true,
                },
                //   {
                //     value: "monthly",
                //     image: monthlyImage,
                //     title: "Monthly Retainer",
                //     description:
                //       answers["userType"] == "freelancer"
                //         ? "Get payed monthly for ongoing work"
                //         : "Pay a monthly fee for ongoing work",
                //     comingSoon: true,
                //   },
              ]}
              setSelected={(value: string) =>
                handleAnswer("contractType", value)
              }
              selected={answers?.contractType}
              imageSize={60}
            />
          </>
        )}
        {/* Step 3 - Other user id   */}
        {step == 3 && (
          <>
            <FormHeader
              title={
                (answers["userType"] == "freelancer"
                  ? "Client"
                  : "Freelancer") + " ID to invite"
              }
              description=""
            />
            <Input
              type="text"
              variant="inputs.default"
              placeholder="Account ID"
              sx={{
                maxWidth: "540px",
                width: "100%",
                mx: "auto",
                mb: 2,
              }}
              value={answers?.otherId}
              onChange={(e) => handleAnswer("otherId", e.target.value)}
            />
            <Paragraph mb={4}>
              The NEAR account ID of the{" "}
              {answers["userType"] == "freelancer" ? "client" : "freelancer"}{" "}
              you're contracting with.
            </Paragraph>
          </>
        )}
        {/* Step 4 - Service Category */}
        {step == 4 && (
          <>
            <FormHeader
              title="Service Category"
              description={
                answers["userType"] == "freelancer"
                  ? "What type of service are you providing?"
                  : "What type of service is your project?"
              }
            />
            <TextChoices
              options={service_categories}
              setSelected={(value: string) =>
                handleAnswer("serviceCategory", value)
              }
              selected={answers?.serviceCategory}
            />
          </>
        )}

        {/* Step 5 - Deliverables */}
        {step == 5 && (
          <>
            <FormHeader
              title="Deliverables"
              description={
                answers["userType"] == "freelancer"
                  ? "Write what you will deliver to the client then press ADD to add it to the list."
                  : "Write what you want the freelancer to deliver then press ADD to add it to the list."
              }
            />
            <ArrayCreator
              placeholder={"E.g. 3 Logo designs"}
              value={answers?.deliverables}
              onChange={(value: any) => handleAnswer("deliverables", value)}
            />
          </>
        )}

        {/* Step 6 - Description */}
        {step == 6 && (
          <>
            <FormHeader
              title="Description"
              description={
                answers["userType"] == "freelancer"
                  ? "Write a description of the services you will provide."
                  : "Write a description of the services you want the freelancer to provide."
              }
            />
            <Textarea
              variant="inputs.default"
              value={answers?.description}
              onChange={(e) => handleAnswer("description", e.target.value)}
              placeholder="E.g. The freelancer will design 3 logo concepts for the client to choose from."
              sx={{
                mb: 4,
                mx: "auto",
                maxWidth: "540px",
                minWidth: "300px",
                width: "100%",
              }}
              rows={5}
            >
              {answers?.description}
            </Textarea>
          </>
        )}

        {/* Step 7 - Duration */}
        {step == 7 && (
          <>
            <FormHeader
              title="Project Duration"
              description={
                answers["userType"] == "freelancer"
                  ? "How long will it take you to deliver the project?"
                  : "How long do you expect the project to take?"
              }
            />
            <LabeledInput
              label="Days"
              type="number"
              placeholder="E.g. 30"
              value={answers?.duration}
              onChange={(e: any) => handleAnswer("duration", e.target.value)}
              width="200px"
              min={1}
              max={365}
            />
          </>
        )}

        {/* Step 8 - Budget */}
        {step == 8 && (
          <>
            <FormHeader
              title="Project Budget"
              description={
                answers["userType"] == "freelancer"
                  ? "How much do you want to get paid for the project?"
                  : "How much are you going to pay for the project?"
              }
            />
            <LabeledInput
              label="NEAR"
              type="number"
              placeholder="E.g. 100"
              value={answers?.budget}
              onChange={(e: any) => handleAnswer("budget", e.target.value)}
              width="200px"
              min={1}
              max={100000}
              icon={<NearIcon size={1} />}
            />
          </>
        )}

        {/* Step 9 - Terms & conditions */}
        {step == 9 && (
          <>
            <FormHeader
              title="Terms and Conditions"
              description={
                answers["userType"] == "freelancer"
                  ? "Please read the terms and conditions and accept them to continue."
                  : "Please read the terms and conditions and accept them to continue."
              }
            />
            <Link
              href={answers["termsURL"]}
              target="_blank"
              rel="noopener noreferrer"
              sx={{
                display: "block",
                mb: 4,
              }}
            >
              Terms and Conditions <span style={{ fontSize: "1.3em" }}>↗</span>
            </Link>
            <Label
              sx={{
                mb: 4,
                mx: "auto",
                display: "flex",
                alignItems: "center",
                maxWidth: "540px",
                justifyContent: "center",
                cursor: "pointer",
              }}
            >
              <input
                type="checkbox"
                checked={answers?.acceptTerms}
                onChange={(e) => handleAnswer("acceptTerms", e.target.checked)}
                sx={{
                  variant: "inputs.checkbox",
                  mr: 2,
                  height: "18px",
                  width: "18px",
                  cursor: "pointer",
                }}
              />
              I read and accept the contract's terms and conditions
            </Label>
          </>
        )}

        {/* Step 10 - Submit */}
        {loading && (
          <Flex
            sx={{
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              width: "100%",
              mt: 60,
              mb: 80,
            }}
          >
            <Loading size={1.6} text={"submitting"} />
          </Flex>
        )}

        {!loading && (
          <Button
            sx={{
              width: "100%",
              maxWidth: "540px",
            }}
            onClick={handleNext}
          >
            Next
          </Button>
        )}
        <Box
          sx={{
            color: "danger",
            mx: "auto",
            my: 3,
            textAlign: "center",
          }}
        >
          {error}
        </Box>
      </Box>
    </FormLayout>
  );
}

const FormHeader = ({ title, description = "" }: any) => {
  return (
    <Box
      sx={{
        mx: "auto",
        my: 0,
        width: "700px",
        textAlign: "center",
      }}
    >
      <Heading mb={description == "" ? 4 : 3}>{title}</Heading>
      <Paragraph mb={4}>{description}</Paragraph>
    </Box>
  );
};
