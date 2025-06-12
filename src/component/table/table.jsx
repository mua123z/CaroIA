//import { useEffect, useState } from "react";
import style from "./table.module.css"

function Bando({board, onCellClick}){

    const row = board.length
    const col = board[0].length;
    var table = [];

    // const [board, setBoard] = useState(
    //     Array(row).fill().map(() => Array(col).fill(""))
    // );

    //tạo bàn cờ
    for(let i=0; i<row; i++){
        let rows = [];
        for(let j=0; j<col; j++){
            let cell = board[i][j]
            let a = <div 
                    key={`${i} - ${j}`} 
                    className={`${style.cell}`}
                    onClick={()=>onCellClick(i,j)}
                >
                    {cell}                 
                </div>
            rows.push(a)
        }
        table.push(<div key={i} className={`${style.rows}`}>{rows}</div>)  
    }

    return(
        <div className={`${style.table}`}>
            {table}
        </div>
    )
}

export default Bando;