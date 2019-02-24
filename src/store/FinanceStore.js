import { decorate, observable } from "mobx";
import objectHash from "object-hash";

class FinanceStore {
  income = [];
  expenses = [];
  categories = [];
  paymentMethods = [];
  reports = [];

  constructor() {
    if (localStorage.getItem("financesData") !== null) {
      const financesData = JSON.parse(localStorage.getItem("financesData"));
      this.setData(financesData);
    }
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
    return items.filter(item => !ids.includes(item.id));
  };

  getItemsByIds = (items, ids) => {
    if (ids.length > 0) {
      return items.filter(item => ids.includes(item.id));
    } else {
      return [];
    }
  };

  getData = () => {
    return {
      income: this.income,
      expenses: this.expenses,
      reports: this.reports,
      categories: this.categories,
      paymentMethods: this.paymentMethods
    };
  };

  setData = data => {
    this.income = data.income;
    this.expenses = data.expenses;
    this.reports = data.reports;
    this.categories = data.categories;
    this.paymentMethods = data.paymentMethods;
  };

  clearData = () => {
    this.income = [];
    this.expenses = [];
    this.reports = [];
    this.categories = [];
    this.paymentMethods = [];
  };
}

decorate(FinanceStore, {
  income: observable,
  expenses: observable
});

export default new FinanceStore();
