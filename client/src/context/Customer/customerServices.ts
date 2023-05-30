import temp_data from "../../temp_data"

export const customerServices = {
  async getCustomers() {
    return temp_data.customers;
  }
}
