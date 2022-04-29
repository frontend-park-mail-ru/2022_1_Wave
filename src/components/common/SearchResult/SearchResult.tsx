import VDom from '../../../modules/VDom';
import { Map } from '../../../modules/Store/types';
import { connect } from '../../../modules/Connect';
import { IComponentPropsCommon } from '../../../modules/VDom/IComponentProps';
import './SearchResult.scss';
import MatchedBlock from './MatchedBlock/MatchedBlock';
import {Clear} from "../../../actions/Search";

interface SearchInputProps extends IComponentPropsCommon {
    searched: Map;
    dropSearch: () => void;
}

class SearchResult extends VDom.Component<SearchInputProps> {
  render = (): VDom.VirtualElement => 
    this.props.searched ? (<div class="search">
      {this.props.searched.MatchedTracks.length > 0 ?
        <MatchedBlock drop={this.props.dropSearch} type='track' title='Tracks' array={this.props.searched.MatchedTracks} /> : <></>}
      {this.props.searched.MatchedAlbums.length > 0 ?
        <MatchedBlock drop={this.props.dropSearch} type='album' title='Albums' array={this.props.searched.MatchedAlbums} /> : <></>}
      {this.props.searched.MatchedArtists.length > 0 ?
        <MatchedBlock drop={this.props.dropSearch} type='artist' title='Artists' array={this.props.searched.MatchedArtists} /> : <></>}
    </div>) : (<></>);
}

const mapStateToProps = (state: any): Map => ({
  searched: state.search ?? null,
});

const mapDispatchToProps = (dispatch: any): Map => ({
  dropSearch: (): void => {
    dispatch(Clear);
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(SearchResult);
