import VDom from '@rflban/vdom';
import { Map } from '../../../modules/Store/types';
import './SearchResult.scss';
import MatchedBlock from './MatchedBlock/MatchedBlock';

interface SearchInputProps {
  searched: Map| null;
  dropSearch: (_e:Event) => void;
}

export default class SearchResult extends VDom.Component<SearchInputProps> {

  render = (): VDom.VirtualElement =>{

    if (!this.props.searched) {
      return <></>
    }

    return <div class="search-result">
      {
        this.props.searched.MatchedTracks.length > 0 &&
          <MatchedBlock
            drop={this.props.dropSearch}
            type="track"
            title="Tracks"
            array={this.props.searched.MatchedTracks.slice(0,3)}
          />
      }
      {
        this.props.searched.MatchedAlbums.length > 0 &&
          <MatchedBlock
            drop={this.props.dropSearch}
            type="album"
            title="Albums"
            array={this.props.searched.MatchedAlbums.slice(0,3)}
          />
      }
      {
        this.props.searched.MatchedArtists.length > 0 &&
          <MatchedBlock
            drop={this.props.dropSearch}
            type="artist"
            title="Artists"
            array={this.props.searched.MatchedArtists.slice(0,3)}
          />
      }
    </div>
  }

}