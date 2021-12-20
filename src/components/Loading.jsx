import CircularProgress from "@mui/material/CircularProgress";
import React from "react";
import styled from "styled-components";

const Loading = () => {
  return (
    <LoadingWrapper>
      <CircularProgress />
    </LoadingWrapper>
  );
};

export default Loading;

const LoadingWrapper = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  backdrop-filter: blur(3px);
`;
