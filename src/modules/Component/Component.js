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

  static #unmounters = new Map();

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
   * Вызывается внутри mount перед удалением
   * текущего компонента из документа
   * @param {HTMLElement} node - корневой узел
   * добавленного на страницу компонента
   */
  // eslint-disable-next-line class-methods-use-this
  willUnmount() {}

  /*
   * Заменяет переданный DOM-элемент
   * на сгененированный шаблоном код
   * @param {HTMLElement} node - DOM-элемент
   * который будет заменён на компонент
   */
  mount(node) {
    if (!document.contains(node)) {
      return;
    }

    this.willMount();

    Array.prototype.slice.call(node.querySelectorAll('[unmount-id]'))
      .reverse()
      .forEach((element) => {
        const unmountId = element.getAttribute('unmount-id');
        Component.#unmounters.get(unmountId)?.();
        Component.#unmounters.delete(unmountId);
      });

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

    const unmountId = Math.random().toString(36).slice(2);
    Component.#unmounters.set(unmountId, this.willUnmount.bind(this, this.#node));
    this.#node.setAttribute('unmount-id', unmountId);

    node.replaceWith(this.#node);
    subMounters.forEach((mounter) => mounter());

    this.didMount(this.#node);
  }

  /*
   * Перерисует компонент
   */
  remount() {
    if (this.#node != null) {
      this.mount(this.#node);
    }
  }
}
