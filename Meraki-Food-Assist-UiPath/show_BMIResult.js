function(e,result){
var para = document.createElement("P");           
para.innerHTML = result;    
document.getElementById("nutritionResultId").appendChild(para);    
return (0);
}