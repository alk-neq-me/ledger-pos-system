import temp_data from "../../temp_data"

export const authServices = {
  // async getMe() {
  //   return new Promise((resolve, reject) => {
  //     setTimeout(() => {
  //       if (true) resolve(temp_data.auth);
  //       reject();
  //     }, 1000);
  //   })
  // }

  async getMe() {
    return temp_data.auth;
  }
}
