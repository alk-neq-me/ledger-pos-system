import { Customer } from "./context/Customer/types";
import { User } from "./context/User/types";
import { Permission, Role } from "./utils/permission";


const tempDate = new Date(Date.now() + (1000*60*60));

export default {
  auth: {
    id: crypto.randomUUID(),
    firstName: "bob",
    lastName: "exe",
    email: "bob@exe.com",
    password: "123",
    comfirmPassword: "123",
    role: "admin"
  } as User,

  customers: [
    {
      id: crypto.randomUUID(),
      name: "rose",
      slug: "rose",
      currentBook: undefined,
      books: [
        {
          id: crypto.randomUUID(),
          label: "book1",
          recents: [
            { id: crypto.randomUUID(), number: "01", amount: 1500, createdAt: tempDate, updatedAt: tempDate },
            { id: crypto.randomUUID(), number: "11", amount: 1800, createdAt: tempDate, updatedAt: tempDate },
            { id: crypto.randomUUID(), number: "41", amount: 4500, createdAt: tempDate, updatedAt: tempDate },
          ]
        }
      ]
    }
  ] as Customer[],

  roles: [
    { 
      id: crypto.randomUUID(),
      name: "admin", 
      permissions: [
        new Permission("*", "*")
      ] 
    },

    {
      id: crypto.randomUUID(),
      name: "user",
      permissions: [
        new Permission("!", "!"),
        new Permission("order", "read")
      ] 
    }
  ] as Role[]
}
