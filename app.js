if (document.getElementById("map")) {
  let map = new google.maps.Map(document.getElementById("map"), {
    zoom: 4,
    center: { lat: -14.235, lng: -51.9253 }
  });
}

function adicionarGasto() {
  let desc = document.getElementById("desc").value;
  let valor = parseFloat(document.getElementById("valor").value);
  let lista = document.getElementById("lista-gastos");
  
  if (desc && valor) {
    let li = document.createElement("li");
    li.textContent = `${desc} - R$ ${valor.toFixed(2)}`;
    lista.appendChild(li);
    salvarLocal("gastos", lista.innerHTML);
    document.getElementById("desc").value = "";
    document.getElementById("valor").value = "";
  }
}

function salvarLocal(chave, valor) {
  localStorage.setItem(chave, valor);
}

function carregarLocal(chave, destino) {
  let dados = localStorage.getItem(chave);
  if (dados) document.getElementById(destino).innerHTML = dados;
}

if (document.getElementById("lista-gastos")) {
  carregarLocal("gastos", "lista-gastos");
}

if (document.getElementById("camera")) {
  navigator.mediaDevices.getUserMedia({ video: true })
    .then(stream => {
      document.getElementById("camera").srcObject = stream;
    });
}

function tirarFoto() {
  let video = document.getElementById("camera");
  let canvas = document.getElementById("foto");
  let ctx = canvas.getContext("2d");
  canvas.width = video.videoWidth;
  canvas.height = video.videoHeight;
  ctx.drawImage(video, 0, 0);
}

function aplicarFiltro() {
  let canvas = document.getElementById("foto");
  let ctx = canvas.getContext("2d");
  ctx.globalCompositeOperation = "multiply";
  ctx.fillStyle = "rgba(255, 200, 200, 0.2)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
}
