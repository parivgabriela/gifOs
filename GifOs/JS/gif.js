//apikey requisito para utilizar giphy
const apiKey = "UaPEyOCLPi5D9NNOmpbXO6eire6x6XcA";
const urlTrending = "https://api.giphy.com/v1/gifs/trending?q=&api_key=";
const urlSearch = "https://api.giphy.com/v1/gifs/search?q=";
const urlUploadGif = "https://upload.giphy.com/v1/gifs?q=&api_key=";
const extensionApiKey = "?q=&api_key=";
const urlGetGif = "https://api.giphy.com/v1/gifs/";
const usergiphy = "parivgabriela";
const urlGifLoading =
  "https://media.giphy.com/media/3oriOiizS4Pmofj46A/giphy.gif";
const urlGifRandom=  "https://api.giphy.com/v1/gifs/random";
const arrSug = [ "cats", "dogs", "cute", "simpsons", "summer", "spring", "school", "paz", "awesome", "funny", "coraje", "famous", "monday", "friday", "weekend","disney"];
//const arrSugTitle = ["#cats",  "#dogs",  "#cute",  "#simpsons",  "#summer","#spring",  "#hot",  "#lovely",  "#awesome",  "#fun","#coraje","#famous"];
//variable global para definir los titulos de sugerencias
var arrSugTitle = [];

async function getSearchResults(search, limite) {
  //armar url
  const URL = urlSearch + search + "&api_key=" + apiKey + "&limit=" + limite;
  const data = await fetch(URL);
  const dataGif = await data.json();

  var arrUrl = [];
  //agrego elementos al array.
  for (let index = 0; index < limite; index++) {
    arrUrl.push(dataGif.data[index].images.original.url);
  }
  return arrUrl;
}

function changeIMG(arrUrl, nombreClase) {
  var claseIMG,
    cont = 0;
  for (let index = 1; index <= arrUrl.length; index++) {
    var nombreDeElemento = nombreClase + index;
    claseIMG = document.querySelector("." + nombreDeElemento);
    claseIMG.src = arrUrl[cont];
    cont++;
  }
}

async function searchElement() {
  const valor = document.getElementById("numb").value;
  //limte =10 cant de elemetos que van a aparecer
  let arrSearch = await getSearchResults(valor, 12);
  changeIMG(arrSearch, "fotoTrend");
  mostrarNBotones("containerSugerencias","elementNone");
  mostrarNBotones("contenedorBotonesPostBusqueda","rows espaciado-top-12");
  changeTextFromDiv("titloTendencias","Ejemplo de búsqueda (resultados)");
}
async function getTrending() {
  const URL = urlTrending + apiKey + "&limit=12";
  const data = await fetch(URL);
  const dataGif = await data.json();
  var arrUrl = [];
  for (let index = 0; index < 12; index++) {
    arrUrl.push(dataGif.data[index].images.original.url);
  }
  changeIMG(arrUrl, "fotoTrend");
  return arrUrl;
}

function swapStyleSheet(sheet) {
  document.getElementById("pagestyle").setAttribute("href", sheet);
}

function setDay() {
  var style = document.getElementById("stylesheet2");
  console.log("Modo Dia");
  style.onclick = swapStyleSheet("./styles/styles.css");
  document.getElementById("logoPagina").src="./assets/gifOF_logo.png";
}
function setNight() {
  var style = document.getElementById("stylesheet1");
  console.log("Modo Nocturno");
  document.getElementById("logoPagina").src="./assets/gifOF_logo_dark.png";
  style.onclick = swapStyleSheet("./styles/styles2.css");
}

async function putSuggest() {
  let newArrSugg = await gifSugerencias();
  changeIMG(newArrSugg, "fotoSugerencias");
}
//status ok
async function gifSugerencias() {
  let newArrSugg = [];
  let newElementArr;
  for (let index = 0; index < 4; index++) {
    newElementArr = await mostrarSugerencias();
    newArrSugg.push(newElementArr);
  }
  return newArrSugg;
}
async function mostrarSugerencias(){
  const URL = urlGifRandom  + extensionApiKey + apiKey;
  const data = await fetch(URL);
  const dataGif = await data.json();
  return dataGif.data.images.original.url;
}

function onChange() {
  document.getElementById("numb").onkeyup=function(){
    let unElemento= mostrarNBotones("sugereciasXBusqueda", "sugerenciasDeBusqueda borderLight");
    unElemento.onmouseover=function(){ 
      mostrarNBotones("sugereciasXBusqueda", "sugerenciasDeBusqueda borderLight");
    };
    unElemento.onmouseout=function(){
      mostrarNBotones("sugereciasXBusqueda","elementNone");
    }
  } 
}
function onLoadIndex(){
  botonDropdown();
}
//uploadVideoGif.html

///prueba camara
///variables globales
var recorder;
var video, imagen;
var blob;
var dataGifCreados = [];
var urlDataGifCreados = [];
var arrGifCreadosLocal=[];

function modeCamera() {
  mostrarNBotones("containerDivCrearGif", "elementNone");
  mostrarNBotones("cerrarGrabadorGif","elementoCerrar");
  video = document.getElementById("mostrarGif");
  video.className = "playGif";
  mostrarNBotones("mostrarGif","playGif borderVideoGif espaciado-top-12")
  mostrarNBotones("botonesComenzaryCancelar", "elementNone");
  mostrarNBotones("botonesCapturarCamara", "containerBotonCapturar");
  addQuitClass("containerCrearGif","dimensionesSegundoGeneradorVideo","dimensionPrimerGeneradorVideo");
  changeTextFromDiv("tituloHeadContainer","Un Chequeo Antes de Empezar");
  getStreamAndRecord();
  mouseClickFunction("botonCapturarGif",comenzarGrabarConBoton) ;
}

function getStreamAndRecord() {
  navigator.mediaDevices
    .getUserMedia({
      audio: false,
      video: {
        height: {
          max: 480
        }
      }
    })
    .then(function(stream) {
      video.srcObject = stream;
      console.log("el stream es " + stream);
      recorder = RecordRTC(stream, {
        type: "gif",
        frameRate: 1,
        quality: 10,
        width: 832,
        hidden: 434,
        onGifRecordingStared: function() {
          console.log("started");
        }
      });
      video.play();
    });
}
function comenzarGrabarConBoton() {
  recorder.startRecording();
  mostrarNBotones("botonesDetener", "containerBotonCapturar espaciado-bottom");
  mostrarNBotones("botonesCapturarCamara", "elementNone");
  mostrarNBotones("containerContador", "rows borderRectangle posicionContador");
  changeTextFromDiv("tituloHeadContainer","Capturando Tu Guifo");
  stopWatchVideo();
  mouseClickFunction("stopVideoButton",stopVideo);
}

function stopVideo() {
  recorder.stopRecording(function() {
    blob = recorder.getBlob();
    video.style.display = "none";
    imagen = document.getElementById("imgMostrarGif");
    video.className = "playGifSmall";
    imagen.className = "playGif";
    imagen.src = URL.createObjectURL(blob);
    recorder.destroy();
    //console.log(imagen.src);
  });
  showStopWatchVideo();
  mostrarNBotones("botonesDetener", "elementNone");
  mostrarNBotones("botonesSubiryCancelar", "containerBotones");
  changeTextFromDiv("tituloHeadContainer","Vista Previa");
  mouseClickFunction("repetirCapturaGif", refreshPage);
}

function setUploadGif() {
  uploadVideo(); //esta funcion sube el video a giphy
  addQuitClass("containerCrearGif","dimensionesTercerGeneradorVideo","dimensionesSegundoGeneradorVideo");
  changeTextFromDiv("tituloHeadContainer","Subiendo Guifo");
  mostrarNBotones("botonesSubiryCancelar", "elementNone");
  mostrarNBotones("containerContador", "elementNone");
  mostrarNBotones("imgMostrarGif", "elementNone");
  starProgressBar() ;
  setTimeout(() => {
  addQuitClass("containerCrearGif","dimensionesUltimoGeneradorVideo","dimensionesTercerGeneradorVideo");
    mostrarNBotones("containerProcessGif", "elementNone");
    mostrarNBotones("cancelarUploadgif","elementNone");
    changeTextFromDiv("tituloHeadContainer","Guifo Subido Con Éxito");
    mostrarNBotones("mostrarMasGif", "containerMostrarGifCreado rows");
    mostrarNBotones("cancelarUploadgif","botonBarra botonCapturar botonBarra botonAbsolute botonListo");
    changeTextFromDiv("cancelarUploadgif","Listo");

    document.getElementById("imagenGifCreado").src=imagen.src;
  }, 6000);
  agregarElementoImg("contenedorGifsCreados",imagen.src);
 mouseClickFunction("cancelarUploadgif",repetirCaptura);
 //revisar porque esa funcion elimina todo
 //que todo lo del set timeout este en una funcion
 //que el espacio que hay entre la img del progress haya un margen
 
}
function cerrarVentana(){
  mostrarNBotones("containerCrearGif","elementNone");
}
function uploadVideo() {
  let formData = new FormData();
  formData.append("file", blob, "myGif.gif");
  console.log(formData.get("file"));
  const response = fetch(urlUploadGif + apiKey, {
    method: "POST",
    body: formData
  })
    .then(response => response.json())
    .then(result => {
      console.log("Success:", result);
      dataGifCreados.push(result.data.id);
      saveLocalStorage(result.data.id)  ;
    })
    .catch(error => {
      console.error("Error:", error);
    });

}
async function obtenerUrlGifCreado(idGif){
  var dataDemo,dataGifDemo;
  const urlDemo=urlGetGif+idGif+extensionApiKey+apiKey;
  dataDemo= await fetch(urlDemo)  ;
  dataGifDemo = await dataDemo.json();
  return dataGifDemo.data.images.downsized_medium.url;
  }
async function mostrarGifsCreados() {
  if (arrGifCreadosLocal.length > 0) {
    mostrarNBotones("contenedorGifsCreados", "displayGifCreados");
    let flag = 1;
    let claseImgAcrear = "contenedorGifCreado";
    for (let index = 0; index < arrGifCreadosLocal.length; index++) {
      let nombreClase = "fotoCard" + flag;
      let urlGifCreado=await obtenerUrlGifCreado(arrGifCreadosLocal[index]);
      let nombredeclases = claseImgAcrear+" "+nombreClase;
      if(flag%4!==0){
        nombredeclases = claseImgAcrear+" "+nombreClase+ " botonBarraEspaciado";
      }
      agregarElementoImg("contenedorGifsCreados",urlGifCreado,nombredeclases,nombreClase)
      flag++;
      
    }
  }
}
function agregarElementoImg(unId,sourceUrl,className,nombreDeClase)
{
  const unContenedor=document.getElementById(unId);
  let nuevoElemento=document.createElement("img");
  nuevoElemento.src=sourceUrl;
  nuevoElemento.classList=className;
  unContenedor.appendChild(nuevoElemento);
  setAttributeWidthHeight("."+nombreDeClase,"288px","298px");
}

function repetirCaptura() {
refreshPage();
}
async function getGif(response) {
  const URL = urlGetGif + response + extensionApiKey + apiKey
  const urlGifEncontrado = await fetch(URL);
  return urlGifEncontrado.json();
}

function mostrarNBotones(idContenedor, claseBoton) {
  const botonCamara = document.getElementById(idContenedor);
  botonCamara.className = claseBoton;
  return botonCamara;
}
function addQuitClass(idElement, addClass, quitClass){
  document.getElementById(idElement).classList.remove(quitClass);
  document.getElementById(idElement).classList.add(addClass);
}
function changeTextFromDiv(idElement,newText){
  document.getElementById(idElement).innerHTML=newText;
}
function saveLocalStorage(element) {
  arrGifCreadosLocal = JSON.parse(localStorage.getItem("gifCreados"));
  if (arrGifCreadosLocal.length >= 0) {
    arrGifCreadosLocal.unshift(element);
    localStorage.setItem("gifCreados", JSON.stringify(arrGifCreadosLocal));
  } else {
    arrGifCreadosLocal = [];
    arrGifCreadosLocal.push(element);
    localStorage.setItem("gifCreados", JSON.stringify(arrGifCreadosLocal));
  }
}
function getLocalStorage() {
 arrGifCreadosLocal = JSON.parse(localStorage.getItem("gifCreados"));
 if (arrGifCreadosLocal ===null) {
  arrGifCreadosLocal = [];
  localStorage.setItem("gifCreados", JSON.stringify(arrGifCreadosLocal));
} 
  return arrGifCreadosLocal.length>=1?1:0;
}
function initUploadGif(){
  if(getLocalStorage())
  {
    mostrarGifsCreados();
  }  
}


var contador;
var count = 0,
  min = 0,
  mili = 0,
  reset_s,
  reset_m;
function startCounter() {
  document.getElementById("div_1").innerHTML = " :0" + count;
  document.getElementById("div_3").innerHTML = "0" + min;
  document.getElementById("div_2").innerHTML = " :0" + mili;
}

function seconds() {
  if (count < 59) {
    count++;
    //console.log(count);
  } else {
    count = 0;
    min++;
  }

  reset_s = setTimeout(function() {
    seconds();
  }, 1000);

  addTime(count, "div_1", ":");
  addTime(min, "div_3", "");
}

function counterMiliseconds() {
  if (mili < 99) {
    mili++;
  } else {
    mili = 0;
  }

  reset_m = setTimeout(function() {
    counterMiliseconds();
  }, 10);

  addTime(mili, "div_2", ":");
}
function addTime(time, idDiv, prefijo) {
  let unElemento;
  if (time < 10) {
    unElemento = document.getElementById(idDiv).innerHTML =
      prefijo + "0" + time;
  } else {
    unElemento = document.getElementById(idDiv).innerHTML = prefijo + time;
  }
  return unElemento;
}
function stopWatchVideo() {
  seconds();
  counterMiliseconds();
}
function showStopWatchVideo() {
  let minutos, segundos, milisegundos;
  minutos = addTime(min, "div_3", "");
  segundos = addTime(count, "div_1", ":");
  milisegundos = addTime(mili, "div_2", ":");
  mostrarNBotones("contador", "marginContador");
  document.getElementById("contador").innerHTML =
    minutos + segundos + milisegundos;
  mostrarNBotones("div_3", "elementNone");
  mostrarNBotones("div_1", "elementNone");
  mostrarNBotones("div_2", "elementNone");
  mostrarNBotones("div_4", "elementNone");
  final_count();
}
function final_count() {
  clearTimeout(reset_s);
  clearTimeout(reset_m);
  count = 0;
  min = 0;
  mili = 0;
}

function resetArr(element) {
  element = [];
}
var index1 = 1;
function initProgressBar() {
  //quitar clase fondoBarraEnCurso
  let idElemento = "progressBar";
  if (index1 <= 23) {
    idElemento = "progressBar" + index1;
    document.getElementById(idElemento).classList.remove("fondoBarraEnCurso");
    document
      .getElementById(idElemento)
      .classList.add("backgroundProgressBarDay");

    index1++;
  } else {
    clearInterval(nInterval);
  }
}
var nInterval;
function starProgressBar() {
 // addQuitClass("containerCrearGif","dimensionesUltimoGeneradorVideo","dimensionesSegundoGeneradorVideo");
  mostrarNBotones("containerProcessGif", "dimensionesProcessGif");
  mostrarNBotones("cancelarUploadgif","botonBarra botonCapturar botonCancelar botonAbsolute margenBotonCancelar");
  nInterval = setInterval(initProgressBar, 400);
}
function changeClassAndWidth(id,nameClass,groupClass,size_width,size_height){
 mostrarNBotones(id,groupClass) ;
 setAttributeWidthHeight(nameClass,size_width,size_height);
}
//"."+nombreClase,"288px","298px"
function setAttributeWidthHeight(nameClass,size_width,size_height){
  const unTag = document.querySelector(nameClass);
  unTag.style.width =  size_width;
  unTag.style.height =  size_height;
}
function mouseClickElemento(idcontenedor,idElemento,unaclase){
  document.getElementById(idcontenedor).addEventListener("click",function(){
 let unElemento= mostrarNBotones(idElemento,unaclase);
 unElemento.onmouseover=function(){
  mostrarNBotones(idElemento,unaclase);
 }
 unElemento.onmouseout =function(){
  mostrarNBotones(idElemento,"elementNone");
  }});
  
}
function mouseClickFunction(idElemento,unaFuncion)
{
document.getElementById(idElemento).addEventListener("click",function()
{
  unaFuncion();
})
}
function resetCargarGif(){
  //eliminar lo que hay antes
  changeTextFromDiv("tituloHeadContainer","Crear Gif");
  mostrarNBotones("containerDivCrearGif", "containerCrearGifPrimer");
  mostrarNBotones("botonesComenzaryCancelar","containerBotones");
}
function cancelarFuncionBoton(){
  document.getElementById("botonFuncionCancelar").addEventListener("click",function(){
    if(getLocalStorage())
    {
        mostrarNBotones("containerCrearGif","elementNone");
    }
    else{
      refreshPage();
    }
  });
}
function refreshPage()
{
  console.log("se refresca");
  window.location.reload();
}
function  mostrarMisGuifOs(){
  mostrarNBotones("containerCrearGif","elementNone");
}

function onLoadOver(){
  getLocalStorage();
  initUploadGif();
  cancelarFuncionBoton();
}
function botonDropdown ()
{
  mouseClickElemento("idBotonAExpandir","elementoContainerDropdown","dropdown-content elementoDropDownWidth");
 }
function OcultarYmostrar(){
  let groupClassMostrar="containerCard cardEspaciadoTendencia cardFotoDimension espaciadoRenglon";
  let groupClassOcultar="cardEspaciadoTendencia cardFotoTrendNormal espaciadoRenglon";
  let groupClassUltimo="cardFotoTrendNormal";
  let groupClassUltimoocultar="containerCard cardFotoTrendNormal cardFotoDimension";
let arrCabezal=[".","tituloCabezal1","tituloCabezal2","tituloCabezal3","tituloCabezal4","tituloCabezal5","tituloCabezal6","tituloCabezal7","tituloCabezal8","tituloCabezal9","tituloCabezal10","tituloCabezal11","tituloCabezal12"]
  let arrIDs=["0","card1","card2","card3","card4","card5","card6","card7","card8","card9","card10","card11","card12","card12","card13","card14"];
  let arrNameClass=["0",".fotoTrend1",".fotoTrend2",".fotoTrend3",".fotoTrend4",".fotoTrend5",".fotoTrend6",".fotoTrend7",".fotoTrend8",".fotoTrend9",".fotoTrend10",".fotoTrend11",".fotoTrend12",".fotoTrend13",".fotoTrend14"];
  for (let index = 2; index <=12; index++) {
    
  if(index===4 || index===8 || index===12)
  {
   document.getElementById(arrIDs[index]).addEventListener("mouseover", function(){changeClassAndWidth(arrIDs[index],arrNameClass[index],groupClassUltimoocultar,"286px","296px"); mostrarNBotones(arrCabezal[index],"cabezal degrade positionAbsolut");} );
   document.getElementById(arrIDs[index]).addEventListener("mouseout", function(){ changeClassAndWidth(arrIDs[index],arrNameClass[index],groupClassUltimo,"288px","298px"); mostrarNBotones(arrCabezal[index],"elementNone");});
  }
  else{
    document.getElementById(arrIDs[index]).addEventListener("mouseover", function(){changeClassAndWidth(arrIDs[index],arrNameClass[index],groupClassMostrar,"286px","296px"); mostrarNBotones(arrCabezal[index],"cabezal degrade positionAbsolut");} );
   document.getElementById(arrIDs[index]).addEventListener("mouseout", function(){ changeClassAndWidth(arrIDs[index],arrNameClass[index],groupClassOcultar,"288px","298px"); mostrarNBotones(arrCabezal[index],"elementNone");});
  }
}
}

