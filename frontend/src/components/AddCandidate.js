import React, { useState } from "react";
import styled from "styled-components";
import { useMutation } from "react-query";
import { upsertCandidate } from "../api/candidateAPI";

const Card = styled.div`
  background-color: #fff;
  padding: 20px;
  margin: 20px auto;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  max-width: 600px;
`;

const FormGroup = styled.div`
  margin-bottom: 15px;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 5px;
`;

const Input = styled.input`
  width: 100%;
  padding: 8px;
  box-sizing: border-box;
`;

const Button = styled.button`
  background-color: #007bff;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }
`;

const ErrorMessage = styled.div`
  color: red;
  margin-top: 5px;
`;

const AddCandidate = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    email: "",
    callTimeInterval: "",
    linkedInProfile: "",
    githubProfile: "",
    comment: "",
  });

  const [errors, setErrors] = useState({});

  const mutation = useMutation(upsertCandidate, {
    onSuccess: () => {
      alert("Candidate submitted successfully");
      setFormData({
        firstName: "",
        lastName: "",
        phoneNumber: "",
        email: "",
        callTimeInterval: "",
        linkedInProfile: "",
        githubProfile: "",
        comment: "",
      });
      setErrors({});
    },
    onError: (error) => {
      setErrors({ form: error.response?.data?.error || "An error occurred" });
    },
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newErrors = {};
    const requiredFields = ["firstName", "lastName", "email", "comment"];
    for (const field of requiredFields) {
      if (!formData[field]) {
        newErrors[field] = `${
          field.charAt(0).toUpperCase() + field.slice(1)
        } is required`;
      }
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    mutation.mutate(formData);
  };

  return (
    <Card>
      <form onSubmit={handleSubmit}>
        {["firstName", "lastName", "email", "comment"].map((field) => (
          <FormGroup key={field}>
            <Label>{field.charAt(0).toUpperCase() + field.slice(1)}*</Label>
            <Input
              type={field === "email" ? "email" : "text"}
              name={field}
              value={formData[field]}
              onChange={handleChange}
            />
            {errors[field] && <ErrorMessage>{errors[field]}</ErrorMessage>}
          </FormGroup>
        ))}
        {[
          "phoneNumber",
          "callTimeInterval",
          "linkedInProfile",
          "githubProfile",
        ].map((field) => (
          <FormGroup key={field}>
            <Label>{field.charAt(0).toUpperCase() + field.slice(1)}</Label>
            <Input
              type="text"
              name={field}
              value={formData[field]}
              onChange={handleChange}
            />
          </FormGroup>
        ))}
        {errors.form && <ErrorMessage>{errors.form}</ErrorMessage>}
        <Button type="submit">Submit</Button>
      </form>
    </Card>
  );
};

export default AddCandidate;
