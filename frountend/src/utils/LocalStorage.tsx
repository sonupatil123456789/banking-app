// Function to set data to local storage
 async function setDataToLocalStorage(key, data) {
    await localStorage.setItem(key, JSON.stringify(data));
  }
  
  // Function to get data from local storage
  async function getDataFromLocalStorage(key) {
    const data = await localStorage.getItem(key);
    return data ? JSON.parse(data) : null;
  }
  
  // Function to check if data is present in local storage
   async function isDataPresentInLocalStorage(key) {
    const data = await getDataFromLocalStorage(key);
    return data == null ? false : true ;
  }


  export {setDataToLocalStorage ,getDataFromLocalStorage ,isDataPresentInLocalStorage }
