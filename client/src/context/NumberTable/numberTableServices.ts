export const numberTableServices = {
  async getNumberTable() {
    const raw = localStorage.getItem("number-table");
    if (!raw) throw new Error("data should not be null");
    const data = JSON.parse(raw);
    return data;
  },
}
