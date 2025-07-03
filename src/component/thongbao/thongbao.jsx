import style from "./thongbao.module.css"
import NgvsNg from "../../page/ngvsng";
function Thongbao({tb, onReset, win, onClose}){
    return (
        
        (tb === "banthang" || tb === "maythang" || tb === "hoa" || tb==="win") && (
            <div className={style.all} id="tb">
            <div className={style.thongbao}>
                <h2>
                    {tb === "banthang"
                        ? "Bạn thắng"
                        : tb === "maythang"
                        ? "Máy thắng"
                        : tb === "hoa"
                        ? "Hòa"
                        : tb === "win"
                        ? win
                        :   ""
                    }
                </h2>
                <div className={`${style.bt}`}>
                    <button onClick={onReset}>Reset Game</button>
                    <button onClick={onClose}>Xem lại</button>
                </div>
            </div>
            </div>
        )
    );

}

export default Thongbao;