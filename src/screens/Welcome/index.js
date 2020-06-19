import React from "react";
import { Header } from "../../components";
import WelcomeMessage from "./WelcomeMessage";
import "./style.scss";

function Welcome() {
  return (
    <>
      <Header />
      <WelcomeMessage />
    </>
  );
}

export default Welcome;
