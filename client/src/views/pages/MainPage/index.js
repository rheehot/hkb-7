import './styles.scss';
import Header from 'components/Header';
import SectionNavigator from 'components/SectionNavigator';
import MonthNavigator from 'components/MonthNavigator';
import ActivitySection from 'views/sections/ActivitySection';
import CalendarSection from 'views/sections/CalendarSection';
import StatisticSection from 'views/sections/StatisticSection';
import { element } from 'utils/element';
import { store } from 'models/store';

export default class MainPage {
  constructor($target) {
    this.$App = $target;
    this.store = store;
    this.store.subscribe((data) => this.init(data));
    this.createHeader();
    this.createNavigator();
    this.createSection();
  }

  init(data) {
    this.$Header.init();
    this.$SectionNavigator.render(data);
    this.$MonthNavigator.render(data);
    this.$ActivitySection.init(data);
  }

  createHeader() {
    this.$Header = new Header(this.$App);
  }

  createNavigator() {
    this.$Container = element('div', {
      className: 'main-container',
    });
    this.$App.appendChild(this.$Container);

    this.$SectionNavigator = new SectionNavigator(this.$Container);
    this.$MonthNavigator = new MonthNavigator(this.$Container);
  }

  createSection() {
    this.$SectionContainer = element('div', {
      className: 'section-container',
    });
    this.$Container.appendChild(this.$SectionContainer);

    this.$ActivitySection = new ActivitySection(this.$SectionContainer);
  }

  setState() {}
}
