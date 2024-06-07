import axios from "axios";

class AuthController {
  AuthController() {}

  static async loginUserController(url, postData) {
    const  data  = await axios.post(url, postData, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    // console.log(data);
    return data
  }
  static async signeupUserController(url, postData) {
    const value = await axios.post(url, postData, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return value
  }
}

export {AuthController} 
