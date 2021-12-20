import { GlobalStyles } from "./GlobalStyles";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import { useSelector } from "react-redux";
import Homepage from "./components/Homepage";
import Loading from "./components/Loading";
import styled from "styled-components";

export default function App() {
  const status = useSelector((state) => state.skoly.status);
  return (
    <>
      <Router>
        {status === "loading" ? <Loading /> : ""}
        <GlobalStyles />
        <Container>
          <Homepage />
        </Container>
      </Router>
    </>
  );
}
const Container = styled.div`
  margin: 0 auto;
  max-width: 80vw;
  @media (max-width: 768px) {
    width: 100%;
  }
`;
