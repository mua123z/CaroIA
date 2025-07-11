import { Link } from "react-router-dom";
//import {Link, Outlet} from 'react-router-dom';
import style from "./home.module.css"

function Home(){
    return(
        <div className={`${style.all}`}>
            <h1>TRÍ TUỆ NHÂN TẠO, NHÓM 11</h1>
            <h2>WELCOME TO CARO</h2>
            
            <div className={`${style.chon}`}>
                <Link to="ngvsng" className={`${style.bt}`}>
                    <h2>Người với người</h2>
                </Link>

                <Link to="/ng-vs-may" className={`${style.bt}`}>
                    <h2>Người với Máy</h2>
                </Link>
            </div>
        </div>
    )
}

export default Home;