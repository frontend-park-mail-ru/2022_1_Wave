import VDom from '@rflban/vdom';
import {
  Button,
  Headline, Subhead,
} from '@rflban/waveui';
import './Homepage.scss';
import Popular from './Popular/Popular';
import {Map} from "../../modules/Store/types";
import {connect} from "../../modules/Connect";
import {albumGetCoverById, albumGetWeek} from "../../actions/Album";
import Link from "../../modules/Router/Link2";
import {config} from "../../modules/Client/Client";

interface HompageProps extends VDom.IComponentProps {
  albumWeek: {
    id :number,
    artistId :number,
    title: string,
    artist: string,
    cover: string,
  }
  albumCover: Map,
  getAlbumWeek: () => void;
  getAlbumCover: (_id:number) => void;
}

class Homepage extends VDom.Component<HompageProps> {
  constructor(props: HompageProps) {
    super(props);
    this.props.getAlbumWeek();
  }

  didUpdate():void {
    if (this.props.albumCover)
      return;
    if(this.props.albumWeek?.id)
      this.props.getAlbumCover(this.props.albumWeek.id)
  }

  render = (): VDom.VirtualElement => {

    if (!this.props.albumWeek){
      return (
        <div class="main__page">
          <Popular/>
        </div>
      )
    }

    const {id,artistId,artist,title,cover}
    : {id:number,artistId:number,artist:string,title:string,cover:string} = this.props.albumWeek;
    const albumCover:Map = this.props.albumCover?.[id];
    console.log('album cover',albumCover)

    return (
      <div class="main__page" style={{
        'background-image': `linear-gradient(180deg, rgba(1, 208, 234, 0.2) 0%, rgba(0, 0, 0, 0) 48.44%),
    linear-gradient(180deg, rgba(11, 18, 32, 0.7) 0%, rgba(11, 18, 32, 0.9) 72.92%, #0B1220 93.23%),url(${
      config.files + cover
      })`}}>
        {this.props.albumWeek &&
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
                  <Link to={`/album/${id}`}>
                    <Button stretched class='main__top-chart__album__btn_play' mode='primary'>Play</Button>
                  </Link>
                  <Link to={`/artist/${artistId}`}>
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
  albumWeek: state.albumWeek?.[5] ?? null,
  albumCover: state.albumCover ?? null,
});

const mapDispatchToProps = (dispatch: any): Map => ({
  getAlbumWeek: (): void => {
    dispatch(albumGetWeek);
  },
  getAlbumCover: (id: string): void => {
    dispatch(albumGetCoverById(id));
  },
})

export default connect(mapStateToProps, mapDispatchToProps)(Homepage);