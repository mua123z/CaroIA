function GetAvailableMoves(board) {
    const moves = new Set();
    const directions = [-1, 0, 1];
    const row = board.length;
    const col = board[0].length;
    let found = false;

    for (let i = 0; i < row; i++) {
        for (let j = 0; j < col; j++) {
            if (board[i][j] !== "") {
                found = true; // ✅ phát hiện có quân cờ rồi
                for (let dx of directions) {
                    for (let dy of directions) {
                        const ni = i + dx;
                        const nj = j + dy;
                        if (
                            ni >= 0 && ni < row &&
                            nj >= 0 && nj < col &&
                            board[ni][nj] === ""
                        ) {
                            moves.add(`${ni},${nj}`);
                        }
                    }
                }
            }
        }
    }

    // ✅ Nếu chưa có quân nào → return toàn bộ ô trống
    if (!found) {
        for (let i = 0; i < row; i++) {
            for (let j = 0; j < col; j++) {
                if (board[i][j] === "") {
                    moves.add(`${i},${j}`);
                }
            }
        }
    }

    return Array.from(moves).map(s => s.split(",").map(Number));
}

export default GetAvailableMoves;
