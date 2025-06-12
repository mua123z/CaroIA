import React from "react";
import { Link } from "react-router-dom";
//import {Link, Outlet} from 'react-router-dom';
import style from "./home.module.css"

function Home(){
    return(
        <div className={`${style.all}`}>
            <h1>WELCOME TO CARO</h1>
            <div className={`${style.chon}`}>
                <Link to="/ng-vs-may" className={`${style.bt}`}>
                    <h2>Người với Máy</h2>
                </Link>

                <Link to="may-vs-may" className={`${style.bt}`}>
                    <h2>Máy với Máy</h2>
                </Link>
            </div>
        </div>
    )
}

export default Home;