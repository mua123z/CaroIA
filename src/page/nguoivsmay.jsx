import Bando from "../component/table/table";
import { useState } from "react";
import CheckWin from "../component/checkWinLost";
import Ai from "../component/ai/ai";
import CheckHoa from "../component/checkHoa";
import Thongbao from "../component/thongbao/thongbao";
import style from "./ngvsmay.module.css"
import SizeTable from "../component/chonSizeTable/sizeTable";
import { Link } from "react-router-dom";

function NgvsMay(){
    
    //khởi tạo mặc định cho bàn cờ là 3x3
    const [row, setRow] = useState(3);
    const [col, setCol] = useState(3);

    //tạo ô trống bàn cờ
    const [board, setBoard] = useState(
        Array(row).fill().map(() => Array(col).fill(""))
    );

    //biến thoooonng báo
    const [thongbao, setThongBao] = useState("")

    //tọa hock điều kieenl thắng thua khi kích thước bàn cờ thay đổi
    const [condition, setCondition] = useState(3)

    //console.log(condition)
    //lưu lịch sử bàn cờ
    const [history, setHistory] = useState([]);
    const [canUndo, setCanUndo] = useState(true); // chỉ cho Undo 1 lần


    //hàm đổi kích thước bàn cờ
    function handleSizeChange(size) {
        // Cập nhật điều kiện thắng
        const newCondition = size === 3 ? 3 : 5;
        setCondition(newCondition);

        // Cập nhật row/col
        setRow(size);
        setCol(size);

        // Tạo bàn cờ mới
        const newBoard = Array(size).fill().map(() => Array(size).fill(""));

        // Cập nhật lại tất cả trạng thái
        setBoard(newBoard);
        setHistory([]);
        setThongBao("");
    }

    //hàm reset bàn cờ về trạng thái ban đầu
    function ResetBoard(){
        //reset bảng
        const newBoard = Array(row).fill().map(() => Array(col).fill(""))
        //cập nhật bảng
        setBoard(newBoard);
        // ẩn thông báo
        setThongBao("")
    }

    //hàm undo khi người chơi chọn lỗi muốn chọn lại
    function handleUndo() {
        if (canUndo && history.length >= 2) {
            const newHistory = history.slice(0, history.length - 2);
            const previousBoard = newHistory[newHistory.length - 1] || Array(row).fill().map(() => Array(col).fill(""));
            setBoard(previousBoard);
            setHistory(newHistory);
            setThongBao("");
            setCanUndo(false); // KHÔNG cho Undo tiếp
        } else {
            alert("Không thể Undo thêm nữa.");
        }
    }


    //xử lí khi người dùng dánh đầu tiên
    function handleClick(i,j){
        
        if (board[i][j] !== ""){
            alert("Vị trí đã được chọn!! Vui lòng chọn vị trí khác")
        }else{
            console.log("bạn đi")
            const newBoard = board.map((r) => [...r]);
            newBoard[i][j] = "X";
            setBoard(newBoard);
            setHistory((prev) => [...prev, newBoard]); // lưu sau lượt người
            setCanUndo(true); // cho phép undo sau lượt mới
            //console.log(condition)

            // gọi hàm kiểm tra thắng thua
            const isWin = CheckWin(newBoard, i, j, "X", condition);
            if (isWin) {
                setBoard(newBoard);
                setThongBao("banthang")
                //console.log(thongbao)
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
                    const botWin = CheckWin(newBoard2, botI, botJ, "O", condition);
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
                    setBoard(newBoard2);
                    setHistory((prev) => [...prev, newBoard2]); // lưu sau lượt máy

                }
            }, 500)// máy đi sau khi người đi 0,5s
        }
    }

    return (
        <div className={`${style.all}`}>
            <h2>Người với máy</h2>
            <Thongbao tb={thongbao} onReset={ResetBoard}/>

            <div className={`${style.contens}`}>
                <div className={`${style.chon}`}>
                    <SizeTable onSelectSize={handleSizeChange}/>
                </div>
                <div className={`${style.table}`}>
                    <Bando board={board} onCellClick={handleClick}/>
                </div>
                <div className={`${style.chucnang}`}>
                    <Link to="/" className={`${style.tohome}`}>Home</Link>
                    <button onClick={ResetBoard}>New game</button>
                    <button onClick={handleUndo}>Undo</button>
                </div>
            </div>

        </div>
    )
}

export default NgvsMay;