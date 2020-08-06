import './styles.scss';
import { getDailyString } from 'utils/helper';
import { element } from 'utils/element';
import ActivityItem from 'components/ActivityItem';
import { store } from 'models/store';

export default class DailyActivityCard {
  constructor($target, day) {
    this.$target = $target;
    this.store = store;
    this.store.subscribe((data) => this.hideCard(data), 'clickFilter');

    this.$DailyActivityCard = element('div', {
      className: 'daily-activity-card',
      id: `daily-activity-card-${day}`,
    });

    this.$DailyActivitySummary = element('div', {
      className: 'activity-day-summary',
    });

    this.$DailyActivityCard.appendChild(this.$DailyActivitySummary);
    this.$target.appendChild(this.$DailyActivityCard);
  }

  render({ dailyActivities, dailyTotal }) {
    const sum = dailyTotal.income - dailyTotal.outcome;
    this.$DailyActivitySummary.innerHTML = `
      <div class="activity-date">${getDailyString(dailyActivities[0].date)}</div>
      <div class="activity-stats">
        <span class="positive">${dailyTotal.income.toLocaleString(
          'ko-KR',
        )}원</span> <span class="negative">-${dailyTotal.outcome.toLocaleString('ko-KR')}원</span> =
        <span class="${sum < 0 ? 'negative' : 'positive'}">${sum}원</span>
      </div>
    `;
    this.createDailyActivityList(dailyActivities);
  }

  createDailyActivityList(activities) {
    this.$DailyActivities = activities.reduce((list, item) => {
      list[item.id] = new ActivityItem(this.$DailyActivityCard, item.id);
      list[item.id].render({ ...item });
      return list;
    }, {});
  }

  hideCard(data) {
    console.log(data);
    if (!data.filter.income && !data.filter.outcome) {
      this.$DailyActivityCard.classList.add('disabled');
    }
  }

  remove() {
    this.$DailyActivityCard.remove();
  }
}
