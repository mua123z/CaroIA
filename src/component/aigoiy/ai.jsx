import Minimax from "../ai/minimax";
import GetAvailableMoves from "../ai/utils";
import CheckWin from "../checkWinLost";

function Ai(board, condition, symbol) {
    const opponent = symbol === "O" ? "X" : "O";
    const depth = board.length <= 3 ? 6 : board.length <= 11 ? 2 : 1;
    const moves = GetAvailableMoves(board);
    let bestMove = null;
    let bestScore = -Infinity;

    // 1. Ưu tiên nước THẮNG NGAY
    for (const [i, j] of moves) {
        board[i][j] = symbol;
        if (CheckWin(board, i, j, symbol, condition)) {
            board[i][j] = "";
            return [i, j]; // thắng luôn
        }
        board[i][j] = "";
    }

    // 2. Chặn đối thủ chuẩn bị thắng
    for (const [i, j] of moves) {
        board[i][j] = opponent;
        if (CheckWin(board, i, j, opponent, condition)) {
            board[i][j] = "";
            return [i, j]; // chặn lại ngay
        }
        board[i][j] = "";
    }

    // 3. Minimax
    for (const [i, j] of moves) {
        board[i][j] = symbol;
        const score = Minimax(board, depth, false, -Infinity, Infinity, [i, j], condition, symbol);
        board[i][j] = "";
        if (score > bestScore) {
            bestScore = score;
            bestMove = [i, j];
        }
    }

    return bestMove;
}

export default Ai
