function CheckWin(board, i, j, value, condition) { // <== thêm `condition`
    function dem(board, i, j, value, dx, dy) {
        let sum = 0;
        while (
            i >= 0 && i < board.length &&
            j >= 0 && j < board[0].length &&
            board[i][j] === value
        ) {
            sum += 1;
            i += dx;
            j += dy;
        }
        return sum;
    }

    const hangNgang = dem(board , i, j, value, 0, -1) + dem(board, i, j, value, 0, 1) - 1;
    const hangDoc = dem(board , i, j, value, -1, 0) + dem(board, i, j, value, 1, 0) - 1;
    const hangCheoChinh = dem(board , i, j, value, -1, -1) + dem(board, i, j, value, 1, 1) - 1;
    const hangCheoPhu = dem(board , i, j, value, -1, 1) + dem(board, i, j, value, 1, -1) - 1;

    //console.log("Đếm:", hangNgang, hangDoc, hangCheoChinh, hangCheoPhu);

    return (
        hangNgang >= condition ||
        hangDoc >= condition ||
        hangCheoChinh >= condition ||
        hangCheoPhu >= condition
    );
}

export default CheckWin