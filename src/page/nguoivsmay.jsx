import Bando from "../component/table/table";
import { useState } from "react";
import CheckWin from "../component/checkWinLost"
import Ai from "../component/ai/ai";
import CheckHoa from "../component/checkHoa";
import Thongbao from "../component/thongbao/thongbao";
import style from "./ngvsmay.module.css"

function NgvsMay(){
    const row = 10;
    const col = 10;

    const [thongbao, setThongBao] = useState("")

    //hàm reset bàn cờ về trạng thái ban đầu
    function ResetBoard(){
        //reset bảng
        const newBoard = Array(row).fill().map(() => Array(col).fill(""))
        //cập nhật bảng
        setBoard(newBoard);
        // ẩn thông báo
        setThongBao("")
    }

    const [board, setBoard] = useState(
        Array(row).fill().map(() => Array(col).fill(""))
    );

    function handleClick(i,j){
        if (board[i][j] !== ""){
            alert("Vị trí đã được chọn!! Vui lòng chọn vị trí khác")
        }else{
            console.log("bạn đi")
            const newBoard = board.map((r) => [...r]);
            newBoard[i][j] = "X";
            setBoard(newBoard);
            
            // gọi hàm kiểm tra thắng thua
            const isWin = CheckWin(newBoard, i, j, "X");
            if (isWin) {
                setBoard(newBoard);
                setThongBao("banthang")
            return;
            }
            
            //kiểm tra hòa
            if(CheckHoa(newBoard)){
                setBoard(newBoard);
                setThongBao("hoa")
                return;
            }

            //gọi hàm máy chơi sau khi người chơi chơi
            setTimeout(()=>{
                const bot = Ai(newBoard)
                if(bot){
                    const [botI, botJ] = bot;
                    console.log("máy đi");

                    const newBoard2 = newBoard.map((r) => [...r]);
                    newBoard2[botI][botJ] = "O";
                    
                    //kiemr tra thắng thua
                    const botWin = CheckWin(newBoard2, botI, botJ, "O");
                    if(botWin){
                        setBoard(newBoard2);
                        setThongBao("maythang")
                        return;
                    }
                    //kiểm tra hòa
                    if(CheckHoa(newBoard2)){
                        setBoard(newBoard2);
                        setThongBao("hoa")
                        return;
                    }

                    setBoard(newBoard2);
                }
            }, 500)// máy đi sau khi người đi 0,5s
        }
    }

    return (
        <div className={`${style.all}`}>
            <h2>Người với máy</h2>
            <Thongbao tb={thongbao} onReset={ResetBoard}/>
            <Bando board={board} onCellClick={handleClick}/>
        </div>
    )
}

export default NgvsMay;