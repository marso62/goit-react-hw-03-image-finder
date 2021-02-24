import React from "react";
import Loader from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

export default class App extends React.Component {
  render() {
    return (
      <Loader
        type="Hearts"
        color="#ff0000"
        height={180}
        width={180}
        timeout={3000}
      />
    );
  }
}
