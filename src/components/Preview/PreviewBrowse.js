import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Preview from "./Preview";
import App from "../App";
import Theme from "../Theme/Theme";

function PreviewBrowse() {
  return (
    <>
      <BrowserRouter>
        <Theme />
        <Routes>
          <Route path="/preview" element={<Preview />} />
          <Route path="/" element={<App />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default PreviewBrowse;
