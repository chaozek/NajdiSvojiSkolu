import { Link } from "react-router-dom";
import {
  clearSkolyArr,
  getExactSkola,
  getMoreSkoly,
  getSkoly,
  setPopup,
} from "../redux/skolySlice";
import { useDispatch } from "react-redux";
import { useRef } from "react";
import { useSelector } from "react-redux";
import { useState } from "react";
import AccountBalanceOutlinedIcon from "@mui/icons-material/AccountBalanceOutlined";
import React, { useEffect } from "react";
import kraje from "../kraje.json";
import okresy from "../okresy.json";
import styled from "styled-components";
const Homepage = () => {
  const [okresyState, setOkresyState] = useState([]);
  const [count, setCount] = useState(0);
  const [inputValue, setInputValue] = useState("");
  const [globalLocalSkoly, setGlobalLocalSkoly] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [code, setCode] = useState();
  const [miniOkresy, setMiniOkresy] = useState([]);
  const dispatch = useDispatch();
  const skoly = useSelector((state) => state.skoly.skoly);
  const status = useSelector((state) => state.skoly.status);
  const elementRef = useRef();
  let mestys = [];
  let localSkoly = [];
  const handleClick = (code) => {
    dispatch(getSkoly({ code, count }));
    setGlobalLocalSkoly([]);
    setMiniOkresy([]);

    setSearchResults([]);
    setInputValue("");
    setCode(code);
    dispatch(clearSkolyArr());
    if (count === 0) {
      setCount((prev) => prev + 30);
    } else {
      setCount(0);
    }
  };
  const getLocalSkoly = (skolaCode) => {
    setGlobalLocalSkoly([]);
    elementRef.current.scrollIntoView({
      behavior: "smooth",
    });
    skoly.map((skola) => {
      if (
        skola?.Reditelstvi?.RedAdresa2 === skolaCode &&
        !localSkoly.includes(skola)
      ) {
        localSkoly.push(skola);
      }
      setGlobalLocalSkoly(localSkoly);
    });
  };

  useEffect(() => {
    {
      skoly.map((skola) => {
        if (!mestys.includes(skola.Reditelstvi.RedAdresa2)) {
          mestys.push(skola.Reditelstvi.RedAdresa2);
        }
        setMiniOkresy(mestys);
      });
    }
  }, [skoly]);
  const handleGetOkresy = (code) => {
    dispatch(clearSkolyArr());
    setOkresyState([]);
    setGlobalLocalSkoly([]);
    setMiniOkresy([]);
    setCount(0);
    setSearchResults([]);
    setInputValue("");
    let okresArray = [];
    okresy.map((okres, i) => {
      if (okres.nuts4.match(code)) {
        setOkresyState((prev) => [...prev, okres]);
        okresArray.push(okres);
      } else {
        return;
      }
    });
  };
  const handleChange = (e) => {
    setInputValue(e.target.value);
    const results = miniOkresy.filter((okres) =>
      okres.toLowerCase().includes(e.target.value.toLowerCase())
    );

    setSearchResults(results);
  };

  const fetchSkola = (id) => {
    dispatch(getExactSkola(id));
    dispatch(setPopup());
  };

  return (
    <Home>
      <LinkWrapper to="/">
        <Header>Najdi si svoji školu</Header>
      </LinkWrapper>
      <Kraje>
        {kraje.map((kraj, i) => (
          <SingleKraj key={i} onClick={() => handleGetOkresy(kraj.kodNuts3)}>
            {}
            {kraj.nazev.cs}
          </SingleKraj>
        ))}
      </Kraje>
      {okresyState.length > 0 && (
        <Okresy>
          {okresyState?.map((okres) => (
            <div key={okres.id}>
              <SingleKraj onClick={() => handleClick(okres.nuts4)}>
                {okres.nazev}
              </SingleKraj>
            </div>
          ))}
        </Okresy>
      )}
      <MestskeCastiWrapper>
        <Input
          value={inputValue}
          onChange={(e) => handleChange(e)}
          placeholder="Filtrovat"
        />
        <MestskeCasti>
          {searchResults.length > 0 || inputValue.length > 0
            ? searchResults?.map((skola) => (
                <div key={skola}>
                  <SkolyLink onClick={() => getLocalSkoly(skola)}>
                    {skola}
                  </SkolyLink>
                </div>
              ))
            : miniOkresy?.map((skola) => (
                <div key={skola}>
                  <SkolyLink onClick={() => getLocalSkoly(skola)}>
                    {skola}
                  </SkolyLink>
                </div>
              ))}
        </MestskeCasti>
      </MestskeCastiWrapper>

      <Skoly ref={elementRef}>
        {globalLocalSkoly?.map((skola, i) => (
          <SingleSkola key={i}>
            <AccountBalanceOutlinedIcon style={{ fontSize: "100px" }} />
            <SkolaName>{skola.Reditelstvi.RedPlnyNazev}</SkolaName>
            <Button onClick={() => fetchSkola(skola.RedIzo)}>
              Více informací
            </Button>
          </SingleSkola>
        ))}
      </Skoly>
    </Home>
  );
};

const LinkWrapper = styled(Link)`
  cursor: pointer;
  transition: all 100ms ease;
  &:hover {
    color: #ed3733;
  }
`;
const SkolyLink = styled.a`
  cursor: pointer;
  transition: all 100ms ease;
  &:hover {
    color: #ed3733;
  }
`;
const Header = styled.h1`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0;
  padding: 20px;
  font-size: calc(4vw + 4vh + 2vmin);
  color: #ffc502;
  text-decoration: underline;
  text-decoration-color: #ed3733;
`;
const Kraje = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  grid-gap: 10px;
  box-shadow: rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px;
  padding: 20px;
  font-weight: bold;
  border-radius: 5px;
  margin-bottom: 20px;
`;
const Okresy = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  grid-gap: 10px;
  box-shadow: rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px;
  padding: 20px;
  font-weight: bold;
  border-radius: 5px;
  margin-bottom: 20px;
`;
const MestskeCasti = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  grid-gap: 10px;
  padding: 20px;
  font-weight: bold;
  border-radius: 5px;
  margin-bottom: 20px;
`;
const Skoly = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  grid-gap: 20px;
  text-align: center;
  padding: 10px;
  font-weight: bold;
  border-radius: 5px;
`;
const SingleKraj = styled.div`
  cursor: pointer;
  transition: all 100ms ease;
  &:hover {
    color: #ed3733;
  }
`;
const Home = styled.div`
  position: relevant;
`;
const Input = styled.input`
  box-sizing: border-box;
  box-shadow: rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px;
  margin: 10px;
  width: 50%;
`;
const Button = styled.button`
  background: #424ec9;
  color: white;
  border: none;
  padding: 10px;
  font-weight: bold;
  border-radius: 5px;
  cursor: pointer;
`;
const SkolaName = styled.p`
  background-color: #ed3733;
  color: white;
  border-radius: 5px;
  padding: 10px;
`;

const MestskeCastiWrapper = styled.div`
  box-shadow: rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px;
`;
const SingleSkola = styled.div`
  background-color: #ffc502;
  margin: 10px;
  padding: 10px;
  color: #424ec9;
  box-shadow: rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px;
  border-radius: 5px;
`;
export default Homepage;
