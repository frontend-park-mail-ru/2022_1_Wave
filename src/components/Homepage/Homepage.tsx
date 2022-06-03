import VDom from '@rflban/vdom';
import {
  Button,
  Headline, Subhead,
} from '@rflban/waveui';
import './Homepage.scss';
import Popular from './Popular/Popular';
import {Map} from "../../modules/Store/types";
import {connect} from "../../modules/Connect";
import {albumGetCoverById} from "../../actions/Album";
import Link from "../../modules/Router/Link2";
import {config} from "../../modules/Client/Client";
import {trackGetWeek} from "../../actions/Track";
import {setPosition, startPlay} from "../../actions/Player";
import {ITrack} from "../../modules/Media/media";
import {setTracks} from "../../actions/Playlist";

interface HompageProps extends VDom.IComponentProps {
  trackWeek: {
    id :number,
    artistId :number,
    albumId :number,
    title: string,
    artist: string,
    cover: string,
  }
  allTracks: ITrack[],
  albumCover: Map,
  getAlbumWeek: () => void;
  getAlbumCover: (_id:number) => void;
  setWeekTracks: (_tracks : ITrack[]) => void;
  runMusic: () => void;
  setPos: (_num : number) => void;
}

class Homepage extends VDom.Component<HompageProps> {
  constructor(props: HompageProps) {
    super(props);
    this.props.getAlbumWeek();
  }

  didUpdate():void {
    if (this.props.albumCover?.[this.props.trackWeek?.albumId])
      return;
    if(this.props.trackWeek?.albumId)
      this.props.getAlbumCover(this.props.trackWeek.albumId)
  }

  setPopularTrack = (e: Event) : void => {
    e.preventDefault();
    this.props.setWeekTracks(this.props.allTracks);
    this.props.setPos(0);
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

    const {artistId,albumId,artist,title,cover}
    : {artistId:number, albumId:number, artist:string,title:string,cover:string} = this.props.trackWeek;
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
                  <Button onClick={this.setPopularTrack} class='main__top-chart__album__btn_play' mode='primary'>Listen top</Button>
                  <Link to={`/album/${albumId}`}>
                    <Button stretched class='main__top-chart__album__btn_follow' mode='outline'>To album</Button>
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
  allTracks: state.trackWeek ?? null,
  albumCover: state.albumCover ?? null,
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
  setWeekTracks: (tracks : ITrack[]): void => {
    dispatch(setTracks(tracks));
  },
  setPos: (num: number): void => {
    dispatch(setPosition(num));
  },
})

export default connect(mapStateToProps, mapDispatchToProps)(Homepage);