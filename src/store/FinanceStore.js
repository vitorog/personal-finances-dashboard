import { decorate, observable } from "mobx";
import objectHash from "object-hash";

class FinanceStore {
  data = {
    income: [],
    expenses: [],
    categories: [],
    paymentMethods: [],
    reports: []
  };

  selectedReportId = null;

  get income() {
    return this.data.income;
  }

  set income(value) {
    this.data.income = value;
  }

  get reports() {
    return this.data.reports;
  }

  set reports(value) {
    this.data.reports = value;
  }

  get expenses() {
    return this.data.expenses;
  }

  set expenses(value) {
    this.data.expenses = value;
  }

  get categories() {
    return this.data.categories;
  }

  set categories(value) {
    this.data.categories = value;
  }

  get paymentMethods() {
    return this.data.paymentMethods;
  }

  set paymentMethods(value) {
    this.data.paymentMethods = value;
  }

  addIncome = income => this.addWithHashId(income, this.income);
  addExpense = expense => this.addWithHashId(expense, this.data.expenses);
  addPaymentMethod = paymentMethod =>
    this.addWithHashId(paymentMethod, this.paymentMethod);
  addCategory = category => this.addWithHashId(category, this.data.categories);
  addReport = report => this.addWithHashId(report, this.data.reports);

  addIncomeToReport = (report, incomeIds) => {
    const reportIncomeIds = new Set([...report.incomeIds, ...incomeIds]);
    report.incomeIds = Array.from(reportIncomeIds);
  };

  addExpensesToReport = (report, expensesIds) => {
    report.expensesIds = Array.from(
      new Set([...report.expensesIds, ...expensesIds])
    );
  };

  removeIncomeByIds = ids => {
    this.income = this.removeItemsByIds(this.income, ids);
  };

  removeExpensesByIds = ids => {
    this.data.expenses = this.removeItemsByIds(this.data.expenses, ids);
  };

  removeCategoriesByIds = ids => {
    this.data.categories = this.removeItemsByIds(this.data.categories, ids);
  };

  removePaymentMethodsByIds = ids => {
    this.data.paymentMethods = this.removeItemsByIds(
      this.data.paymentMethods,
      ids
    );
  };

  getReportById = id => {
    return this.data.reports.filter(report => report.id === id)[0];
  };

  setSelectedReportId = id => {
    this.selectedReportId = id;
  };

  getIncomeByIds = ids => this.getItemsByIds(this.data.income, ids);

  getExpensesByIds = ids => this.getItemsByIds(this.data.expenses, ids);

  get totalIncome() {
    return this.data.income.reduce(this.getTotalAccum, 0);
  }

  get totalExpenses() {
    return this.data.expenses.reduce(this.getTotalAccum, 0);
  }

  get selectedReport() {
    return this.getReportById(this.selectedReportId);
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

  setData = data => {
    Object.assign(this.data, data);
    this.selectedReportId = this.data.reports[0]
      ? this.data.reports[0].id
      : null;
  };

  clearData = () => {
    this.data = {
      income: [],
      expenses: [],
      reports: [],
      categories: [],
      paymentMethods: []
    };
  };
}

decorate(FinanceStore, {
  data: observable,
  selectedReportId: observable
});

export default new FinanceStore();
