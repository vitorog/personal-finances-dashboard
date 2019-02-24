import { decorate, observable } from "mobx";
import objectHash from "object-hash";

class FinanceStore {
  income = [
    {
      id: "1",
      description: "Salary",
      value: 10000,
      date: "1 jan de 2018"
    },
    {
      id: "2",
      description: "Salary",
      value: 10000,
      date: "1 jan de 2018"
    }
  ];
  expenses = [];
  categories = [];
  paymentMethods = [];
  reports = [];

  constructor() {
    const db = JSON.parse(localStorage.getItem("db"));
    this.income = db["income"];
    this.expenses = db["expenses"];
    this.categories = db["categories"];
    this.paymentMethods = db["paymentMethods"];
    this.reports = [];
  }

  addIncome = income => this.addWithHashId(income, this.income);
  addExpense = expense => this.addWithHashId(expense, this.expenses);
  addPaymentMethod = paymentMethod =>
    this.addWithHashId(paymentMethod, this.paymentMethod);
  addCategory = category => this.addWithHashId(category, this.categories);
  addReport = report => this.addWithHashId(report, this.reports);

  removeIncomeByIds = ids => {
    this.income = this.removeItemsByIds(this.income, ids);
  };

  removeExpensesByIds = ids => {
    this.expenses = this.removeItemsByIds(this.expenses, ids);
  };

  removeCategoriesByIds = ids => {
    this.categories = this.removeItemsByIds(this.categories, ids);
  };

  removePaymentMethodsByIds = ids => {
    this.paymentMethods = this.removeItemsByIds(this.paymentMethods, ids);
  };

  getReportById = id => {
    return this.reports.filter(report => report.id === id)[0];
  };

  getIncomeByIds = ids => this.getItemsByIds(this.income, ids);

  getExpensesByIds = ids => this.getItemsByIds(this.expenses, ids);

  get totalIncome() {
    return this.income.reduce(this.getTotalAccum, 0);
  }

  get totalExpenses() {
    return this.expenses.reduce(this.getTotalAccum, 0);
  }

  getTotalAccum = (accum, p) => accum + Number(p.value);

  addWithHashId = (item, list) => {
    item.id = objectHash(item);
    list.push(item);
  };

  removeItemsByIds = (items, ids) => {
    return items.filter(item => !ids.has(item.id));
  };

  getItemsByIds = (items, ids) => {
    if (ids.size > 0) {
      return items.filter(item => ids.has(item.id));
    } else {
      return [];
    }
  };
}

decorate(FinanceStore, {
  income: observable,
  expenses: observable
});

export default new FinanceStore();
