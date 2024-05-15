let rows=100;
let col=26;
let addressColCont=document.querySelector(".address-col-cont");
let addressBar=document.querySelector(".address-bar");
for(let i=0;i<rows;i++){
    let addressCol=document.createElement("div");
    addressCol.setAttribute("class","addressCol");
    addressCol.innerText=i+1;
    addressColCont.appendChild(addressCol);
}
let addressRowCont=document.querySelector(".address-row-cont");
for(let i=0;i<col;i++){
    let addressRow=document.createElement("div");
    addressRow.setAttribute("class","addressRow");
         addressRow.innerText=String.fromCharCode(65+i);
         addressRowCont.appendChild(addressRow);
    }
let gridCell=document.querySelector(".grid-cell");
for(let i=0;i<rows;i++){
    let rowCont=document.createElement("div");
    rowCont.setAttribute("class","row-cont");
    for(let j=0;j<col;j++){
        let cell=document.createElement("div");
        cell.setAttribute("class","gcell");
        cell.setAttribute("contenteditable",true);
        cell.setAttribute("spellcheck","false");
        cell.setAttribute("rid",i);
        cell.setAttribute("cid",j);
        rowCont.appendChild(cell);
        addressBarDisplay(cell,i,j);

    }
    gridCell.appendChild(rowCont);

}
function addressBarDisplay(cell,i,j){
    cell.addEventListener("click",(e)=>{
        let rowid=i+1;
        let colid=String.fromCharCode(65+j);
        addressBar.value = `${colid}${rowid}`;


    })
}
//by default click on first cell
let firstCell=document.querySelector(".gcell");//select only first cell
firstCell.click();//apply that already clicked









