import CheckWin from "../checkWinLost";

function Evaluate(board, condition) {
    const lines = [
        [0, 1],  // ngang →
        [1, 0],  // dọc ↓
        [1, 1],  // chéo ↘
        [1, -1], // chéo ↙
    ];

    const row = board.length;
    const col = board[0].length;

    // function countLine(i, j, dx, dy, symbol) {
    //     let count = 0;
    //     for (let step = 0; step < 5; step++) {
    //         const x = i + step * dx;
    //         const y = j + step * dy;
    //         if (x < 0 || y < 0 || x >= row || y >= col || board[x][y] !== symbol) {
    //             return 0;
    //         }
    //     }
    //     // 5 quân liên tiếp
    //     return 5;
    // }

    function scoreLine(i, j, dx, dy) {
        let score = 0;
        let X = 0, O = 0;
        for (let step = 0; step < 5; step++) {
            const x = i + step * dx;
            const y = j + step * dy;
            if (x < 0 || y < 0 || x >= row || y >= col) return 0;
            const cell = board[x][y];
            if (cell === "X") X++;
            else if (cell === "O") O++;
        }

        if (X > 0 && O > 0) return 0; // Bị chặn cả hai bên → không tính
        if (O === 5) return 1000;
        if (O === 4) return 100;
        if (O === 3) return 10;
        if (O === 2) return 1;
        if (X === 5) return -1000;
        if (X === 4) return -100;
        if (X === 3) return -10;
        if (X === 2) return -1;

        return 0;
    }

    let totalScore = 0;

    for (let i = 0; i < row; i++) {
        for (let j = 0; j < col; j++) {
            for (const [dx, dy] of lines) {
                totalScore += scoreLine(i, j, dx, dy);
            }
        }
    }

    return totalScore;
}

export default Evaluate