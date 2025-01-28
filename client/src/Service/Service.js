import Cookies from "universal-cookie";

const cookies = new Cookies();

export class Service {
  static baseurl = "http://localhost:3001/";

  static getHeaders() {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    // Add authorization header if needed
    const keyValue = null;
    if (keyValue !== null) {
      const encoded = btoa(unescape(encodeURIComponent(keyValue)));
      myHeaders.append("Authorization", "Basic " + encoded);
    }

    return myHeaders;
  }

  static getRequestOptions(method, body = null) {
    const requestOptions = {
      method,
      headers: this.getHeaders(),
      redirect: "follow",
    };

    if (body) {
      requestOptions.body = body;
    }

    return requestOptions;
  }

  static async fetchData(url, method, data = null) {
    try {
      const apiurl = this.baseurl + url + (data ? "?" + data : "");
      const response = await fetch(
        apiurl,
        this.getRequestOptions(method, data)
      );
      return response.json();
    } catch (error) {
      throw error;
    }
  }

  static async GetData(url, data) {
    return this.fetchData(url, "GET", data);
  }

  static async PostData(url, data) {
    return this.fetchData(url, "POST", data);
  }

  static async PostContentData(url, data) {
    return this.fetchData(url, "POST", data);
  }

  static async PostFormData(url, data) {
    return this.fetchData(url, "POST", data);
  }

  static async PostImageData(url, data) {
    return this.fetchData(url, "POST", data);
  }
}
