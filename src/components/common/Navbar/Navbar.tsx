import VDom from '../../../modules/VDom';
import '../../../index.css';
import './Navbar.scss';
import avatar from '../../../assets/avatar.png';
import Link from '../../../modules/Router/Link';
import { Map } from '../../../modules/Store/types';
import { userLogout } from '../../../actions/User';
import { connect } from '../../../modules/Connect';
import { IComponentPropsCommon } from '../../../modules/VDom/IComponentProps';
import SearchInput from '../SearchInput/SearchInput';
import {Clear, SearchRequest} from "../../../actions/Search";
import SearchResult from "../SearchResult/SearchResult";

interface NavbarProps extends IComponentPropsCommon {
  logout: () => void;
  isAuth: boolean;
  user: Map;
  search: (req: string) => void;
}

const debounceTimeMS: number = 500;

class Navbar extends VDom.Component<NavbarProps> {
  private refSearch = new VDom.Ref<HTMLInputElement>();

  constructor(props: NavbarProps) {
    super(props);
    this.state = {
      isPopupShow: false,
      searchRequest: '',
    };
    this.logout = this.logout.bind(this);
    this.onTypeRequest = this.onTypeRequest.bind(this);
  }

  clear = ():void => {
    this.refSearch.instance.value = '';
    this.props.dropSearch();
  }

  logout = (): void => {
    this.props.logout();
  };

  @VDom.util.Debounce(debounceTimeMS)
  onTypeRequest(e: Event): void {
    const searchRequest = (e.target as HTMLInputElement).value;
    if (searchRequest === ''){
      this.props.dropSearch();
      return
    }
    this.props.search(searchRequest);
    this.setState({searchRequest})
  }

  render = (): VDom.VirtualElement => {
    const content = this.props.isAuth ? (
      <div class="navbar__avatar">
        <div class="navbar__avatar__wrapper">
          <img
            class="navbar__avatar__img_round"
            src={this.props.user.avatar ?? avatar}
            alt="avatar.png"
          />
          <div class="popup">
            <Link as="div" to="/settings" class="text popup__text popup__settings">
              Settings
            </Link>
            <div onClick={this.logout} class="text popup__text popup__logout">
              Log out
            </div>
          </div>
        </div>
      </div>
    ) : (
      <div class="navbar__menu navbar__auth__menu  ">
        <div class="navbar__menu__button">
          <a class="navbar__link-new-page" href="/login">
            <Link to="/login" as="div" class="text button__text">
              LOG IN
            </Link>
          </a>
        </div>
        <div class="navbar__menu__button">
          <a class="navbar__link-new-page" href="/signup">
            <Link to="/signup" as="div" class="text button__text">
              SIGN UP
            </Link>
          </a>
        </div>
      </div>
    );
    return (
      <div class="navbar">
        <div class="navbar__menu">
          <div class="navbar__menu__button">
            <Link to="/" class="text button__text ">
              DISCOVER
            </Link>
          </div>
          <div class="navbar__menu__button">
            <div class="text button__text">MY LIBRARY</div>
          </div>
        </div>
        <div class="navbar__search">
          <input
            oninput={this.onTypeRequest}
            ref = {this.refSearch}
            class="search__input"
            type="text"
            placeholder="Search artists, albums..."
          />
          <span class="fa-solid fa-magnifying-glass navbar__search__icon"></span>
          <SearchResult dropSearch={this.clear}/>
        </div>
        {content}
      </div>
    );
  };
}

const mapStateToProps = (state: any): Map => ({
  isAuth: state.user?.id != null,
  user: state.user ?? {},
  searched: state.search ?? null,
});

const mapDispatchToProps = (dispatch: any): Map => ({
  logout: (): void => {
    dispatch(userLogout());
  },
  search: (request: string): void => {
    dispatch(SearchRequest(request));
  },
  dropSearch: (): void => {
    dispatch(Clear);
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
