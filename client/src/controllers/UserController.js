import { Service } from "../Service/Service";

class Controller {
  constructor(props) {}

  async Register(data) {
    const url = "api/users/signup";
    console.log("data",data);
    return Service.PostData(url, data);
  }

  async Login(data) {
    const url = "api/users/Login";
    console.log("data",data);
    return Service.PostData(url, data);
  }

  async AddExternalLogin(data) {
    const url = "api/Account/AddExternalLogin";
    return Service.PostData(url, data);
  }

  async ChangePassword(data) {
    const url = "api/Account/ChangePassword";
    return Service.PostData(url, data);
  }

  async Logout(provider, emailID) {
    const url = "api/Account/Logout";
    const data = `provider=${provider}&emailID=${emailID}`;
    return Service.GetData(url, data);
  }

  async GetUserInformation(userID) {
    const url = "api/Account/GetUserInformation";
    const data = `userID=${userID}`;
    return Service.GetData(url, data);
  }

  async SetTimer(data) {
    const url = "api/Clock/GetInsertClock";
    const data = `userID=${userID}`;
    return Service.GetData(url, data);
  }
}

export default Controller;
