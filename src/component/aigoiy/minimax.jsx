import Evaluate from "../ai/evaluate";
import CheckHoa from "../checkHoa";
import GetAvailableMoves from "../ai/utils";
import CheckWin from "../checkWinLost";

function Minimax(board, depth, isMaximizing, alpha, beta, lastMove, condition, aiSymbol) {
    const opponent = aiSymbol === "O" ? "X" : "O";

    if (lastMove) {
        const [i, j] = lastMove;
        const symbol = isMaximizing ? aiSymbol : opponent;

        if (CheckWin(board, i, j, symbol, condition)) {
            return symbol === aiSymbol ? 10000 - depth : -10000 + depth;
        }
    }

    if (depth === 0 || CheckHoa(board)) {
        return Evaluate(board, condition);
    }

    const moves = GetAvailableMoves(board);

    if (isMaximizing) {
        let maxEval = -Infinity;
        for (const [i, j] of moves) {
            board[i][j] = aiSymbol;
            const score = Minimax(board, depth - 1, false, alpha, beta, [i, j], condition, aiSymbol);
            board[i][j] = "";

            maxEval = Math.max(maxEval, score);
            alpha = Math.max(alpha, score);
            if (beta <= alpha) break;
        }
        return maxEval;
    } else {
        let minEval = Infinity;
        for (const [i, j] of moves) {
            board[i][j] = opponent;
            const score = Minimax(board, depth - 1, true, alpha, beta, [i, j], condition, aiSymbol);
            board[i][j] = "";

            minEval = Math.min(minEval, score);
            beta = Math.min(beta, score);
            if (beta <= alpha) break;
        }
        return minEval;
    }
}

export default Minimax