import CheckWin from "../component/checkWinLost";
import CheckHoa from "../component/checkHoa";
import Bando from "../component/table/table";
import { useState } from "react";
import Thongbao from "../component/thongbao/thongbao";
import SizeTable from "../component/chonSizeTable/sizeTable";
import { Link } from "react-router-dom";

import Ai from "../component/aigoiy/ai";
import Minimax from "../component/aigoiy/minimax";

import style from "./ngvsng.module.css"


function NgvsNg(){
    //khởi tạo kích thước bàn cờ
    const [row, setRow] = useState(3);
    const [col, setCol] = useState(3);

    //tạo ô trống bàn cờ
    const [board, setBoard] = useState(
        Array(row).fill().map(() => Array(col).fill(""))
    );

    //kiểm tra ấn nút start hay chưa
    const [start, setStart] = useState(0)
    function Start(){
        setStart(start+1)
        console.log(start)
        document.getElementById("start").style.visibility="hidden";
        document.getElementById("luotchoi").style.visibility="visible";
    }

    //thay đổi người chơi
    const [player, setPlayer] = useState("A")
    //thay đổi lượt chơi
    const [play, setPlay] = useState("X")

    //lưu người thắng
    const [win, setWin] = useState()

    //biến thoooonng báo
    const [thongbao, setThongBao] = useState("")

    //hàm reset bàn cờ
    function ResetBoard(){

        setSuggest(null)
        //reset bảng
        const newBoard = Array(row).fill().map(() => Array(col).fill(""))
        //cập nhật bảng
        setBoard(newBoard);
        //lưu bảng
        setHistory([]);
        
        setPlayer("A")
        setPlay("X")
        // ẩn thông báo
        setThongBao("")
        //k cho udo
        notUndoA(false);
        notUndoB(false);
        setKq(false)
    }

    //biến lưu bàn cờ để undo
    const [history, setHistory] = useState([]);
    //biến đê cho phép chỉ undo 1 lần
    const [undoA, notUndoA] = useState(false)
    const [undoB, notUndoB] = useState(false)
    //hàm undo 1 nước đi mới nhất
    function Undo(){
        if ((player === "A" && undoA) || (player === "B" && undoB)) {
            alert("Bạn chỉ có thể Undo nước đi của chính mình ngay sau khi đi!");
            return;
        }

        if (history.length === 0) {
            alert("Không còn bước nào để Undo");
            return;
        }

        if(kq){
            alert("Ván đấu đã kết thúc.")
            return;
        }

        // Lấy trạng thái trước đó
        const lastBoard = history[history.length - 1];
        setBoard(lastBoard);
        setHistory([]);

        // Lùi lại lượt chơi
        setPlayer(player === "A" ? "B" : "A");
        setPlay(play === "X" ? "O" : "X");

        // Đánh dấu đã undo
        if (player === "A"){
            notUndoB(true)
        }else {
            notUndoA(true)
        };

        // Xóa thông báo nếu có
        setThongBao("");
    }

    //biến lưu điều kiện thắng
    const [condition, setCondition] = useState(3)

    const [showAI, setShowAI] = useState(true)
    //hàm thay đổi kích thước bàn cờ
    function SizeChange(size){
        setSuggest(null)
        //cập nhật điều kiện thắng
        const newCondition = size === 3 ? 3 : 5;
        setCondition(newCondition);
        setShowAI(size<11)
        //cập nhật lại khích thước
        setRow(size);
        setCol(size);

        // Tạo bàn cờ mới
        const newBoard = Array(size).fill().map(() => Array(size).fill(""));
        setBoard(newBoard)
        // cập nhật lại all các trạng thái
        setHistory([]);
        setThongBao("");
        setKq(false);
    }

    //biến higlight quân cờ sau mỗi nước đi
    const [lastMove, setLastMove] = useState(null); // [i, j]

    //biến lưu kết quả thắng thua
    const [kq, setKq] = useState(false)


    //xử lí khi bắt đầu chơi
    function handleClick(i,j){
        if(kq){
            alert("Ván đấu đã kết thúc.")
            return;
        }
        //kiểm tra xem người chơi ấn nút sẵn sàng chưa
        if(start!==1){
            alert("Hãy click Start để bắt đầu chơi")
        }else if(board[i][j] !==""){
            alert("Vị trí đã được chọn. Bạn hãy chọn vị trí khác")
        }else{
            setSuggest(null)

            setLastMove([i, j]);
            const newBoard = board.map((r) => [...r]);
            newBoard[i][j] = play;
            //lưu bàn cờ
            setHistory([board.map(row => [...row])]); // chỉ lưu 1 bước gần nhất
            //cập nhật lại bàn cờ
            setBoard(newBoard);

            //GỌI HÀM KIỂM TRA THẮNG THUA
            const kiemtra = CheckWin (newBoard, i, j, play, condition)
            if(kiemtra){
                console.log("Người chơi " + player + " " +"(" + play + ")" + " thắng");
                setWin(`${player} (${play}) thắng`)
                setThongBao("win")
                setKq(true)
                return;
            }
            // GỌI HÀM KIỂM TRA HÒA
            //kiểm tra hòa
            if(CheckHoa(newBoard)){
                setBoard(newBoard);
                console.log("Kết quả: hòa")
                setThongBao("hoa")
                setKq(true)
                return;
            }

            //cho phép người chơi sau cùng undo
            if (player === "A") {
                notUndoA(false); // A vừa đi → A có thể undo
            } else {
                notUndoB(false); // B vừa đi → B có thể undo
            }

            //nếu chưa thắng thua hoặc hòa
            //thay đổi người chơi
            setPlayer(player === "A" ? "B" : "A")
            //thay đổi X, O
            setPlay(play ==="X" ? "O" : "X")
        }
    }

    //biến lưu nước đi đề xuất của AI để higlight
    const[suggest, setSuggest] = useState(null)

    //hàm máy gọi ý nước đi
    function handleSuggestMove() {
        if (kq) {
            alert("Ván đấu đã kết thúc.");
            return;
        }

        if (start !== 1) {
            alert("Hãy click Start để bắt đầu chơi");
            return;
        }

        const suggestion = Ai(board, condition, play); // <-- Sửa dòng này
        if (!suggestion) {
            alert("Không tìm được gợi ý.");
            return;
        }

        const [i, j] = suggestion;
        //trả về vị trí AI gợi ý
        setSuggest([i, j])
    }


    

    return(
        <div className={`${style.all}`}>
            <div className={`${style.nenmo}`}></div>

            <div className={`${style.ngvsng}`}>
                <div className={`${style.head}`}>
                    <h1>Người chơi A</h1>
                    <button onClick={Start} id="start">Start</button>
                    <h1>Người chơi B</h1>
                </div>
                
                <div>
                    <h2 id="luotchoi" style={{visibility:"hidden", color:"rgb(255, 238, 0)"}}>Lượt của người chơi {player}({play})</h2>
                </div>

                <div className={`${style.body}`}>
                    <SizeTable onSelectSize={SizeChange} className={`${style.cn}`}/>
                    <Bando board={board} onCellClick={handleClick} lastMove={lastMove} suggest={suggest}></Bando>
                    <div className={`${style.cn} d-flex  flex-column`}>
                        <Link to="/">Home</Link>
                        <button onClick={Undo}>Undo</button>
                        {showAI && (
                            <button onClick={handleSuggestMove} id="ai">AI gợi ý</button>
                        )}
                        <button onClick={ResetBoard}>Reset game</button>
                    </div>
                </div>

                {thongbao && 
                    <div className={`${style.tb}`}>
                        <Thongbao  tb={thongbao} onReset={ResetBoard} win={win} onClose={()=>{setThongBao("")}}/>
                    </div>
                }
            </div>
        </div>
    )
}

export default NgvsNg;