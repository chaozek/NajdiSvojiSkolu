import { GlobalStyles } from "./GlobalStyles";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import { setPopup } from "./redux/skolySlice";
import { useDispatch, useSelector } from "react-redux";
import CancelIcon from "@mui/icons-material/Cancel";
import Homepage from "./pages/Homepage";
import Loading from "./components/Loading";
import SingleSkola from "./pages/SingleSkola";
import styled from "styled-components";
export default function App() {
  const status = useSelector((state) => state.skoly.status);
  const skola = useSelector((state) => state.skoly.skola);
  const popupState = useSelector((state) => state.skoly.popup);
  const dispatch = useDispatch();
  const popup = () => {
    return (
      <Popup>
        <InnerPopup>
          <CancelIcon
            style={{
              color: "#ED3733",
            }}
            onClick={() => dispatch(setPopup())}
          />
          <Header>{skola?.Reditelstvi?.RedPlnyNazev}</Header>
          <UnderHeader>{skola?.Reditelstvi?.RedZkracenyNazev}</UnderHeader>
          <Info>
            Jméno Ředitele: {skola?.Reditelstvi?.Reditel?.ReditelJmeno}
          </Info>
          <Info>
            Adresa ředitele: {skola?.Reditelstvi?.Reditel?.ReditelAdresa2},{" "}
            {skola?.Reditelstvi?.Reditel?.ReditelAdresa1}
          </Info>
        </InnerPopup>
      </Popup>
    );
  };

  return (
    <AppWrapper>
      {popupState && popup()}
      <Router>
        {status === "loading" ? <Loading /> : ""}
        <GlobalStyles />
        <Container>
          <Route exact path="/" component={Homepage} />
          <Route exact path="/skola/:id" component={SingleSkola} />
        </Container>
      </Router>
    </AppWrapper>
  );
}
const Container = styled.div`
  margin: 0 auto;
  max-width: 80vw;
  @media (max-width: 768px) {
    width: 100%;
  }
`;
const Popup = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  backdrop-filter: blur(3px);
  -webkit-animation: fadeIn 1s;
  animation: fadeIn 1s;
  @-webkit-keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`;
const InnerPopup = styled.div`
  position: fixed;
  top: 50%; /* Position Y halfway in */
  left: 50%; /* Position X halfway in */
  transform: translate(-50%, -50%); /* Move it halfway back(x,y) */
  height: 70vh;
  width: 70vw;
  background-color: white;
  overflow-y: scroll;
  border-radius: 5px;
  padding: 20px;
  box-shadow: rgba(255, 255, 255, 0.1) 0px 1px 1px 0px inset,
    rgba(50, 50, 93, 0.25) 0px 50px 100px -20px,
    rgba(0, 0, 0, 0.3) 0px 30px 60px -30px;
`;
const Header = styled.h2`
  margin: 0;
`;
const Info = styled.p`
  margin: 0;
`;
const UnderHeader = styled.h4`
  margin: 0;
  font-weight: light;
  margin-bottom: 10px;
`;
const AppWrapper = styled.div`
  position: relative;
`;
