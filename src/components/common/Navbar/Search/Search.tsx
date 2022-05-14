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

interface SearchProps extends VDom.IComponentProps {
  dropSearch: () => void;
  search: (_req: string) => void;
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
      <Input
        mode="secondary"
        rounded
        before={<SearchLeftIcon/>}
        onBlur={this.props.dropSearch}
        onInput={this.onTypeRequest}
        ref={this.refSearch}
        placeholder="Search artists, albums..."
      />
      <SearchResult dropSearch={this.clear} />
    </div>
  );
}

const mapStateToProps = (_state: any): Map => ({});

const mapDispatchToProps = (dispatch: any): Map => ({
  search: (request: string): void => {
    dispatch(SearchRequest(request));
  },
  dropSearch: (): void => {
    dispatch(Clear);
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Search);
