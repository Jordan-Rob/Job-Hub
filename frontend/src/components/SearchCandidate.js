import React, { useState } from "react";
import styled from "styled-components";
import { useQuery } from "react-query";
import { getCandidateByEmail } from "../api/candidateAPI";

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
  margin-top: 10px;
`;

const JobCandidateCard = styled.div`
  background-color: #f8f9fa;
  padding: 15px;
  margin-top: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const JobCandidateTitle = styled.h2`
  margin-top: 0;
`;

const SearchCandidate = () => {
  const [searchEmail, setSearchEmail] = useState("");
  const [searchTriggered, setSearchTriggered] = useState(false);

  const {
    data: candidateData,
    error,
    refetch,
  } = useQuery(
    ["candidate", searchEmail],
    () => getCandidateByEmail(searchEmail),
    {
      enabled: false,
      retry: false,
    }
  );

  const handleSearch = (e) => {
    e.preventDefault();

    if (!searchEmail) {
      return;
    }

    setSearchTriggered(true);
    refetch();
  };

  return (
    <Card>
      <form onSubmit={handleSearch}>
        <FormGroup>
          <Label htmlFor="email">Search by Email*</Label>
          <Input
            type="email"
            value={searchEmail}
            id="email"
            onChange={(e) => setSearchEmail(e.target.value)}
          />
          {searchTriggered && !searchEmail && (
            <ErrorMessage>Email is required</ErrorMessage>
          )}
        </FormGroup>
        <Button type="submit" name="search">
          Search
        </Button>
      </form>

      {searchTriggered && error && (
        <ErrorMessage>Candidate not found</ErrorMessage>
      )}

      {candidateData && (
        <JobCandidateCard>
          <JobCandidateTitle>Job Candidate Found</JobCandidateTitle>
          <p>
            <strong>First Name:</strong> {candidateData.firstName}
          </p>
          <p>
            <strong>Last Name:</strong> {candidateData.lastName}
          </p>
          <p>
            <strong>Email:</strong> {candidateData.email}
          </p>
          <p>
            <strong>Phone Number:</strong> {candidateData.phoneNumber}
          </p>
          <p>
            <strong>Call Time Interval:</strong>{" "}
            {candidateData.callTimeInterval}
          </p>
          <p>
            <strong>LinkedIn Profile:</strong>{" "}
            <a
              href={candidateData.linkedInProfile}
              target="_blank"
              rel="noopener noreferrer"
            >
              {candidateData.linkedInProfile}
            </a>
          </p>
          <p>
            <strong>GitHub Profile:</strong>{" "}
            <a
              href={candidateData.githubProfile}
              target="_blank"
              rel="noopener noreferrer"
            >
              {candidateData.githubProfile}
            </a>
          </p>
          <p>
            <strong>Comment:</strong> {candidateData.comment}
          </p>
        </JobCandidateCard>
      )}
    </Card>
  );
};

export default SearchCandidate;
