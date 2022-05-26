import VDom from '@rflban/vdom';
import {
  Input,
  SearchLeftIcon,
} from '@rflban/waveui';
import SearchResult from '../../SearchResult/SearchResult';
import { Map } from '../../../../modules/Store/types';
import { Clear, SearchRequest } from '../../../../actions/Search';
import { connect } from '../../../../modules/Connect';
import './Search.scss';
import Redirect from "../../../../modules/Router/Redirect";

interface SearchProps extends VDom.IComponentProps {
  dropSearch: () => void;
  search: (_req: string) => void;
  searched: Map | undefined;
}

const debounceTimeMS: number = 500;

class Search extends VDom.Component<SearchProps> {
  private refSearch = new VDom.Ref<HTMLInputElement>();

  state = {
    onSearch: false,
    showPopup:true,
    isAnyFound: true,
  }

  constructor(props: SearchProps) {
    super(props);
    this.onTypeRequest = this.onTypeRequest.bind(this);
    this.clearResult = this.clearResult.bind(this);
  }

  @VDom.util.Debounce(debounceTimeMS)
  onTypeRequest(e: Event): void {
    const searchRequest = (e.target as HTMLInputElement).value;
    if (searchRequest === '') {
      this.props.dropSearch();
      this.setState({isAnyFound:true});
      return;
    }
    this.props.search(searchRequest);
    setTimeout(() => {
      const isAnyFound = this.props?.searched ?
        Object.values(this.props.searched)
          .reduce((accum:boolean,value:any) => accum || value.length > 0, false)
        : false;
      this.setState({isAnyFound});
    },500);
  }

  clear = (): void => {
    this.refSearch.instance.value = '';
    this.props.dropSearch();
  };

  searchHandler = (_e:Event | KeyboardEvent): void =>{
    if(_e instanceof  KeyboardEvent && _e.key !== 'Enter'){
      return;
    }
    this.setState({onSearch:true,showPopup:false})
  }

  didUpdate():void {
    if (window.location.pathname === '/search'
        && this.state.showPopup){
      this.setState({showPopup:false})
      
    } else
    if (window.location.pathname !== '/search' 
        && !this.state.showPopup) {
      this.setState({showPopup:true})
    }
  }

  willUmount():void {
    this.clear();
  }

  clearResult(): void {
    this.refSearch.instance.value = "";
    this.setState({isAnyFound:false});
  }

  render = (): VDom.VirtualElement => {

    if(this.state.onSearch && this.props?.searched){
      this.setState({onSearch:false})
      return <Redirect to="/search"/>
    }


    return <div onkeypress={this.searchHandler} class="search">
      <Input
        mode="secondary"
        rounded
        before={
          <div onClick={this.searchHandler} class="search__icon">
            <SearchLeftIcon />
          </div>}
        onInput={this.onTypeRequest}
        onBlur={this.clearResult}
        ref={this.refSearch}
        placeholder="Search artists, albums..."
      />
      { this.props.searched && this.state.showPopup &&
        <SearchResult dropSearch={this.clear} 
          searched={this.refSearch.instance.value.length > 0 ? this.props.searched: null}/>
      }
    </div>
  }

}

const mapStateToProps = (_state: any): Map => ({
  searched: _state.search,
});

const mapDispatchToProps = (dispatch: any): Map => ({
  search: (request: string): void => {
    dispatch(SearchRequest(request));
  },
  dropSearch: (): void => {
    dispatch(Clear);
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Search);
