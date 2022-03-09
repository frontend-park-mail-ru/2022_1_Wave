import Component from '/modules/Component/Component.js';
import UnauthorizedSidebar from '/components/UnauthorizedSidebar/UnauthorizedSidebar.js';
import UnauthorizedHomepage from '/components/UnauthorizedHomepage/UnauthorizedHomepage.js';

export default class UnauthorizedMainPage extends Component {
  #template;

  constructor(props) {
    super(props);
    this.#template = Handlebars.templates['UnauthorizedMainPage.hbs'];
  }

  render() {
    return this.#template({
      sidebar: new UnauthorizedSidebar(),
      content: new UnauthorizedHomepage(),
    });
  }
}
