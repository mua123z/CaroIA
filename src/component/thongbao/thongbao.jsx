import style from "./thongbao.module.css"

function Thongbao({tb, onReset}){
   
    return (
        (tb === "banthang" || tb === "maythang" || tb === "hoa") && (
            <div className={style.all}>
            <div className={style.thongbao}>
                <h2>
                    {tb === "banthang"
                        ? "Bạn thắng"
                        : tb === "maythang"
                        ? "Máy thắng"
                        : "Hòa"}
                </h2>
                <div>
                    <button onClick={onReset}>Reset Game</button>
                </div>
            </div>
            </div>
        )
    );

}

export default Thongbao;