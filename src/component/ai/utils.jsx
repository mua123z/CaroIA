function GetAvailableMoves(board) {
    const moves = new Set();
    const directions = [-1, 0, 1];
    const row = board.length;
    const col = board[0].length;
    let found = false;

    // ✅ Duyệt bàn cờ, tìm các ô trống lân cận quân cờ
    for (let i = 0; i < row; i++) {
        for (let j = 0; j < col; j++) {
            if (board[i][j] !== "") {
                found = true; // Có quân cờ rồi
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

    // ✅ Nếu bàn cờ còn trống hoàn toàn → cho phép đi bất kỳ ô nào
    if (!found) {
        for (let i = 0; i < row; i++) {
            for (let j = 0; j < col; j++) {
                if (board[i][j] === "") {
                    moves.add(`${i},${j}`);
                }
            }
        }
    }

    // ✅ Chuyển Set về mảng tọa độ
    let result = Array.from(moves).map(s => s.split(",").map(Number));

    // ✅ Ưu tiên ô giữa nếu là bàn 3x3
    if (row === 3 && col === 3) {
        const center = [1, 1]; // Tọa độ giữa
        result.sort((a, b) => {
            const distA = Math.abs(a[0] - center[0]) + Math.abs(a[1] - center[1]);
            const distB = Math.abs(b[0] - center[0]) + Math.abs(b[1] - center[1]);
            return distA - distB; // Gần trung tâm hơn sẽ lên trước
        });
    }

    return result;
}

export default GetAvailableMoves;
