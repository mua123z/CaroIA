import Minimax from "../aigoiy/minimax";
import GetAvailableMoves from "../ai/utils";
import CheckWin from "../checkWinLost";

function Ai(board, condition, symbol) {
    const opponent = symbol === "O" ? "X" : "O";
    const depth = board.length <= 3 ? 6 : board.length <= 11 ? 1 : 1;
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

    // 2. Chặn đối thủ thắng ngay
    for (const [i, j] of moves) {
        board[i][j] = opponent;
        if (CheckWin(board, i, j, opponent, condition)) {
            board[i][j] = "";
            return [i, j]; // chặn lại ngay
        }
        board[i][j] = "";
    }

    // 3. Ưu tiên chặn thế mạnh của đối thủ (các đường dài gần thắng)
    let blockMove = null;
    let maxBlockScore = -Infinity;
    for (const [i, j] of moves) {
        board[i][j] = opponent;
        const score = Minimax(board, 1, false, -Infinity, Infinity, [i, j], condition, opponent);
        board[i][j] = "";
        if (score > maxBlockScore) {
            maxBlockScore = score;
            blockMove = [i, j];
        }
    }

    if (blockMove) {
        return blockMove;
    }

    // 4. Nếu không cần chặn, dùng Minimax để tấn công
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

export default Ai;
