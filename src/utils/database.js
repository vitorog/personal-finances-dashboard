import low from "lowdb";
import LocalStorage from "lowdb/adapters/LocalStorage";

const db = (() => {
  console.log("Initializing db...");
  if (localStorage.getItem("db") !== null) {
    localStorage.removeItem("db");
  }

  const adapter = new LocalStorage("db");
  const db = low(adapter);
  db.defaults({ expenses: [] }).write();

  const expenses = [
    {
      description: "Hotmart Guitar Evoluti",
      value: "5700",
      category: "Subscriptions",
      paymentMethod: "Nubank",
      date: "1 jan 2018",
      id: "5a4a251b-ac2d-4d3a-8a56-ef7b0c84c995"
    },
    {
      description: "Hotmart Guitar Evoluti",
      value: "5700",
      category: "Subscriptions",
      paymentMethod: "Nubank",
      date: "1 jan 2018",
      id: "5a4a251b-ac2d-4d3a-8a56-ef7b0c84c995"
    },
    {
      description: "Hotmart Guitar Evoluti",
      value: "5700",
      category: "Subscriptions",
      paymentMethod: "Nubank",
      date: "1 jan 2018",
      id: "5a4a251b-ac2d-4d3a-8a56-ef7b0c84c995"
    },
    {
      description: "Hotmart Guitar Evoluti",
      value: "5700",
      category: "Subscriptions",
      paymentMethod: "Nubank",
      date: "1 jan 2018",
      id: "5a4a251b-ac2d-4d3a-8a56-ef7b0c84c995"
    },
    {
      description: "Sandwich",
      value: "3600",
      category: "Food",
      paymentMethod: "Nubank",
      date: "1 jan 2018",
      id: "5a4a251b-ac2d-4d3a-8a56-ef7b0c84c995"
    },
    {
      description: "Hotmart Guitar Evoluti",
      value: "5700",
      category: "Subscriptions",
      paymentMethod: "Nubank",
      date: "1 jan 2018",
      id: "5a4a251b-ac2d-4d3a-8a56-ef7b0c84c995"
    }
  ];

  db.set("expenses", expenses).write();

  const categories = ["Fixed", "Subscriptions", "Food", "Transportation"];

  db.set("categories", categories).write();

  const paymentMethods = ["Cash", "Nubank"];

  db.set("paymentMethods", paymentMethods).write();

  return db;
})();

export default db;
