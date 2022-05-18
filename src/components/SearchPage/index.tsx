import VDom from '@rflban/vdom';
import {
  AlbumIcon,
  Caption, Divider,
  Headline, HorizontalScroll, ImageCard, SingerRightIcon,
} from '@rflban/waveui';
import '../../index.css';
import './style.scss';
import {Map} from "../../modules/Store/types";
import TracksContainer from "../common/TracksContainer/TracksContainer";
import {connect} from "../../modules/Connect";
import {IComponentPropsCommon} from "../../../../../vdom/dist/IComponentProps";
import {ITrack} from "../../modules/Media/media";
import {setTracks} from "../../actions/Playlist";
import {config} from "../../modules/Client/Client";
import Link from "../../modules/Router/Link2";

interface SearchPageProps extends IComponentPropsCommon {
    searched : Map;
    setPlaylist: (tracks: ITrack[]) => void;
}

class SearchPage extends VDom.Component<SearchPageProps> {

  tracksClickHandler = (tracks: ITrack[]): (_e: MouseEvent) => void => (_e: MouseEvent): void => {
    this.props.setPlaylist(tracks);
  }
  
  render = (): VDom.VirtualElement => {
    const {searched} = this.props;
    const isAnyFound = this.props?.searched ?
      Object.values(this.props.searched)
        .reduce((accum:boolean,value:any) => accum || value.length > 0, false)
      : false;
    if (!isAnyFound) {
      return <div class="waveSearchPage">
        <Headline align='left' size="s">Not found any matched to request</Headline>
      </div>
    }
    const {MatchedTracks = [], MatchedAlbums = [], MatchedArtists = []} = searched;
    const tracksColumns = MatchedTracks.reduce((accum: Array<Array<ITrack>>, track : ITrack,index:number) => {
      const arrayPos: number = Math.floor(index);
      if (!(accum[arrayPos] instanceof Array)){
        accum[arrayPos] = [];
      }
      accum[arrayPos].push(track);
      return accum
    },[]);

    return (
      <div class="waveSearchPage">
        <Headline align='left' size="s">Search Results</Headline>
        { MatchedTracks.length > 0 &&
            <>
              <div class="waveSearchPage__name">
                <Caption class="name__title">Matched Tracks</Caption>
                <Divider/>
              </div>

              <div class="waveSearchPage__tracks_block">

                <TracksContainer tracks={MatchedTracks}
                  onTrackRun={this.tracksClickHandler(MatchedTracks)}
                />
              </div>
            </>
        }

        { MatchedAlbums.length > 0 &&
            <div class="waveSearchPage__name">
              <Caption class="name__title">Matched Albums</Caption>
              <Divider/>
            </div>

        }
        <HorizontalScroll controlsCenterOffset={57} leftOffset={40} rightOffset={40}>
          {
            Object.entries(MatchedAlbums).map(([_, v]: [k: string, v: Map]) => 
              <ImageCard
                icon={<AlbumIcon style={{height: '25%'}}/>}
                src={config.files + v.cover}
                title={
                  <Link to={`/album/${v.id}`}>
                    {v.title}
                  </Link>
                }
                size="m"
                imageWrapper={(img): VDom.VirtualElement => (
                  <Link to={`/album/${v.id}`}>
                    {img}
                  </Link>
                )}
              />
            )
          }
        </HorizontalScroll>
        { MatchedArtists.length > 0 &&
            <div class="waveSearchPage__name">
              <Caption class="name__title">Matched Artists</Caption>
              <Divider/>
            </div>

        }

        <HorizontalScroll
          controlsCenterOffset={41}
          leftOffset={40}
          rightOffset={40}
          gap={40}
          scrollStep={160}
        >
          {
            Object.entries(MatchedArtists).map(([_,v]:[k:string,v:Map]) =>
              <ImageCard
                icon={<SingerRightIcon style={{ height: '25%' }}/>}
                src={config.files + v.cover}
                title={
                  <Link to={`/artist/${v.id}`}>
                    {v.name}
                  </Link>
                }
                size="m"
                rounded
                align="center"
                imageWrapper={(img) => (
                  <Link to={`/artist/${v.id}`}>
                    {img}
                  </Link>
                )}
              />)
          }
        </HorizontalScroll>
      </div>
    );
  }
}

const mapStateToProps = (state: any): Map => ({
  searched: state.search,
});

const mapDispatchToProps = (_dispatch: any): Map => ({
  setPlaylist: (tracks: ITrack[]): void => {
    _dispatch(setTracks(tracks));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(SearchPage);