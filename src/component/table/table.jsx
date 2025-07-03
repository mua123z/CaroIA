//import { useEffect, useState } from "react";
import style from "./table.module.css"

function Bando({board, onCellClick, lastMove, disabled, suggest}){

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

            const isLast = lastMove && lastMove[0] === i && lastMove[1] === j;

            //kiểm tra xem có ô higlight không 
            const issuggest = suggest && suggest[0] === i && suggest[1] ===j

            let cell = board[i][j]
            let display = issuggest && cell === "" ? "?" : cell;

            let a = <div 
                        key={`${i} - ${j}`} 
                        className={`${style.cell}  ${isLast ? style.highlight : ""} ${issuggest ? style.mayGoiY: ""}`}
                        onClick={() => !disabled && onCellClick(i, j)}
                    >
                    {display}                 
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