function checkYear() {
	year=document.getElementById("year").value;
	exit="año invalido";
	if(year>=1){
		(year % 400 === 0) ? exit="si es año bisiesto " : (year % 100 === 0) ? exit="no es año bisiesto " : (year % 4 === 0) ?exit="si es año bisiesto ":exit="no es año bisiesto ";;
		$("#year").css("color","black");
		$("#Answer_Pto2_text").css("color","black");
		$("#Answer_Pto2_text").html(exit);
	}else{
		$("#Answer_Pto2_text").css("color","red");
		$("#Answer_Pto2_text").html(exit);
		$("#year").css("color","red");
	};
};
function drawTable(x,y) {
	table="";
	$("#Answer_Pto3_table").html(table);
	tablerow="<table><tr>";
	for (var i =0;i<y;i++){
		tablerow=tablerow+'<td id="partTable">&nbsp;</td>';
	};
	tablerow=tablerow+"<tr>";
	for (var i =0;i<x;i++){
		$("#Answer_Pto3_table").append(tablerow);
	};
	$("#Answer_Pto3_table").append("</table>");
};
function Generator(type,lengthArray,limit) {
	console.log("Generator");
	exit=[];
	dicc=["a","b","c","d","e","f","g","h","i","j","k","l","m","n","ñ","o","p","q","r","s","t","u","w","x","y","z"];
	for (var i = 0; i < lengthArray; i++) {
		step = Math.floor(Math.random() * limit);
		if(type=="number"){
			exit[i]=step;
		}else if(type=="letter"){
			exit[i]=dicc[step]	;
		}else {
			exit="no type";
		};
	};
	return exit;
};
function Interseccion (randomarrayA,randomarrayB) {
	exit=[];
	for(var i=0;i<randomarrayA.length;i++){
		if(randomarrayB.indexOf(randomarrayA[i])>=0){
			exit.push(randomarrayA[i]);
		};
	};
	$("#Answer_Pto5_text_B").html(exit);
};
function diferencia(randomarrayA,randomarrayB) {
	exit=[];
	for(var i=0;i<randomarrayA.length;i++){
		if(randomarrayB.indexOf(randomarrayA[i])==-1){
			exit.push(randomarrayA[i]);
		};
	};
	$("#Answer_Pto5_text_C").html(exit);
};
function simetrica(randomarrayA,randomarrayB) {
	exitA=[];
	for(var i=0;i<randomarrayB.length;i++){
		if(randomarrayA.indexOf(randomarrayB[i])==-1){
			exitA.push(randomarrayB[i]);
		};
	};
	exitB=[];
	for(var i=0;i<randomarrayA.length;i++){
		if(randomarrayB.indexOf(randomarrayA[i])==-1){
			exitB.push(randomarrayA[i]);
		};
	};
	exit=exitA;
	for(var i=0;i<exitB.length;i++){
		if(exit.indexOf(exitB)==-1){
			exit.push(exitB[i]);
		};
	};
	
	$("#Answer_Pto5_text_D").html(exit);
};
function consulta(randomarray) {
	let date = new Date();
	let now=date.toISOString().split('T')[0] ;
	let days = new Date(new Date().getTime()-(5*24*60*60*1000));
	let nowless=days.toISOString().split('T')[0] ;
	$.ajax({
		url : "https://www.banxico.org.mx/SieAPIRest/service/v1/series/SF43718,SF343410,SF43785,SF43717,SF60653,SF63528,SF43787,SF43784,SF43786,SF43788/datos/"+nowless+"/"+now+"?token=de27c167b0e9af92edbbe4592d84e81d484347be01a4e0f38c298c481867ac3a",
		jsonp : "callback",
		dataType : "jsonp",
		success : function(response) { 
			var series=response.bmx.series;
			for (var i in series) {
				  var serie=series[i];
   				  $("#Answer_Pto6_text").append("<table>");
				  if(serie.datos){
					  for (var a=0; a<serie.datos.length;a++){
						var reg='<td id="MXTable">'+serie.titulo+'</td><td id="MXTable">'+serie.datos[a].fecha+'</td><td id="MXTable">'+serie.datos[a].dato+'</td>'
						$("#Answer_Pto6_text").append("<tr>");
						$("#Answer_Pto6_text").append(reg);
						$("#Answer_Pto6_text").append("<tr>");
						}
				  }else{
					  var reg='<td id="MXTable">'+serie.titulo+'</td>'
					  $("#Answer_Pto6_text").append("<tr>");
					  $("#Answer_Pto6_text").append(reg);
					  $("#Answer_Pto6_text").append("<tr>");
				  }
				  
					$("#Answer_Pto6_text").append("</table>");
			}
		}
	});
}
function order(randomarray) {
	newrAndomarray=[];
	step=0;
	position=0;
	while((randomarray.length)>0){
		for (var i = 0; i < randomarray.length; i++) {
			if(i==0){step=0};
			if(randomarray[i]>step){step=randomarray[i];  position=i};
		};
		newrAndomarray.push(randomarray[position]);
		console.log(randomarray.splice(position,1));
	};
	return newrAndomarray	;
};
window.addEventListener("click", function (e) {
	console.log(e);
	arrIdsFunctions=["Pto2_check","Pto3_check","Pto4_check","Pto5_check","Pto6_check"];
	console.log(arrIdsFunctions.indexOf(e.srcElement.id));
	if ( (arrIdsFunctions.indexOf(e.srcElement.id))>=0){
		switch (e.srcElement.id) {
			case"Pto2_check":
				checkYear();
				break;
			case"Pto3_check":
				drawTable(document.getElementById("axis_x").value,document.getElementById("axis_y").value);
				break;
				
			case"Pto4_check":
				randomarray=Generator("number",20,100);
				$("#Answer_Pto4_textA").html("Sin ordenar");
				$("#Answer_Pto4_textA1").html(randomarray.toString().replaceAll(",","  "));
				randomOrderArray=order(randomarray);
				$("#Answer_Pto4_textB").html("ordenado");
				$("#Answer_Pto4_textB1").html(randomOrderArray.toString().replaceAll(",","  "));
				break;
				
			case"Pto5_check":
				randomarray=Generator("letter",10,25) ;
				randomarray2=Generator("letter",10,25) ;
				
				$("#Answer_Pto5_text1").html("Unión: 𝐴⋃𝐵");
				$("#Answer_Pto5_text2").html("Intersección 𝐴⋂𝐵");
				$("#Answer_Pto5_text3").html("Diferencia: 𝐴∆𝐵");
				$("#Answer_Pto5_text4").html("Diferencia Simétrica: 𝐴 − 𝐵");
				$("#Answer_Pto5_text_A").html(randomarray+","+randomarray2);
				Interseccion(randomarray,randomarray2);
				diferencia(randomarray,randomarray2);
				simetrica(randomarray,randomarray2);
				break;
				
			case"Pto6_check":
				consulta();
				break;
			
		};
	};
	
});