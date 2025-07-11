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
        setKq(false)
    }

    //hàm reset bàn cờ về trạng thái ban đầu
    function ResetBoard(){
        //reset bảng
        const newBoard = Array(row).fill().map(() => Array(col).fill(""))

        //cập nhật lại trạng thái undo
        setCanUndo(false)
        //cập nhật bảng
        setBoard(newBoard);

        //cập nhật kết qur ván đấu
        setKq(false);
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
        }else if(kq){
            alert("Ván đấu đã kết thúc");
        }else if(history.length===0){
            alert("Không có nước đi nào để Undo");
        }else{
            alert("Không thể Undo thêm được nữa.")
        }
    }

    //biến higlight quân cờ sau mỗi nước đi mới nhất
    const [lastMove, setLastMove] = useState(null); // [i, j]

    //biến lưu kết quả thắng thua
    const [kq, setKq] = useState(false)

    //xử lí khi người  dánh đầu tiên
    function handleClick(i,j){
        if(kq){
            alert("Ván đấu đã kết thúc");
            return;
        }
        
        if (board[i][j] !== ""){
            alert("Vị trí đã được chọn!! Vui lòng chọn vị trí khác")
        }else{
            const newBoardHuman = board.map((r) => [...r]);
            newBoardHuman[i][j] = "X";
            setLastMove([i, j]);
            setBoard(newBoardHuman);
            setHistory((prev) => [...prev, newBoardHuman.map(r => [...r])]);
            
            //cho phép undo
            setCanUndo(true);

            const isWin = CheckWin(newBoardHuman, i, j, "X", condition);
            if (isWin) {
                setThongBao("banthang");
                setKq(true);
                return;
            }

            if (CheckHoa(newBoardHuman)) {
                setThongBao("hoa");
                setKq(true)
                return;
            }

            //  gọi AI với đúng bàn mới
            setTimeout(() => {
                if (thongbao) return;

                const botMove = Ai(newBoardHuman, condition);

                if (
                    !botMove ||
                    !Array.isArray(botMove) ||
                    botMove.length !== 2 ||
                    typeof botMove[0] !== "number" ||
                    typeof botMove[1] !== "number"
                ) {
                    console.warn(" Không tìm thấy nước đi hợp lệ cho máy.");
                    return;
                }

                const [botI, botJ] = botMove;

                if (newBoardHuman[botI][botJ] !== "") {
                    console.warn(" Máy định đánh vào ô đã có người!");
                    return;
                }

                const newBoard2 = newBoardHuman.map((r) => [...r]);
                newBoard2[botI][botJ] = "O";
                setLastMove([botI, botJ]);

                if (CheckWin(newBoard2, botI, botJ, "O", condition)) {
                    setBoard(newBoard2);
                    setThongBao("maythang")
                    setKq(true);
                    return;
                }

                if (CheckHoa(newBoard2)) {
                    setBoard(newBoard2);
                    setThongBao("hoa")
                    setKq(true);
                    return;
                }

                setBoard(newBoard2);
                setHistory((prev) => [...prev, newBoard2.map(r => [...r])]);

            }, 0);
        }
    }

    return (
        <div className={`${style.all}`}>
            <div className={`${style.nenmo}`}></div>
            <h1>Người với máy</h1>
            <Thongbao tb={thongbao} onReset={ResetBoard} onClose={()=>{setThongBao(""); setCanUndo(false)}}/>

            <div className={`${style.contens}`}>
                <div className={`${style.chon}`}>
                    <SizeTable onSelectSize={handleSizeChange}/>
                </div>
                
                {/* hiển thị bàn cờ */}
                <div className={`${style.table}`}>
                    <Bando board={board} onCellClick={handleClick} lastMove={lastMove}/>
                </div>

                <div className={`${style.chucnang}`}>
                    <Link to="/" className={`${style.tohome}`}>Home</Link>
                    <button onClick={handleUndo}>Undo</button>
                    <button onClick={ResetBoard}>New game</button>
                    
                </div>
            </div>

        </div>
    )
}

export default NgvsMay;