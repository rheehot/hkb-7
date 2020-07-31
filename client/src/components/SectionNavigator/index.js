import './styles.scss';
import { element } from 'utils/element';

export default class SectionNavigator {
  constructor($target) {
    this.$target = $target;

    this.$SectionNavigator = element('ul', {
      className: 'section-navigator',
      innerHTML: `
        <li class="section-tab">내역</li>
        <li class="section-tab">달력</li>
        <li class="section-tab">통계</li>
      `,
    });

    this.render();
  }

  render() {
    this.$target.appendChild(this.$SectionNavigator);
  }
}