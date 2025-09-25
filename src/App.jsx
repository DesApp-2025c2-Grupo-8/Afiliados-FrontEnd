//import React, { useEffect, useState } from "react";
import { BrowserRouter } from "react-router-dom";
import { AppRouter } from "./AppRouter";



export function App() {

  return (
    <BrowserRouter>
      <footer className="blockquote-footer">
        Someone famous in <cite title="Source Title">Source Title</cite>
      </footer>
      <AppRouter />
    </BrowserRouter>
  )
}
