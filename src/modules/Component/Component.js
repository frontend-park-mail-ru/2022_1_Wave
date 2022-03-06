/*
* Базовый класс компонента
*
* Компонент должен генерировать параметрический
* HTML-код, вставлять его в родительский DOM-элемент
* и прикрпелять/откреплять обработчики событий
*/
export default class Component {
  #props;

  #node;

  #childrenMounters;

  get props() {
    return this.#props;
  }

  get node() {
    return this.#node;
  }

  /*
  * Конструктор
  * @param {object} props - атрибуты объекта
  */
  constructor(props) {
    this.#props = { ...props };
    this.#node = null;
  }

  /*
   * Инициализировать DOM-элемент
   * полученный после вставки HTML-кода
   * в документ
   * @param {HTMLElement} node - элемент DOM-дерева
   * полученный после встаки кода, сгенерированного
   * методом render
   */
  // eslint-disable-next-line class-methods-use-this
  addEventListeners() {}

  /*
   * Генерирует HTML код
   */
  // eslint-disable-next-line class-methods-use-this
  render() {}

  /*
   * Вызывается внутри mount перед рендерингом
   * и добавлением на страницу
   */
  // eslint-disable-next-line class-methods-use-this
  willMount() {}

  /*
   * Вызывается внутри mount после рендеринга
   * и добавления на страницу самого компонента
   * и всех его дочерних элементов
   * @param {HTMLElement} node - корневой узел
   * добавленного на страницу компонента
   */
  // eslint-disable-next-line class-methods-use-this
  didMount() {}

  /*
   * Должен заменить переданный DOM-элемент
   * на сгененированный шаблоном код
   */
  mount(node) {
    this.willMount();

    const subMounters = [];
    Handlebars.registerHelper('mount', (component) => {
      const randId = Math.random().toString(36).slice(2);
      subMounters.push(() => {
        component.mount(document.getElementById(randId));
      });

      return new Handlebars.SafeString(`<div id="${randId}"></div>`);
    });

    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = this.render();
    this.#node = tempDiv.firstElementChild;

    node.replaceWith(this.#node);
    subMounters.forEach((mounter) => mounter());

    this.didMount(this.#node);
  }

  remount() {
    if (this.#node != null) {
      this.mount(this.#node);
    }
  }
}
