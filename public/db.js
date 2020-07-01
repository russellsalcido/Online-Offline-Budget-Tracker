let db;
// create a new db request for a "budget" database.

request.onupgradeneeded = function(event) {
  // create object store called "pending" and set autoIncrement to true
  // Grab a reference to the opened database
  let db = e.target.result;

  // Create an objectStore
  // including a auto-incrementing key
  let objectStore = db.createObjectStore('transaction_os', { keyPath: 'id', autoIncrement:true });

  // Define what data items the objectStore will contain
  objectStore.createIndex('transaction', 'transaction', { unique: false });

  console.log('Database setup complete');
};

request.onsuccess = function(event) {
  db = target.result;

  if (navigator.onLine) {
    checkDatabase();
  }
};

request.onerror = function(event) {
  console.log('Database failed to open');
};

function saveRecord(record) {
  // create a transaction on the pending db with readwrite access
  // access your pending object store
  // add record to your store with add method.
}

function checkDatabase() {
  // open a transaction on your pending db
  // access your pending object store
  // get all records from store and set to a variable

  getAll.onsuccess = function() {
    if (getAll.result.length > 0) {
      fetch("/api/transaction/bulk", {
        method: "POST",
        body: JSON.stringify(getAll.result),
        headers: {
          Accept: "application/json, text/plain, */*",
          "Content-Type": "application/json"
        }
      })
      .then(response => response.json())
      .then((data => {
          // if successful, open a transaction on your pending db
        if (data.errors) {
          errorEl.textContent = "Missing Information";
        }
          // clear all items in your store
          else {
            nameEl.value = "";
            amountEl.value = "";
        }
      }))
    };
  };
}

// listen for app coming back online
window.addEventListener("online", checkDatabase);