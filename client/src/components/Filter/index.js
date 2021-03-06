import './styles.scss';
import { bindEvent } from 'utils/bindEvent';
import { element } from 'utils/element';
import { store } from 'models/store';

export default class Filter {
  constructor($target) {
    this.$target = $target;
    this.store = store;

    this.$Filter = element('div', {
      className: 'filter',
    });

    this.$target.appendChild(this.$Filter);
  }

  render(data) {
    this.$Filter.innerHTML = `
      <div class="income-outcome-filter">
        <input
          class="income-filter-input"
          type="checkbox"
          name="income-filter-input"
          id="income-filter-input"
          ${data.filter.income}
        />
        <label class="income-filter-label left-label" for="income-filter-input">
          <div class="income-filter-label-text">✓ 수입 ${data.total.income.toLocaleString('ko-KR')}원</div>
        </label>

        <input
          class="outcome-filter-input"
          type="checkbox"
          name="outcome-filter-input"
          id="outcome-filter-input"
          ${data.filter.outcome}
        />
        <label class="outcome-filter-label right-label" for="outcome-filter-input">
          <div class="outcome-filter-label-text">✓ 지출 ${data.total.outcome.toLocaleString('ko-KR')}원</div>
        </label>
      </div>
    `;

    bindEvent('.income-filter-label.left-label', 'click', () => {
      this.filterClickHandler(true, data.filter.income);
    });
    bindEvent('.outcome-filter-label.right-label', 'click', () => {
      this.filterClickHandler(false, data.filter.outcome);
    });
  }

  filterClickHandler(isIncome, prevState) {
    this.store.clickFilter(isIncome, prevState);
  }
}
