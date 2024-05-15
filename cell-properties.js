//storage
let sheetDB=[];
for(let i=0;i<rows;i++){
    let sheetRow=[];
    for(let j=0;j<col;j++){
        let cellProp={
            bold:false,
            italic:false,
            underline:false,
            alignment:"left",
            fontFamily:"monospace",
            fontSize:"14",
            fontColor:"#000000",
            BGcolor:"#000000",
            value:" ",
            fromula:" ",
            children:[]
        }
        sheetRow.push(cellProp);
    }
    sheetDB.push(sheetRow);
}
let bold=document.querySelector(".bold");
let italic=document.querySelector(".italic");
let underline=document.querySelector(".underline");
let fontSize=document.querySelector(".font-size-prop");
let fontFamily=document.querySelector(".font-family-prop");
let fontColor=document.querySelector(".font-color-prop");
let BGcolor =document.querySelector(".BGcolor-prop");
let alignment=document.querySelectorAll(".alignment");
let leftAlign=alignment[0];
let centerAlign=alignment[1];
let rightAlign=alignment[2];
let activeColorProp="#d1d8e0";
let inactiveColorProp="#ecf0f1";



//appply two-way-binding-->it means we change the data as well as change  UI also.

bold.addEventListener("click",(e)=>{
 let address=addressBar.value;
 let [cell,cellProp]=getCellAndCellProp(address);
 cellProp.bold=!cellProp.bold;
 cell.style.fontWeight=cellProp.bold ? "bold":"normal";
 bold.style.backgroundColor=cellProp.bold?activeColorProp:inactiveColorProp;

})

italic.addEventListener("click",(e)=>{
    let address=addressBar.value;
    let [cell,cellProp]=getCellAndCellProp(address);
    cellProp.italic=!cellProp.italic;
    cell.style.fontStyle=cellProp.italic ? "italic":"normal";
    
    italic.style.backgroundColor=cellProp.italic?activeColorProp:inactiveColorProp;
   
   })
   underline.addEventListener("click",(e)=>{
    let address=addressBar.value;
    let [cell,cellProp]=getCellAndCellProp(address);
    cellProp.underline=!cellProp.underline;
    cell.style.textDecoration=cellProp.underline ? "underline":"none";
    underline.style.backgroundColor=cellProp.underline?activeColorProp:inactiveColorProp;
   
   })
   fontSize.addEventListener("change",(e)=>{
    let address=addressBar.value;
    let [cell,cellProp]=getCellAndCellProp(address);
    cellProp.fontSize=fontSize.value;//data change
    cell.style.fontSize=cellProp.fontSize+"px";//cell ui change
    fontSize.value=cellProp.fontSize;//ui change
    

   })
   fontFamily.addEventListener("change",(e)=>{
    let address=addressBar.value;
    let [cell,cellProp]=getCellAndCellProp(address);
    cellProp.fontFamily=fontFamily.value;//data change
    cell.style.fontFamily=cellProp.fontFamily;//cell ui change
    fontFamily.value=cellProp.fontFamily;//ui change

   })
   fontColor.addEventListener("change",(e)=>{
    let address=addressBar.value;
    let [cell,cellProp]=getCellAndCellProp(address);
    cellProp.fontColor=fontColor.value;//data change
    cell.style.color=cellProp.fontColor;//cell ui change
    fontColor.value=cellProp.fontColor;//ui change


   })
   BGcolor.addEventListener("change",(e)=>{
    let address=addressBar.value;
    let [cell,cellProp]=getCellAndCellProp(address);
    cellProp.BGcolor=BGcolor.value;//data change
    cell.style.backgroundColor=cellProp.BGcolor;//cell ui change
    BGcolor.value=cellProp.BGcolor;//ui change


   })
   alignment.forEach(function(align){
align.addEventListener("click",(e)=>{
    let address=addressBar.value;
    let [cell,cellProp]=getCellAndCellProp(address);
   let alignValue= e.target.classList[0];
   cellProp.alignment=alignValue;//data change
   cell.style.textAlign=cellProp.alignment;
   switch(alignValue){
case "left":
    leftAlign.style.backgroundColor=activeColorProp;
    rightAlign.style.backgroundColor=inactiveColorProp;
    centerAlign.style.backgroundColor=inactiveColorProp;
break;
case "right":
leftAlign.style.backgroundColor=inactiveColorProp;
rightAlign.style.backgroundColor=activeColorProp;
centerAlign.style.backgroundColor=inactiveColorProp;
break;
case "center":
    leftAlign.style.backgroundColor=inactiveColorProp;
    centerAlign.style.backgroundColor=activeColorProp;
    rightAlign.style.backgroundColor=inactiveColorProp;

break;
   }
})
   })
let allcell=document.querySelectorAll(".gcell");
for(let i=0;i<allcell.length;i++){
    cellproperties(allcell[i]);
}
function cellproperties(cell){
    cell.addEventListener("click",(e)=>{
        let address=addressBar.value;
        let [rid,cid]=decodeRidCid(address);
        let cellProp=sheetDB[rid][cid];

   
        //apply cell property
        cell.style.fontWeight=cellProp.bold ? "bold":"normal";
        cell.style.fontStyle=cellProp.italic ? "italic":"normal";
        cell.style.fontSize=cellProp.fontSize+"px";
        cell.style.fontFamily=cellProp.fontFamily;
        cell.style.color=cellProp.fontColor;
        cell.style.backgroundColor=cellProp.BGcolor==="#000000"?"transparent":cellProp.BGcolor;
        cell.style.textAlign=cellProp.alignment;

        bold.style.backgroundColor=cellProp.bold?activeColorProp:inactiveColorProp;
        italic.style.backgroundColor=cellProp.italic?activeColorProp:inactiveColorProp;
        underline.style.backgroundColor=cellProp.underline?activeColorProp:inactiveColorProp;
        fontColor.value=cellProp.fontColor;//ui change
        fontSize.value=cellProp.fontSize;//ui change
    fontFamily.value=cellProp.fontFamily;
        BGcolor.value=cellProp.BGcolor;
        switch(cellProp.alignment){
            case "left":
                leftAlign.style.backgroundColor=activeColorProp;
                rightAlign.style.backgroundColor=inactiveColorProp;
                centerAlign.style.backgroundColor=inactiveColorProp;
            break;
            case "right":
            leftAlign.style.backgroundColor=inactiveColorProp;
            rightAlign.style.backgroundColor=activeColorProp;
            centerAlign.style.backgroundColor=inactiveColorProp;
            break;
            case "center":
                leftAlign.style.backgroundColor=inactiveColorProp;
                centerAlign.style.backgroundColor=activeColorProp;
                rightAlign.style.backgroundColor=inactiveColorProp;
            break;
               }
               let formulaBar = document.querySelector(".formula-bar");
               formulaBar.value = cellProp.formula;
               cell.innerText = cellProp.value;

    })
}
function getCellAndCellProp(address){
    let [rid,cid]=decodeRidCid(address);
    let cell=document.querySelector(`.gcell[rid="${rid}"][cid="${cid}"]`);
    let cellProp=sheetDB[rid][cid];
    return [cell,cellProp];

}

function decodeRidCid(address){
    let rid=Number(address.slice(1)-1);
    let cid=Number(address.charCodeAt(0)-65);
    return [rid,cid];
}