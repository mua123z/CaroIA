
function CheckHoa(board){
    for(let i=0; i<board.length; i++){
        for(let j=0; j<board[i].length; j++){
            // kiểm tra xem nếu còn ô throongs chưa đi thì tra về false
            if(board[i][j]===""){
                return false;
            }
        }
    }
    //cuối cùng trả về true nếu tất cả các ô đã đi hết
    return true;
}

export default CheckHoa