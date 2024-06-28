import React from "react";
import { render, screen, fireEvent, waitFor } from "./utils"; // Use the custom render from test-utils
import axios from "axios";
import axiosMock from "axios-mock-adapter";
import SearchCandidate from "../components/SearchCandidate";
import { API_URL } from "../api/candidateAPI";

const mock = new axiosMock(axios);

describe("SearchCandidate", () => {
  beforeEach(() => {
    mock.reset();
  });

  it("should display candidate information when found", async () => {
    const candidateData = {
      firstName: "John",
      lastName: "Doe",
      phoneNumber: "123-456-7890",
      email: "john.doe@example.com",
      callTimeInterval: "9 AM - 5 PM",
      linkedInProfile: "https://linkedin.com/in/johndoe",
      githubProfile: "https://github.com/johndoe",
      comment: "A highly skilled developer.",
    };

    mock.onGet(`${API_URL}/john.doe@example.com`).reply(200, candidateData);

    render(<SearchCandidate />);

    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: "john.doe@example.com" },
    });

    fireEvent.click(screen.getByRole("button"));

    await waitFor(() => {
      expect(screen.getByRole("heading")).toBeInTheDocument();
    });
  });

  it("should display error message when candidate not found", async () => {
    mock.onGet(`${API_URL}/nonexistent@example.com`).reply(404, {
      message: "Candidate not found",
    });

    render(<SearchCandidate />);

    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: "nonexistent@example.com" },
    });

    fireEvent.click(screen.getByRole("button"));

    await waitFor(() => {
      expect(screen.getByText(/Candidate not found/i)).toBeInTheDocument();
    });
  });
});
