import { getExactSkola } from "../redux/skolySlice";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import React, { useEffect } from "react";
import styled from "styled-components";

const SingleSkola = () => {
  let params = useParams();
  const dispatch = useDispatch();
  const skola = useSelector((state) => state.skoly.skola);
  useEffect(() => {
    dispatch(getExactSkola(params.id));
  }, []);
  return <Skola></Skola>;
};

export default SingleSkola;
const Skola = styled.div``;
