function Evaluate(board, condition) {
    const lines = [
        [0, 1],  // ngang →
        [1, 0],  // dọc ↓
        [1, 1],  // chéo ↘
        [1, -1], // chéo ↙
    ];

    const row = board.length;
    const col = board[0].length;
    const isSmallBoard = row === 3 && col === 3;

    function scoreLine(i, j, dx, dy) {
        if (isSmallBoard) {
            //  Đơn giản cho bàn 3x3
            let X = 0, O = 0;
            for (let step = 0; step < condition; step++) {
                const x = i + step * dx;
                const y = j + step * dy;
                if (x < 0 || y < 0 || x >= row || y >= col) return 0;
                const cell = board[x][y];
                if (cell === "X") X++;
                else if (cell === "O") O++;
            }

            if (X > 0 && O > 0) return 0;
            if (O === condition) return 10000;
            if (O === condition - 1) return 1000;
            if (O === condition - 2) return 100;
            if (O === condition - 3) return 10;


            if (X === condition) return -10000;
            if (X === condition - 1) return -1000;
            if (X === condition - 2) return -100;
            if (X === condition - 3) return -10;

            return 0;
        }

        //  Nâng cao cho bàn lớn
        let X = 0, O = 0;
        let blockX = 0, blockO = 0;

        for (let step = 0; step < condition; step++) {
            const x = i + step * dx;
            const y = j + step * dy;
            if (x < 0 || y < 0 || x >= row || y >= col) return 0;
            const cell = board[x][y];
            if (cell === "X") X++;
            else if (cell === "O") O++;
        }

        const prevX = i - dx;
        const prevY = j - dy;
        const nextX = i + condition * dx;
        const nextY = j + condition * dy;

        if (prevX >= 0 && prevX < row && prevY >= 0 && prevY < col) {
            if (board[prevX][prevY] !== "") {
                if (board[prevX][prevY] === "X") blockX++;
                else blockO++;
            }
        }
        if (nextX >= 0 && nextX < row && nextY >= 0 && nextY < col) {
            if (board[nextX][nextY] !== "") {
                if (board[nextX][nextY] === "X") blockX++;
                else blockO++;
            }
        }
        // kiểm tra nếu bị vahwnj 2 đầu thì trả về 0
        if ((X > 0 && O > 0) || (X > 0 && blockX === 2) || (O > 0 && blockO === 2)) return 0;

        if (O > 0 && X === 0) { //kiểm tra xem khoogn bị chặn hay chặn 1 đầu
            if (blockO === 0) {
                if (O === condition) return 10000;
                if (O === condition - 1) return 1000;
                if (O === condition - 2) return 100;
                if (O === condition - 3) return 10;
            } else if (blockO === 1) { //nếu bị chặn 1 đầu thì giảm điểm xuống
                if (O === condition) return 1000;
                if (O === condition - 1) return 100;
                if (O === condition - 2) return 10;
            }
        }

        if (X > 0 && O === 0) {//kiểm tra xem khoogn bị chặn hay chặn 1 đầu
            if (blockX === 0) {
                if (X === condition) return -10000;
                if (X === condition - 1) return -1000;
                if (X === condition - 2) return -100;
                if (X === condition - 3) return -10;
            } else if (blockX === 1) { //nếu bị chặn 1 đầu thì giảm điểm xuống
                if (X === condition) return -1000;
                if (X === condition - 1) return -100;
                if (X === condition - 2) return -10;
            }
        }

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

export default Evaluate;
