import VDom from '@rflban/vdom';
import {
  Button,
  Headline, Subhead,
} from '@rflban/waveui';
import './Homepage.scss';
import Popular from './Popular/Popular';
import {Map} from "../../modules/Store/types";
import {connect} from "../../modules/Connect";
import {albumGetById, albumGetCoverById} from "../../actions/Album";
import Link from "../../modules/Router/Link2";
import {config} from "../../modules/Client/Client";
import {trackGetWeek} from "../../actions/Track";
import {setPosition, startPlay} from "../../actions/Player";
import {ITrack} from "../../modules/Media/media";
import {setTracks} from "../../actions/Playlist";

interface HompageProps extends VDom.IComponentProps {
  trackWeek: ITrack,
  allTracks: ITrack[],
  playlist: ITrack[],
  albumCover: Map,
  getAlbumWeek: () => void;
  getAlbumCover: (_id:number) => void;
  setTracks: (_tracks : ITrack[]) => void;
  runMusic: () => void;
  setPos: (_num : number) => void;
  getAlbum: (_id : string) => void;
  album: Map;
}

class Homepage extends VDom.Component<HompageProps> {
  constructor(props: HompageProps) {
    super(props);
    this.props.getAlbumWeek();
  }

  didUpdate():void {
    if (this.props.albumCover?.[this.props.trackWeek?.albumId])
      return;
    if(this.props.trackWeek?.albumId){
      const id: number = this.props.trackWeek.albumId;
      this.props.getAlbumCover(this.props.trackWeek.albumId);
      if(!this.props.playlist || this.props.playlist?.length < 0) {
        this.props.getAlbum(id.toString());
      }
    }

  }

  setPopularTrack =  (e: Event): void => {
    e.preventDefault();
    const {tracks}:{tracks:ITrack[]} = this.props.album[this.props.trackWeek.albumId];
    this.props.setTracks(tracks);
    const pos :number = tracks.reduce( (position,track,i) =>
      track.id === this.props.trackWeek.id ?  i : position, 0)
    this.props.setPos(pos);
    this.props.runMusic();
  }

  render = (): VDom.VirtualElement => {

    if (!this.props.trackWeek){
      return (
        <div class="main__page">
          <Popular/>
        </div>
      )
    }

    const {albumId,artist,title,cover}
    : {albumId:number, artist:string,title:string,cover:string} = this.props.trackWeek;
    const albumCover:Map = this.props.albumCover?.[albumId];

    return (
      <div class="main__page" style={{
        'background-image': `linear-gradient(180deg, rgba(1, 208, 234, 0.2) 0%, rgba(0, 0, 0, 0) 48.44%),
    linear-gradient(180deg, rgba(11, 18, 32, 0.7) 0%, rgba(11, 18, 32, 0.9) 72.92%, #0B1220 93.23%),url(${
      config.files + cover
      })`}}>
        {this.props.trackWeek &&
              <div class="main__top-chart__album">
                <div class="main__top-chart__album__name">
                  <Headline align="left">{artist}: {title}</Headline>
                  <Subhead align="left" size="s">
                    {albumCover &&
                        <p class="waveHomepage__description">
                          {albumCover.quote}
                        </p>
                    }
                  </Subhead>
                </div>
                <div class="main__top-chart__album__controls">
                  <Button onClick={this.setPopularTrack} class='main__top-chart__album__btn_play' mode='primary'>Play</Button>
                  <Link to={`/album/${albumId}`}>
                    <Button stretched class='main__top-chart__album__btn_follow' mode='outline'>More</Button>
                  </Link>
                </div>
              </div>
        }
        <Popular/>
      </div>
    );

  }
}

const mapStateToProps = (state: any): Map => ({
  trackWeek: state.trackWeek?.[0] ?? null,
  albumCover: state.albumCover ?? null,
  album: state.album ?? null,
  isAuth: state.userStatus === 'authorized',
  playlist: state.playerPlaylist ? state.playerPlaylist : null,
});

const mapDispatchToProps = (dispatch: any): Map => ({
  getAlbumWeek: (): void => {
    dispatch(trackGetWeek);
  },
  getAlbumCover: (id: string): void => {
    dispatch(albumGetCoverById(id));
  },
  runMusic: (): void => {
    dispatch(startPlay);
  },
  setTracks: (tracks : ITrack[]): void => {
    dispatch(setTracks(tracks));
  },
  setPos: (num: number): void => {
    dispatch(setPosition(num));
  },
  getAlbum: (id: string): void => {
    albumGetById(id)(dispatch);
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(Homepage);