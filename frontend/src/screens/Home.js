import React from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import Counter from "../components/Counter";

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <Wrapper>
        <Icon src="https://raw.githubusercontent.com/reduxjs/redux/master/logo/logo.png" />
        <Title>You're good to go!</Title>
        <Counter />
      </Wrapper>
    );
  }
}

const Wrapper = styled.div`
  background-color: #1c2331;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;
const Title = styled.h1`
  text-align: center;
  color: white;
`;
const Icon = styled.img`
  width: 100px;
  height: auto;
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

export default connect(mapStateToProps, mapDispatchToProps)(Home);
