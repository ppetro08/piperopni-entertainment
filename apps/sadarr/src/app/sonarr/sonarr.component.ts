import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy
} from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Subject } from 'rxjs';
import { debounceTime, takeUntil } from 'rxjs/operators';
import { AddEvent, Series } from './model/series';
import { SonarrApiService } from './sonarr.api.service';

@Component({
  selector: 'pip-sonarr',
  templateUrl: './sonarr.component.html',
  styleUrls: ['./sonarr.component.scss'],
  providers: [SonarrApiService],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SonarrComponent implements OnDestroy {
  data: Series[] = [
    {
      title: 'The Blacklist',
      sortTitle: 'blacklist',
      seasonCount: 9,
      status: 'continuing',
      overview:
        'Raymond “Red” Reddington, one of the FBI’s most wanted fugitives, surrenders in person at FBI Headquarters in Washington, D.C. He claims that he and the FBI have the same interests—bringing down dangerous criminals and terrorists. In the last two decades, he’s made a list of criminals and terrorists that matter the most but the FBI cannot find because it does not know they exist. Reddington calls this “The Blacklist.” Reddington will co-operate with the FBI, but insists that he will speak only to Elizabeth Keen, a rookie profiler.',
      network: 'NBC',
      airTime: '20:00',
      images: [
        {
          coverType: 'banner',
          url: 'https://artworks.thetvdb.com/banners/graphical/266189-g20.jpg',
        },
        {
          coverType: 'poster',
          url: 'https://artworks.thetvdb.com/banners/posters/266189-1.jpg',
        },
        {
          coverType: 'fanart',
          url: 'https://artworks.thetvdb.com/banners/fanart/original/266189-1.jpg',
        },
      ],
      remotePoster: 'https://artworks.thetvdb.com/banners/posters/266189-1.jpg',
      seasons: [
        {
          seasonNumber: 0,
          monitored: false,
        },
        {
          seasonNumber: 1,
          monitored: true,
        },
        {
          seasonNumber: 2,
          monitored: true,
        },
        {
          seasonNumber: 3,
          monitored: true,
        },
        {
          seasonNumber: 4,
          monitored: true,
        },
        {
          seasonNumber: 5,
          monitored: true,
        },
        {
          seasonNumber: 6,
          monitored: true,
        },
        {
          seasonNumber: 7,
          monitored: true,
        },
        {
          seasonNumber: 8,
          monitored: true,
        },
        {
          seasonNumber: 9,
          monitored: true,
        },
      ],
      year: 2013,
      profileId: 0,
      seasonFolder: false,
      monitored: true,
      useSceneNumbering: false,
      runtime: 43,
      tvdbId: 266189,
      tvRageId: 35048,
      tvMazeId: 69,
      firstAired: '2013-09-23T04:00:00Z',
      seriesType: 'standard',
      cleanTitle: 'theblacklist',
      imdbId: 'tt2741602',
      titleSlug: 'the-blacklist',
      certification: 'TV-14',
      genres: ['Action', 'Crime', 'Drama'],
      tags: [],
      added: '0001-01-01T00:00:00Z',
      ratings: {
        votes: 5359,
        value: 8.7,
      },
      qualityProfileId: 0,
    },
    {
      title: 'The Blacklist',
      sortTitle: 'blacklist',
      seasonCount: 2,
      status: 'ended',
      overview:
        'Together with young children, host Tom Waes, performs exciting activities and stunts.',
      network: 'één',
      airTime: '00:00',
      images: [
        {
          coverType: 'poster',
          url: 'https://artworks.thetvdb.com/banners/series/394358/posters/5ff0a0e8b3dd7.jpg',
        },
        {
          coverType: 'fanart',
          url: 'https://artworks.thetvdb.com/banners/series/394358/backgrounds/5ff10ea4b62d1.jpg',
        },
      ],
      remotePoster:
        'https://artworks.thetvdb.com/banners/series/394358/posters/5ff0a0e8b3dd7.jpg',
      seasons: [
        {
          seasonNumber: 1,
          monitored: true,
        },
        {
          seasonNumber: 2,
          monitored: true,
        },
      ],
      year: 2014,
      profileId: 0,
      seasonFolder: false,
      monitored: true,
      useSceneNumbering: false,
      runtime: 55,
      tvdbId: 394358,
      tvRageId: 0,
      tvMazeId: 53432,
      firstAired: '2014-11-03T05:00:00Z',
      seriesType: 'standard',
      cleanTitle: 'theblacklist',
      titleSlug: 'the-blacklist',
      genres: ['Family'],
      tags: [],
      added: '0001-01-01T00:00:00Z',
      ratings: {
        votes: 0,
        value: 0.0,
      },
      qualityProfileId: 0,
    },
    {
      title: 'Blacklist (2019)',
      sortTitle: 'blacklist 2019',
      seasonCount: 1,
      status: 'ended',
      overview:
        'After his sister goes missing, a young man is asked to join "Blacklist," a group of students who work together to stop the crimes and injustices in their school.',
      network: 'GMM One',
      airTime: '23:30',
      images: [
        {
          coverType: 'banner',
          url: 'https://artworks.thetvdb.com/banners/graphical/5c3de8e1c4da0.jpg',
        },
        {
          coverType: 'poster',
          url: 'https://artworks.thetvdb.com/banners/posters/5c3de8852c922.jpg',
        },
      ],
      remotePoster:
        'https://artworks.thetvdb.com/banners/posters/5c3de8852c922.jpg',
      seasons: [
        {
          seasonNumber: 0,
          monitored: false,
        },
        {
          seasonNumber: 1,
          monitored: true,
        },
      ],
      year: 2019,
      profileId: 0,
      seasonFolder: false,
      monitored: false,
      useSceneNumbering: false,
      runtime: 45,
      tvdbId: 358213,
      tvRageId: 0,
      tvMazeId: 44220,
      firstAired: '2019-10-13T04:00:00Z',
      seriesType: 'standard',
      cleanTitle: 'blacklist2019',
      imdbId: 'tt9892494',
      titleSlug: 'blacklist-2019',
      certification: 'TV-PG',
      genres: ['Action', 'Drama', 'Romance'],
      tags: [],
      added: '0001-01-01T00:00:00Z',
      ratings: {
        votes: 0,
        value: 0.0,
      },
      qualityProfileId: 0,
    },
    {
      title: 'Blacklisted',
      sortTitle: 'blacklisted',
      seasonCount: 1,
      status: 'ended',
      overview:
        "Blacklisted is an award-winning NPR radio drama about the Hollywood Blacklist and one family's fifteen years in flight and under surveillance from the FBI during the Cold War. With an all-star cast including Stockard Channing, Carrol O'Connor, Ron Leibman, Eli Wallach, Jerry Stiller, Julie Harris, and John Randolph.",
      airTime: '00:00',
      images: [],
      seasons: [
        {
          seasonNumber: 1,
          monitored: true,
        },
      ],
      year: 0,
      profileId: 0,
      seasonFolder: false,
      monitored: true,
      useSceneNumbering: false,
      runtime: 0,
      tvdbId: 373281,
      tvRageId: 0,
      tvMazeId: 0,
      seriesType: 'standard',
      cleanTitle: 'blacklisted',
      titleSlug: 'blacklisted',
      genres: ['Podcast'],
      tags: [],
      added: '0001-01-01T00:00:00Z',
      ratings: {
        votes: 0,
        value: 0.0,
      },
      qualityProfileId: 0,
    },
    {
      title: 'black-ish',
      sortTitle: 'black ish',
      seasonCount: 7,
      status: 'continuing',
      overview:
        'An upper-middle-class black man struggles to raise his children with a sense of cultural identity despite constant contradictions and obstacles coming from his liberal wife, old-school father and his assimilated, color-blind kids.',
      network: 'ABC (US)',
      airTime: '21:00',
      images: [
        {
          coverType: 'banner',
          url: 'https://artworks.thetvdb.com/banners/graphical/281511-g.jpg',
        },
        {
          coverType: 'poster',
          url: 'https://artworks.thetvdb.com/banners/posters/281511-1.jpg',
        },
        {
          coverType: 'fanart',
          url: 'https://artworks.thetvdb.com/banners/fanart/original/281511-1.jpg',
        },
      ],
      remotePoster: 'https://artworks.thetvdb.com/banners/posters/281511-1.jpg',
      seasons: [
        {
          seasonNumber: 0,
          monitored: false,
        },
        {
          seasonNumber: 1,
          monitored: true,
        },
        {
          seasonNumber: 2,
          monitored: true,
        },
        {
          seasonNumber: 3,
          monitored: true,
        },
        {
          seasonNumber: 4,
          monitored: true,
        },
        {
          seasonNumber: 5,
          monitored: true,
        },
        {
          seasonNumber: 6,
          monitored: true,
        },
        {
          seasonNumber: 7,
          monitored: true,
        },
      ],
      year: 2014,
      profileId: 0,
      seasonFolder: false,
      monitored: true,
      useSceneNumbering: false,
      runtime: 21,
      tvdbId: 281511,
      tvRageId: 38317,
      tvMazeId: 57,
      firstAired: '2014-09-24T04:00:00Z',
      seriesType: 'standard',
      cleanTitle: 'blackish',
      imdbId: 'tt3487356',
      titleSlug: 'black-ish',
      certification: 'TV-PG',
      genres: ['Comedy', 'Family'],
      tags: [],
      added: '0001-01-01T00:00:00Z',
      ratings: {
        votes: 400,
        value: 8.1,
      },
      qualityProfileId: 0,
    },
    {
      title: 'Blackstar',
      sortTitle: 'blackstar',
      seasonCount: 1,
      status: 'ended',
      overview:
        "Astronaut John Blackstar's shuttle passes through a black hole and crashes on the planet Sagar. He is rescued by the gentle Trobbits who live under the tyranny of the evil Overlord who possesses the Power Sword. John Blackstar then possesses the Star Sword. When the two weapons are combined, they form the Power Star, the most powerful weapon imaginable. Blackstar aids the Trobbits' resistance with his dragon Warlock, Klone the Shape-Shifter, Storm the Amazon, and Mara the Sorceress in the battle against Overlord.",
      network: 'CBS',
      images: [
        {
          coverType: 'banner',
          url: 'https://artworks.thetvdb.com/banners/graphical/78682-g.jpg',
        },
        {
          coverType: 'poster',
          url: 'https://artworks.thetvdb.com/banners/posters/78682-4.jpg',
        },
        {
          coverType: 'fanart',
          url: 'https://artworks.thetvdb.com/banners/fanart/original/78682-3.jpg',
        },
      ],
      remotePoster: 'https://artworks.thetvdb.com/banners/posters/78682-4.jpg',
      seasons: [
        {
          seasonNumber: 0,
          monitored: false,
        },
        {
          seasonNumber: 1,
          monitored: true,
        },
      ],
      year: 1981,
      profileId: 0,
      seasonFolder: false,
      monitored: true,
      useSceneNumbering: false,
      runtime: 25,
      tvdbId: 78682,
      tvRageId: 2820,
      tvMazeId: 18769,
      firstAired: '1981-09-12T04:00:00Z',
      seriesType: 'standard',
      cleanTitle: 'blackstar',
      imdbId: 'tt0170881',
      titleSlug: 'blackstar',
      genres: ['Adventure', 'Animation', 'Children', 'Fantasy'],
      tags: [],
      added: '0001-01-01T00:00:00Z',
      ratings: {
        votes: 54,
        value: 9.0,
      },
      qualityProfileId: 0,
    },
    {
      title: 'Blackstone',
      sortTitle: 'blackstone',
      seasonCount: 5,
      status: 'ended',
      overview:
        'Intense, compelling and confrontational, Blackstone is an unmuted exploration of First Nations’ power and politics, unfolding over nine one-hour episodes. This raw, authentic drama tells the story of the fictional Blackstone First Nation, suffering disintegration by its own hand – the result of the corruption of its Chief and Council. From within the community, a new generation of leaders rise up and fight to create lasting and substantial change.',
      network: 'Showcase (CA)',
      airTime: '21:00',
      images: [
        {
          coverType: 'banner',
          url: 'https://artworks.thetvdb.com/banners/graphical/213921-g5.jpg',
        },
        {
          coverType: 'poster',
          url: 'https://artworks.thetvdb.com/banners/posters/213921-2.jpg',
        },
        {
          coverType: 'fanart',
          url: 'https://artworks.thetvdb.com/banners/fanart/original/213921-4.jpg',
        },
      ],
      remotePoster: 'https://artworks.thetvdb.com/banners/posters/213921-2.jpg',
      seasons: [
        {
          seasonNumber: 0,
          monitored: false,
        },
        {
          seasonNumber: 1,
          monitored: true,
        },
        {
          seasonNumber: 2,
          monitored: true,
        },
        {
          seasonNumber: 3,
          monitored: true,
        },
        {
          seasonNumber: 4,
          monitored: true,
        },
        {
          seasonNumber: 5,
          monitored: true,
        },
      ],
      year: 2011,
      profileId: 0,
      seasonFolder: false,
      monitored: true,
      useSceneNumbering: false,
      runtime: 60,
      tvdbId: 213921,
      tvRageId: 28165,
      tvMazeId: 5605,
      firstAired: '2011-01-25T05:00:00Z',
      seriesType: 'standard',
      cleanTitle: 'blackstone',
      imdbId: 'tt1699207',
      titleSlug: 'blackstone',
      genres: ['Drama'],
      tags: [],
      added: '0001-01-01T00:00:00Z',
      ratings: {
        votes: 62,
        value: 3.5,
      },
      qualityProfileId: 0,
    },
    {
      title: 'Black Lightning',
      sortTitle: 'black lightning',
      seasonCount: 4,
      status: 'ended',
      overview:
        'Jefferson Pierce, who retired from his superhero persona Black Lightning nine years ago after seeing the effects it had on his family, is forced to become a vigilante again when the rise of the local gang called the 100 leads to increased crime and corruption in his community of Freeland.',
      network: 'The CW',
      airTime: '21:00',
      images: [
        {
          coverType: 'banner',
          url: 'https://artworks.thetvdb.com/banners/graphical/332525-g5.jpg',
        },
        {
          coverType: 'poster',
          url: 'https://artworks.thetvdb.com/banners/series/332525/posters/60148635c9919.jpg',
        },
        {
          coverType: 'fanart',
          url: 'https://artworks.thetvdb.com/banners/fanart/original/332525-2.jpg',
        },
      ],
      remotePoster:
        'https://artworks.thetvdb.com/banners/series/332525/posters/60148635c9919.jpg',
      seasons: [
        {
          seasonNumber: 1,
          monitored: true,
        },
        {
          seasonNumber: 2,
          monitored: true,
        },
        {
          seasonNumber: 3,
          monitored: true,
        },
        {
          seasonNumber: 4,
          monitored: true,
        },
      ],
      year: 2018,
      profileId: 0,
      seasonFolder: false,
      monitored: true,
      useSceneNumbering: false,
      runtime: 42,
      tvdbId: 332525,
      tvRageId: 0,
      tvMazeId: 20683,
      firstAired: '2018-01-16T05:00:00Z',
      seriesType: 'standard',
      cleanTitle: 'blacklightning',
      imdbId: 'tt6045840',
      titleSlug: 'black-lightning',
      certification: 'TV-14',
      genres: ['Action', 'Drama', 'Science Fiction'],
      tags: [],
      added: '0001-01-01T00:00:00Z',
      ratings: {
        votes: 348,
        value: 8.3,
      },
      qualityProfileId: 0,
    },
    {
      title: 'The Blacklist: Redemption',
      sortTitle: 'blacklist redemption',
      seasonCount: 1,
      status: 'ended',
      overview:
        'Undercover operative Tom Keen joins forces with Susan "Scottie" Hargrave, the brilliant and cunning chief of Grey Matters, a covert mercenary organization that solves problems governments don’t dare touch. While on the hunt for Liz’s attacker, Tom secretly discovered that Scottie is actually his biological mother. Now, as they team up to employ their unique skills and resources in a dangerous world of deadly criminals, Tom begins his own covert mission to find out more about his shadowy past.',
      network: 'NBC',
      airTime: '22:00',
      images: [
        {
          coverType: 'banner',
          url: 'https://artworks.thetvdb.com/banners/graphical/311903-g4.jpg',
        },
        {
          coverType: 'poster',
          url: 'https://artworks.thetvdb.com/banners/posters/311903-5.jpg',
        },
        {
          coverType: 'fanart',
          url: 'https://artworks.thetvdb.com/banners/fanart/original/311903-6.jpg',
        },
      ],
      remotePoster: 'https://artworks.thetvdb.com/banners/posters/311903-5.jpg',
      seasons: [
        {
          seasonNumber: 1,
          monitored: true,
        },
      ],
      year: 2017,
      profileId: 0,
      seasonFolder: false,
      monitored: true,
      useSceneNumbering: false,
      runtime: 45,
      tvdbId: 311903,
      tvRageId: 0,
      tvMazeId: 17162,
      firstAired: '2017-02-23T05:00:00Z',
      seriesType: 'standard',
      cleanTitle: 'theblacklistredemption',
      imdbId: 'tt5592230',
      titleSlug: 'the-blacklist-redemption',
      certification: 'TV-14',
      genres: ['Crime', 'Drama'],
      tags: [],
      added: '0001-01-01T00:00:00Z',
      ratings: {
        votes: 332,
        value: 7.2,
      },
      qualityProfileId: 0,
    },
    {
      title: 'Boys from the Blackstuff',
      sortTitle: 'boys from blackstuff',
      seasonCount: 1,
      status: 'ended',
      overview:
        "Alan Bleasdale's five-part series relates the further experiences of unemployed Liverpudlian tarmac layers Dixie, Chrissie, Loggo and Yosser, and their revered older friend, retired longshoreman and union leader, George Malone. As they struggle to make ends meet in a depressed economy, and to hold together their financially battered families, they are harrassed by the petty bureaucrats of the DHSS. But the lumbering investigational juggernaut is, both comically and tragically, guided by drivers with only a provisional license.",
      network: 'BBC Two',
      images: [
        {
          coverType: 'banner',
          url: 'https://artworks.thetvdb.com/banners/graphical/78748-g.jpg',
        },
        {
          coverType: 'poster',
          url: 'https://artworks.thetvdb.com/banners/posters/78748-1.jpg',
        },
        {
          coverType: 'fanart',
          url: 'https://artworks.thetvdb.com/banners/series/78748/backgrounds/602728aedd804.jpg',
        },
      ],
      remotePoster: 'https://artworks.thetvdb.com/banners/posters/78748-1.jpg',
      seasons: [
        {
          seasonNumber: 0,
          monitored: false,
        },
        {
          seasonNumber: 1,
          monitored: true,
        },
      ],
      year: 1982,
      profileId: 0,
      seasonFolder: false,
      monitored: true,
      useSceneNumbering: false,
      runtime: 70,
      tvdbId: 78748,
      tvRageId: 0,
      tvMazeId: 16772,
      firstAired: '1982-10-10T04:00:00Z',
      seriesType: 'standard',
      cleanTitle: 'boysfromblackstuff',
      imdbId: 'tt0083689',
      titleSlug: 'boys-from-the-blackstuff',
      genres: ['Drama'],
      tags: [],
      added: '0001-01-01T00:00:00Z',
      ratings: {
        votes: 60,
        value: 9.5,
      },
      qualityProfileId: 0,
    },
    {
      title: 'The Octopus',
      sortTitle: 'octopus',
      seasonCount: 10,
      status: 'ended',
      overview:
        'First broadcast in Italy in 1984, The Octopus (La Piovra) is an international blockbuster, running 18 years and producing nine follow-up series. The title of this classic Mafia thriller says it all, evoking the image of a secret criminal culture extending its tentacles into every layer of society.',
      images: [
        {
          coverType: 'banner',
          url: 'https://artworks.thetvdb.com/banners/graphical/82709-g4.jpg',
        },
        {
          coverType: 'poster',
          url: 'https://artworks.thetvdb.com/banners/posters/82709-11.jpg',
        },
        {
          coverType: 'fanart',
          url: 'https://artworks.thetvdb.com/banners/fanart/original/82709-1.jpg',
        },
      ],
      remotePoster: 'https://artworks.thetvdb.com/banners/posters/82709-11.jpg',
      seasons: [
        {
          seasonNumber: 1,
          monitored: true,
        },
        {
          seasonNumber: 2,
          monitored: true,
        },
        {
          seasonNumber: 3,
          monitored: true,
        },
        {
          seasonNumber: 4,
          monitored: true,
        },
        {
          seasonNumber: 5,
          monitored: true,
        },
        {
          seasonNumber: 6,
          monitored: true,
        },
        {
          seasonNumber: 7,
          monitored: true,
        },
        {
          seasonNumber: 8,
          monitored: true,
        },
        {
          seasonNumber: 9,
          monitored: true,
        },
        {
          seasonNumber: 10,
          monitored: true,
        },
      ],
      year: 1984,
      profileId: 0,
      seasonFolder: false,
      monitored: true,
      useSceneNumbering: false,
      runtime: 65,
      tvdbId: 82709,
      tvRageId: 27645,
      tvMazeId: 36535,
      firstAired: '1984-03-11T05:00:00Z',
      seriesType: 'standard',
      cleanTitle: 'theoctopus',
      imdbId: 'tt0086779',
      titleSlug: 'the-octopus',
      genres: ['Crime', 'Drama'],
      tags: [],
      added: '0001-01-01T00:00:00Z',
      ratings: {
        votes: 111,
        value: 9.7,
      },
      qualityProfileId: 0,
    },
  ];

  form: FormGroup;

  private destroyed$ = new Subject<void>();

  // TODO:P - Maybe 2 search boxes, one for existing series and one for searching for new series

  constructor(
    private formBuilder: FormBuilder,
    private changeDetectorRef: ChangeDetectorRef,
    private sonarrApiService: SonarrApiService
  ) {
    const searchControl: FormControl = this.formBuilder.control(null);

    this.form = this.formBuilder.group({
      search: searchControl,
    });

    searchControl.valueChanges
      .pipe(debounceTime(400), takeUntil(this.destroyed$))
      .subscribe((searchText: string) => {
        this.search(searchText);
      });
  }

  ngOnDestroy(): void {
    this.destroyed$.next();
  }

  addClicked(item: AddEvent): void {
    this.sonarrApiService.add(item);
  }

  private search(searchText: string): void {
    this.sonarrApiService
      .lookUp(searchText)
      .pipe(takeUntil(this.destroyed$))
      .subscribe((value: Series[]) => {
        this.data = value;
        this.changeDetectorRef.markForCheck();
        console.log(this.data);
      });
  }
}
