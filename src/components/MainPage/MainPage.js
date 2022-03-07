import Component from '/modules/Component/Component.js';
import Sidebar from '/components/Sidebar/Sidebar.js';
import Homepage from '/components/Homepage/Homepage.js';

export default class MainPage extends Component {
  #template;

  constructor(props) {
    super(props);
    this.#template = Handlebars.templates['MainPage.hbs'];
  }

  render() {
    return this.#template({
      sidebar: new Sidebar(),
      content: new Homepage(),
    });
  }
}
