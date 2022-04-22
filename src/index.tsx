import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { QueryClientProvider } from "react-query";

import "./index.css";
import "./others/contexts/i18n";
import reportWebVitals from "./reportWebVitals";

import { Home } from "./pages/home";
import { Locator } from "./pages/locator";
import { Review } from "./pages/review";
import { Success } from "./pages/success";
import { Supplies } from "./pages/supplies";
import { Contact } from "./pages/contact";
import { FormContextProvider } from "./others/contexts/form";
import { queryClient } from "./others/contexts/api";
import { NotFound } from "./pages/notFound";

ReactDOM.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <FormContextProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/locator" element={<Locator />} />
            <Route path="/review" element={<Review />} />
            <Route path="/success" element={<Success />} />
            <Route path="/supplies" element={<Supplies />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </FormContextProvider>
    </QueryClientProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
