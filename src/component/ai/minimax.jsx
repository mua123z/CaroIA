import Evaluate from "./evaluate";
import CheckHoa from "../checkHoa";
import GetAvailableMoves from "./utils";
import CheckWin from "../checkWinLost";

function Minimax(board, depth, isMaximizing, alpha, beta, lastMove, condition) {
    // Nếu vừa có nước đi trước đó
    if (lastMove) {
        const [i, j] = lastMove;
        const symbol = isMaximizing ? "O" : "X"; //  Đúng chiều đánh của lượt trước

        if (CheckWin(board, i, j, symbol, condition)) {
            return symbol === "O" ? 10000 - depth : -10000 + depth;
        }
    }


    // Nếu hòa hoặc hết độ sâu
    if (depth === 0 || CheckHoa(board)) {
        return Evaluate(board, condition);
    }

    const moves = GetAvailableMoves(board);
 
    if (isMaximizing) {
        let maxEval = -Infinity;
        for (const [i, j] of moves) {
            board[i][j] = "O";
            const score = Minimax(board, depth - 1, false, alpha, beta, [i, j], condition);
            board[i][j] = "";

            maxEval = Math.max(maxEval, score);
            alpha = Math.max(alpha, score);
            if (beta <= alpha) break; // cắt nhánh
        }
        return maxEval;
    } else {
        let minEval = Infinity;
        for (const [i, j] of moves) {
            board[i][j] = "X";
            const score = Minimax(board, depth - 1, true, alpha, beta, [i, j], condition);
            board[i][j] = "";

            minEval = Math.min(minEval, score);
            beta = Math.min(beta, score);
            if (beta <= alpha) break; // cắt nhánh
        }
        return minEval;
    }
}

export default Minimax;
