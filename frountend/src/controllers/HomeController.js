import axios from "axios";
import { getDataFromLocalStorage } from "../utils/LocalStorage";

class HomeController {
HomeController() {}

  static async getTransactionListController(url) {
    const token = await getDataFromLocalStorage("token")
    const  data  = await axios.get(url, {
      headers: {
        "Content-Type": "application/json",
        "auth-token": token
      },
    });
    // console.log(data);
    return data
  }



  static async amountController(url, postData ) {
    const token = await getDataFromLocalStorage("token")
    const  data  = await axios.post(url,postData, {
      headers: {
        "Content-Type": "application/json",
        "auth-token": token
      },
    });
    // console.log(data);
    return data
  }

 
}

export {HomeController } 
