

function checkConnection() {
  i = navigator.onLine;
  postMessage(i);
  setTimeout("checkConnection()",5000); 
}

checkConnection();