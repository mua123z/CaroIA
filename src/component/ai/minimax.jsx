import Evaluate from "./evaluate";
import CheckHoa from "../checkHoa";
import GetAvailableMoves from "./utils";

function Minimax(board, depth, isMaximizing, alpha, beta, lastMove = null) {
    const score = lastMove ? Evaluate(board, lastMove[0], lastMove[1]) : 0;
    if (Math.abs(score) === 1000 || depth === 0 || CheckHoa(board)) {
        return score;
    }

    const moves = GetAvailableMoves(board);

    if (isMaximizing) {
        let maxEval = -Infinity;
        for (const [i, j] of moves) {
            board[i][j] = "O";
            const score = Minimax(board, depth - 1, false, alpha, beta, [i, j]);
            board[i][j] = "";
            maxEval = Math.max(maxEval, score);
            alpha = Math.max(alpha, score);
            if (beta <= alpha) break;
        }
        return maxEval;
    } else {
        let minEval = Infinity;
        for (const [i, j] of moves) {
            board[i][j] = "X";
            const score = Minimax(board, depth - 1, true, alpha, beta, [i, j]);
            board[i][j] = "";
            minEval = Math.min(minEval, score);
            beta = Math.min(beta, score);
            if (beta <= alpha) break;
        }
        return minEval;
    }
}


export default Minimax