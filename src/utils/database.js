import low from "lowdb";
import LocalStorage from "lowdb/adapters/LocalStorage";
// import FileSync from "lowdb/adapters/LocalStorage";

const db = (() => {
  console.log("Initializing db...");

  const adapter = new LocalStorage("db");
  const db = low(adapter);
  db.defaults({
    expenses: [],
    income: [],
    categories: [],
    paymentMethods: [],
    reports: []
  }).write();

  // const expenses = [
  //   {
  //     description: "Hotmart Guitar Evoluti",
  //     value: "5700",
  //     category: "Subscriptions",
  //     paymentMethod: "Nubank",
  //     date: "1 jan 2018",
  //     id: "5a4a251b-ac2d-4d3a-8a56-ef7b0c84c995"
  //   },
  //   {
  //     description: "Sandwich",
  //     value: "3600",
  //     category: "Food",
  //     paymentMethod: "Nubank",
  //     date: "1 jan 2018",
  //     id: "5a4a2515"
  //   }
  // ];
  //
  // db.set("expenses", expenses).write();
  //
  // const categories = [
  //   { id: 0, description: "Fixed" },
  //   { id: 1, description: "Subscriptions" },
  //   { id: 2, description: "Food" },
  //   { id: 3, description: "Transportation" }
  // ];
  //
  // db.set("categories", categories).write();
  //
  // const paymentMethods = [
  //   { id: 0, description: "Cash" },
  //   { id: 1, description: "Nubank" }
  // ];
  //
  // db.set("paymentMethods", paymentMethods).write();
  //
  // const income = [
  //   {
  //     id: "1",
  //     description: "Salary",
  //     value: 10000,
  //     date: "1 jan de 2018"
  //   },
  //   {
  //     id: "2",
  //     description: "Salary",
  //     value: 10000,
  //     date: "1 jan de 2018"
  //   }
  // ];
  //
  db.set("reports", [
    { name: "Feb - 2019", goal: 0.25, incomeIds: ['1'], expensesIds: ['5a4a251b-ac2d-4d3a-8a56-ef7b0c84c995'] },
    { name: "Mar - 2019", goal: 0.35, incomeIds: ['2'], expensesIds: ['5a4a2515'] }
    ]).write();

  return db;
})();

export default db;
