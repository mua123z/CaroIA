import style from "./sizetable.module.css"
function SizeTable({onSelectSize}){

    return(
        <div className={`${style.all}`}>
            <div className={`${style.chon}`} onClick={()=>{onSelectSize(3)}}>3 x 3</div>
            <div className={`${style.chon}`} onClick={()=>{onSelectSize(11)}}>11 x 11</div>
            <div className={`${style.chon}`} onClick={()=>{onSelectSize(15)}}>15 x 15</div>
        </div>
    )
}

export default SizeTable