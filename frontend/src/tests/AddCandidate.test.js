import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "react-query";
import AddCandidate from "../components/AddCandidate";

const queryClient = new QueryClient();

const renderComponent = () =>
  render(
    <QueryClientProvider client={queryClient}>
      <AddCandidate />
    </QueryClientProvider>
  );

test("renders form with required fields", () => {
  renderComponent();

  const firstNameInput = screen.getByLabelText(/First Name/i);
  const lastNameInput = screen.getByLabelText(/Last Name/i);
  const emailInput = screen.getByLabelText(/Email/i);
  const commentInput = screen.getByLabelText(/Comment/i);
  const submitButton = screen.getByText(/Submit/i);

  expect(firstNameInput).toBeInTheDocument();
  expect(lastNameInput).toBeInTheDocument();
  expect(emailInput).toBeInTheDocument();
  expect(commentInput).toBeInTheDocument();
  expect(submitButton).toBeInTheDocument();
});

test("shows error messages for required fields", async () => {
  renderComponent();

  const submitButton = screen.getByText(/Submit/i);
  fireEvent.click(submitButton);

  const firstNameError = await screen.findByText(/First Name is required/i);
  const lastNameError = await screen.findByText(/Last Name is required/i);
  const emailError = await screen.findByText(/Email is required/i);
  const commentError = await screen.findByText(/Comment is required/i);

  expect(firstNameError).toBeInTheDocument();
  expect(lastNameError).toBeInTheDocument();
  expect(emailError).toBeInTheDocument();
  expect(commentError).toBeInTheDocument();
});

test("submits form when all required fields are filled", async () => {
  renderComponent();

  const firstNameInput = screen.getByLabelText(/First Name/i);
  const lastNameInput = screen.getByLabelText(/Last Name/i);
  const emailInput = screen.getByLabelText(/Email/i);
  const commentInput = screen.getByLabelText(/Comment/i);
  const submitButton = screen.getByText(/Submit/i);

  fireEvent.change(firstNameInput, { target: { value: "John" } });
  fireEvent.change(lastNameInput, { target: { value: "Doe" } });
  fireEvent.change(emailInput, { target: { value: "john.doe@example.com" } });
  fireEvent.change(commentInput, { target: { value: "Great candidate" } });

  fireEvent.click(submitButton);

  const successMessage = await screen.findByText(
    /Candidate submitted successfully/i
  );
  expect(successMessage).toBeInTheDocument();
});
