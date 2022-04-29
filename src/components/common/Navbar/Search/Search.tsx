import VDom from '../../../../modules/VDom';
import SearchResult from '../../SearchResult/SearchResult';
import { Map } from '../../../../modules/Store/types';
import { Clear, SearchRequest } from '../../../../actions/Search';
import { connect } from '../../../../modules/Connect';
import './Search.scss';

interface SearchProps extends VDom.IComponentProps {
  dropSearch: () => void;
  search: (req: string) => void;
}

const debounceTimeMS: number = 500;

class Search extends VDom.Component<SearchProps> {
  private refSearch = new VDom.Ref<HTMLInputElement>();

  constructor(props: SearchProps) {
    super(props);
    this.onTypeRequest = this.onTypeRequest.bind(this);
  }

  @VDom.util.Debounce(debounceTimeMS)
  onTypeRequest(e: Event): void {
    const searchRequest = (e.target as HTMLInputElement).value;
    if (searchRequest === '') {
      this.props.dropSearch();
      return;
    }
    this.props.search(searchRequest);
  }

  clear = (): void => {
    this.refSearch.instance.value = '';
    this.props.dropSearch();
  };

  render = (): VDom.VirtualElement => (
    <div class="search">
      <input
        onInput={this.onTypeRequest}
        ref={this.refSearch}
        class="search__input"
        type="text"
        placeholder="Search artists, albums..."
      />
      <span class="fa-solid fa-magnifying-glass search__icon"></span>
      <SearchResult dropSearch={this.clear} />
    </div>
  );
}

const mapStateToProps = (state: any): Map => ({});

const mapDispatchToProps = (dispatch: any): Map => ({
  search: (request: string): void => {
    dispatch(SearchRequest(request));
  },
  dropSearch: (): void => {
    dispatch(Clear);
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Search);
