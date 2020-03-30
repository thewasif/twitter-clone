import React from "react";
import { connect } from "react-redux";
import styled from "styled-components";

const Counter = props => {
  return (
    <Wraper>
      <Title>{props.counter}</Title>
      <BtnGroup>
        <Btn onClick={() => props.add()}>+</Btn>
        <Btn onClick={() => props.subtract()}>-</Btn>
      </BtnGroup>
    </Wraper>
  );
};

const Title = styled.h1`
  text-align: center;
  color: white;
`;

const Wraper = styled.div``;
const BtnGroup = styled.div`
  margin: 10px;
  display: felx;
  justify-content: center;
  align-items: center;
`;
const Btn = styled.button`
  background: transparent;
  color: white;
  border: solid 1px #ff4444;
  padding: 4px 8px;
  margin: 8px;
  outline: none;
  box-shadow: 0 0 10px rgba(23, 100, 20, 0.4);
`;

const mapStateToProps = state => {
  return {
    counter: state.counter
  };
};

const mapDispatchToProps = dispatch => {
  return {
    add: () => dispatch({ type: "ADD" }),
    subtract: () => dispatch({ type: "SUBTRACT" })
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Counter);
