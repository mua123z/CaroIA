import Minimax from "./minimax";
import GetAvailableMoves from "./utils";
import CheckWin from "../checkWinLost";

function Ai(board, condition) {
    const depth = board.length <= 3 ? 6 : board.length <= 11 ? 2 : 1;
    const moves = GetAvailableMoves(board);
    let bestMove = null;
    let bestScore = -Infinity;

    // 🥇 1. Ưu tiên nước THẮNG NGAY
    for (const [i, j] of moves) {
        board[i][j] = "O";
        if (CheckWin(board, i, j, "O", condition)) {
            board[i][j] = "";
            return [i, j]; // 🏆 thắng luôn
        }
        board[i][j] = "";
    }

    // 🧱 2. Chặn nước người CHUẨN BỊ THẮNG
    for (const [i, j] of moves) {
        board[i][j] = "X";
        if (CheckWin(board, i, j, "X", condition)) {
            board[i][j] = "";
            return [i, j]; // ⚔ chặn lại ngay
        }
        board[i][j] = "";
    }

    // 🤖 3. Nếu không có nước thắng / chặn → chạy Minimax
    for (const [i, j] of moves) {
        board[i][j] = "O";
        const score = Minimax(board, depth, false, -Infinity, Infinity, [i, j], condition);
        board[i][j] = "";
        if (score > bestScore) {
            bestScore = score;
            bestMove = [i, j];
        }
    }

    return bestMove;
}

export default Ai;
