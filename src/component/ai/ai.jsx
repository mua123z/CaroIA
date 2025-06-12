import CheckWin from "../checkWinLost";
import Minimax from "./minimax";
import GetAvailableMoves  from "./utils";

function Ai(board) {
    let bestScore = -Infinity;
    let move = null;
    const moves = GetAvailableMoves(board);

    // Thay đổi độ sâu tùy theo kích thước bàn cờ
    const depth = board.length <= 7 ? 2 : 1;

    for (const [i, j] of moves) {
        board[i][j] = "O";
        const score = Minimax(board, depth, false, -Infinity, Infinity, [i, j]);
        board[i][j] = "";
        if (score > bestScore) {
            bestScore = score;
            move = [i, j];
        }
    }

    return move;
}

export default Ai;