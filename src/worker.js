

export default () => {

        var emailLists = [];
        const optionsListe = {
               'keyPath' : 'pi',
               'index' : [
                 {'name' : 'pi', 'unique' : false},
                 {'name' : 'n', 'unique' : false},
                 {'name' : 're', 'unique' : false}
               ]
             };
        const optionsCart = {
          'keyPath' : 'pi',
          'index' : [
            {'name' : 'pi', 'unique' : false}
          ]
        };
        const optionsQuote = {
          'keyPath' : 'date',
          'index' : [
            {'name' : 'date', 'unique' : false}
          ]
        };
        const domain = 'https://www.bancokeywords.it/listino-email-completo/geo-json';
        var db;
        var DB_NAME = "Bancomail";
        var DB_VERSION = '';
        var request;
        

        async function databaseManager(){

            //connect to server and get last version of database
            if(emailLists.length === 0){
               postMessage('Connecting to server...');
               let getLists = await getDBFromServer(domain);
               if(getLists !== undefined && getLists.serverStatus === 200){
                  postMessage('Data was received');
                   let serverResponse = JSON.parse(getLists.serverResponse);
                   if(serverResponse.status === 'ok'){
                      emailLists = serverResponse.data;
                      DB_VERSION = serverResponse['cur-ver'];
                   }
                   else{
                    postMessage('Server database error');
                    setTimeout(databaseManager,2000); 
                    return;
                   }
               }
               else{
                postMessage('Server connection error '+getLists.serverStatus);
                setTimeout(databaseManager,2000); 
                return;
               }
            }
    
            postMessage('Open indexdDb...'+DB_NAME+', version: '+DB_VERSION);
            
            //Open database
            try{
             request = indexedDB.open(DB_NAME, DB_VERSION);
            }
            catch(err){
              postMessage(err.message);
              deleteDb(DB_NAME);
              return;
            }

            
            request.onerror = function(event) {//on error delete previous database then call self to create a new one
              try{
                  postMessage('Connection error! Try to delte Db...');
                  deleteDb(DB_NAME).then( () => {
                    setTimeout(databaseManager,10); 
                  }).catch( () => setTimeout(databaseManager,10));
                  return;
                }
                catch(error){
                  postMessage(error.message);
                }
                postMessage(request.error);
                setTimeout(databaseManager,10); 
            };

            request.onsuccess = (event) => {//mark as update and close db
              postMessage('Connection success...');
                //db = request.result;
                db = event.target.result;
                let version = db.version;
                db.close();
                if(db.objectStoreNames.length === 0){
                  try{
                    postMessage('Connection success, database empty! Try to delte Db...');
                    deleteDb(DB_NAME).then( () => {
                      setTimeout(databaseManager,2000); 
                    }).catch( () => setTimeout(databaseManager,2000));
                    return;
                  }
                  catch(error){
                    postMessage(error);
                  }
                }
                //mark as update
                postMessage('Database updated '+DB_NAME + ' ' + version);
                createAuxiliarObjects();
            };

            request.onupgradeneeded = (event) => {
              db = event.target.result;
              postMessage('Upgrade event fired! oldVersion: '+ event.oldVersion+'; currentVersion: '+db.version);
             
              if (!db.objectStoreNames.contains('liste')) {
                    createObject(db, "liste", optionsListe, emailLists).then( async(response)=> {
                      postMessage('Database update: liste - Create Auxiliars');
                      createAuxiliarObjects();
                  });
              }
              else{
                //delete old object
                db.deleteObjectStore("liste");
                db.deleteObjectStore("cart");
                db.deleteObjectStore("checkout");
                db.deleteObjectStore("quote");
                db.deleteObjectStore("requestInfo");
                //create new object
                createObject(db, "liste", optionsListe, emailLists).then( async(response)=> {
                  postMessage('Database update: liste - Create Auxiliars');
                  createAuxiliarObjects();
                });
              };
              
            }; 
        }

        function createObject(db, objectName, options, values){
            return new Promise((resolve) => {
                var objectStore = db.createObjectStore(objectName, { keyPath : options.keyPath });
                options.index.forEach( item => {
                  objectStore.createIndex(item.name, item.name, { unique: item.unique });
                });
                // Use transaction oncomplete to make sure the objectStore creation is 
                // finished before adding data into it.
                objectStore.transaction.oncomplete = function(event) {
                  // Store values in the newly created objectStore.
                  var listObjectStore = db.transaction(objectName, "readwrite").objectStore(objectName);
                   values.forEach(function(item) {
                    listObjectStore.add(item);
                  });
                };
                resolve('Object created');
            });
        }
            
        function deleteDb(dbName){
            return new Promise((resolve, reject) => { 

                const DBDeleteRequest = indexedDB.deleteDatabase(dbName);
            
                DBDeleteRequest.onerror = function(event) {
                   postMessage("Error deleting database.");
                   reject("Error deleting database.");
                };
                 
                DBDeleteRequest.onsuccess = function(event) {
                  // should be undefined
                  if(event.result === undefined){
                     postMessage("Database deleted successfully");
                     resolve("Database deleted successfully");
                  }
                  else{
                    reject("Error deleting database.");
                  }
                };
              });
        }


        function createAuxiliarObjects(){
           var request = indexedDB.open("BancomailAuxiliars", 1);
           request.onerror = function(event) {//on error delete previous database then call self to create a new one
            try{
                deleteDb("BancomailAuxiliars").then( () => {
                  postMessage('BancomailAuxiliars was deleted try to recreate');
                  setTimeout(createAuxiliarObjects,2000); 
                }).catch( () => setTimeout(createAuxiliarObjects,2000));
                return;
              }
              catch(error){
                postMessage(error);
              }
              postMessage(request.error);
              setTimeout(createAuxiliarObjects,2000); 
          };

          request.onsuccess = (event) => {//mark as update and close db
              //db = request.result;
              db = event.target.result;
              let version = db.version;
              db.close();
              if(db.objectStoreNames.length === 0){
                try{
                  deleteDb("BancomailAuxiliars").then( () => {
                    setTimeout(createAuxiliarObjects,2000); 
                  }).catch( () => setTimeout(createAuxiliarObjects,2000));
                  return;
                }
                catch(error){
                  postMessage(error);
                }
              }
              postMessage('Close database BancomailAuxiliars' + version);
          };

          request.onupgradeneeded = (event) => {
            db = event.target.result;
            postMessage('Auxiliars upgrade event fired! oldVersion: '+ event.oldVersion+'; currentVersion: '+db.version);
           
            if (!db.objectStoreNames.contains('cart')) {
                createObject(db, "cart", optionsCart, []).then( async()=> {
                      await createObject(db, "quote", optionsQuote, []);
                      await createObject(db, "checkout", optionsQuote, []);
                      await createObject(db, "requestInfo", optionsQuote, []);
                });
                postMessage('Auxiliars Database updated');
            }
          }; 
        }
            
              
        /* function clearData(db, objectName) {
                // open a read/write db transaction, ready for clearing the data
                var transaction = db.transaction([objectName], "readwrite");
              
                // report on the success of the transaction completing, when everything is done
                transaction.oncomplete = function(event) {
                  console.log('Transaction completed.');
                  db.close();
                };
              
                transaction.onerror = function(event) {
                  console.log('Transaction not opened due to error: ' + transaction.error);
                };
              
                // create an object store on the transaction
                var objectStore = transaction.objectStore(objectName);
              
                // Make a request to clear all the data out of the object store
                var objectStoreRequest = objectStore.clear();
              
                objectStoreRequest.onsuccess = function(event) {
                  // report the success of our request
                  console.log(objectName + 'object was successfully deleted!');
                };
              };*/

          function getDBFromServer(path){
            
            return new Promise((resolve) => { 
    
              const xhttp = new XMLHttpRequest();
              xhttp.open("GET", path, true);
              xhttp.send();
              xhttp.onreadystatechange = function(){
                  if(this.readyState === 1){
                    console.log('Server connection not started yet');
                  }
                  else if(this.readyState === 1){
                    console.log('Server connection established');
                  }
                  else if(this.readyState === 2){
                    console.log('Server has received the request');
                  }
                  else if(this.readyState === 3){
                    console.log('Processing request...');
                  }
                  else if(this.readyState === 4 && this.status === 200) {
                     // request finished and response is ready:
                     resolve({'serverStatus' :  this.status, 'serverResponse' : xhttp.responseText});
                  }
                  else if(this.readyState === 4 && this.status !== 200){
                    resolve({'serverStatus' :  this.status, 'serverResponse' : xhttp.responseText});
                  }
                  else{
                    resolve({'serverStatus' :  this.status, 'serverResponse' : xhttp.responseText});
                  }
              };
              xhttp.onerror = function(){
                resolve({'serverStatus' :  500, 'serverResponse' : 'Epic fail'});
              }
            });
          }
     
       if(typeof indexedDB !== 'undefined'){
           databaseManager();
       }
       else{
         postMessage('IndexedDB not supported in this browser!');
       }
}