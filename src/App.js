import React, { useEffect, useState } from "react";
import "./styles/App.css"
import { BrowserRouter, Link, Route, Switch, Redirect } from "react-router-dom";
import About from "./pages/About";
import Posts from "./pages/Posts";
import Navbar from "./components/UI/navbar/Navbar";
import Error from "./pages/Error";
import AppRouter from "./components/AppRouter";


function App() {
    return (
        <BrowserRouter>
            <Navbar />
            <AppRouter />
        </BrowserRouter>
    )
};

export default App;
