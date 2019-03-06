import { computed, decorate, observable } from "mobx";
import objectHash from "object-hash";
import moment from "moment";

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

  addExpense = expense => {
    if (expense.repeatMonths > 0) {
      this.addWithHashId(expense, this.expenses);
      for (let i = 0; i < expense.repeatMonths; i++) {
        const newExpense = Object.assign({}, expense);
        newExpense.date = moment(expense.date)
          .add(i + 1, "month")
          .format();
        this.addWithHashId(newExpense, this.expenses);
      }
    } else if (expense.splitMonths > 0) {
      for (let i = 0; i < expense.splitMonths; i++) {
        const newExpense = Object.assign({}, expense);
        newExpense.description += ` ${i + 1}/${expense.splitMonths}`;
        newExpense.date = moment(expense.date)
          .add(i, "month")
          .format();
        newExpense.value = (expense.value / expense.splitMonths).toFixed(2);
        this.addWithHashId(newExpense, this.expenses);
      }
    } else {
      this.addWithHashId(expense, this.expenses);
    }
  };

  addPaymentMethod = paymentMethod =>
    this.addWithHashId(paymentMethod, this.paymentMethods);

  addCategory = category => this.addWithHashId(category, this.categories);

  addReport = report => this.addWithHashId(report, this.reports);

  addIncomeToReport = (report, incomeIds) => {
    const reportIncomeIds = new Set([...report.incomeIds, ...incomeIds]);
    report.incomeIds = Array.from(reportIncomeIds);
  };

  addExpensesToReport = (report, expensesIds) => {
    report.expensesIds = Array.from(
      new Set([...report.expensesIds, ...expensesIds])
    );
  };

  addExpenses = expenses => {
    const expensesIds = this.expensesIds;
    expenses
      .filter(elem => !expensesIds.has(elem.id))
      .forEach(e => this.addExpense(e));
  };

  setExpensesCategory = (category, expensesIds) => {
    this.data.expenses
      .filter(expense => expensesIds.has(expense.id))
      .forEach(expense => (expense.category = category.description));
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

  getIncomeByIds = ids => this.getItemsByIds(this.income, ids);

  getExpensesByIds = ids => this.getItemsByIds(this.expenses, ids);

  getCategoryById = id => {
    return this.data.categories.filter(category => category.id === id)[0];
  };

  get totalIncome() {
    return this.data.income.reduce(this.getTotalAccum, 0);
  }

  get totalExpenses() {
    return this.data.expenses.reduce(this.getTotalAccum, 0);
  }

  get incomeIds() {
    return new Set(this.mapToId(this.income));
  }

  get expensesIds() {
    return new Set(this.mapToId(this.expenses));
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

  mapToId = items => {
    return items.map(item => item.id);
  };

  setData = data => {
    // This prevents any deepObservers from being cleared, since the reference to "data" is not changed
    Object.assign(this.data, data);
    this.selectedReportId = this.data.reports[0]
      ? this.data.reports[0].id
      : null;
  };

  clearData = () => {
    // This prevents any deepObservers from being cleared, since the reference to "data" is not changed
    Object.assign(this.data, {
      income: [],
      expenses: [],
      reports: [],
      categories: [],
      paymentMethods: []
    });
  };
}

decorate(FinanceStore, {
  data: observable,
  selectedReportId: observable,
  expensesIds: computed
});

export default new FinanceStore();
