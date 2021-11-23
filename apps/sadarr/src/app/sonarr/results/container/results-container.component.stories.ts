import { ScrollingModule } from '@angular/cdk/scrolling';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { moduleMetadata, Story, Meta } from '@storybook/angular';
import { ResultsModule } from '../results.module';
import { ResultsContainerComponent } from './results-container.component';

export default {
  title: 'ResultsContainerComponent',
  component: ResultsContainerComponent,
  decorators: [
    moduleMetadata({
      imports: [
        BrowserAnimationsModule,
        CommonModule,
        ResultsModule,
        ScrollingModule,
      ],
    }),
  ],
} as Meta<ResultsContainerComponent>;

const Template: Story<ResultsContainerComponent> = (
  args: ResultsContainerComponent
) => ({
  component: ResultsContainerComponent,
  props: args,
});

export const Primary = Template.bind({});
Primary.args = {
  data: [
    {
      added: true,
      id: 1,
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
      monitored: true,
      network: 'NBC',
      overview:
        'Raymond “Red” Reddington, one of the FBI’s most wanted fugitives, surrenders in person at FBI Headquarters in Washington, D.C. He claims that he and the FBI have the same interests—bringing down dangerous criminals and terrorists. In the last two decades, he’s made a list of criminals and terrorists that matter the most but the FBI cannot find because it does not know they exist. Reddington calls this “The Blacklist.” Reddington will co-operate with the FBI, but insists that he will speak only to Elizabeth Keen, a rookie profiler.',
      profile: 7,
      rating: 87,
      remotePoster: 'https://artworks.thetvdb.com/banners/posters/266189-1.jpg',
      seasonCount: 9,
      seasons: [
        {
          seasonNumber: 1,
          monitored: false,
        },
        {
          seasonNumber: 2,
          monitored: false,
        },
        {
          seasonNumber: 3,
          monitored: false,
        },
        {
          seasonNumber: 4,
          monitored: false,
        },
        {
          seasonNumber: 5,
          monitored: false,
        },
        {
          seasonNumber: 6,
          monitored: false,
        },
        {
          seasonNumber: 7,
          monitored: false,
        },
        {
          seasonNumber: 8,
          monitored: false,
        },
        {
          seasonNumber: 9,
          monitored: true,
        },
      ],
      status: 'continuing',
      title: 'The Blacklist',
      titleSlug: 'the-blacklist',
      tvdbId: 266189,
      year: 2013,
    },
    {
      added: false,
      images: [
        {
          coverType: 'poster',
          url: 'https://artworks.thetvdb.com/banners/v4/series/394358/posters/61868a5b09422.jpg',
        },
        {
          coverType: 'fanart',
          url: 'https://artworks.thetvdb.com/banners/series/394358/backgrounds/5ff10ea4b62d1.jpg',
        },
      ],
      monitored: true,
      network: 'één',
      overview:
        'Together with young children, host Tom Waes, performs exciting activities and stunts.',
      profile: 0,
      rating: 0,
      remotePoster:
        'https://artworks.thetvdb.com/banners/v4/series/394358/posters/61868a5b09422.jpg',
      seasonCount: 2,
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
      status: 'ended',
      title: 'The Blacklist',
      titleSlug: 'the-blacklist',
      tvdbId: 394358,
      year: 2014,
    },
    {
      added: true,
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
      monitored: false,
      network: 'GMM One',
      overview:
        'After his sister goes missing, a young man is asked to join "Blacklist," a group of students who work together to stop the crimes and injustices in their school.',
      profile: 7,
      rating: 0,
      remotePoster:
        'https://artworks.thetvdb.com/banners/posters/5c3de8852c922.jpg',
      seasonCount: 1,
      seasons: [
        {
          seasonNumber: 1,
          monitored: false,
        },
      ],
      status: 'ended',
      title: 'Blacklist (2019)',
      titleSlug: 'blacklist-2019',
      tvdbId: 358213,
      year: 2019,
    },
    {
      added: false,
      images: [],
      monitored: true,
      overview:
        "Blacklisted is an award-winning NPR radio drama about the Hollywood Blacklist and one family's fifteen years in flight and under surveillance from the FBI during the Cold War. With an all-star cast including Stockard Channing, Carrol O'Connor, Ron Leibman, Eli Wallach, Jerry Stiller, Julie Harris, and John Randolph.",
      profile: 0,
      rating: 0,
      seasonCount: 1,
      seasons: [
        {
          seasonNumber: 1,
          monitored: true,
        },
      ],
      status: 'ended',
      title: 'Blacklisted',
      titleSlug: 'blacklisted',
      tvdbId: 373281,
      year: 0,
    },
    {
      added: false,
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
      monitored: true,
      network: 'ABC (US)',
      overview:
        'An upper-middle-class black man struggles to raise his children with a sense of cultural identity despite constant contradictions and obstacles coming from his liberal wife, old-school father and his assimilated, color-blind kids.',
      profile: 0,
      rating: 81,
      remotePoster: 'https://artworks.thetvdb.com/banners/posters/281511-1.jpg',
      seasonCount: 8,
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
      ],
      status: 'continuing',
      title: 'black-ish',
      titleSlug: 'black-ish',
      tvdbId: 281511,
      year: 2014,
    },
    {
      added: false,
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
      monitored: true,
      network: 'CBS',
      overview:
        "Astronaut John Blackstar's shuttle passes through a black hole and crashes on the planet Sagar. He is rescued by the gentle Trobbits who live under the tyranny of the evil Overlord who possesses the Power Sword. John Blackstar then possesses the Star Sword. When the two weapons are combined, they form the Power Star, the most powerful weapon imaginable. Blackstar aids the Trobbits' resistance with his dragon Warlock, Klone the Shape-Shifter, Storm the Amazon, and Mara the Sorceress in the battle against Overlord.",
      profile: 0,
      rating: 90,
      remotePoster: 'https://artworks.thetvdb.com/banners/posters/78682-4.jpg',
      seasonCount: 1,
      seasons: [
        {
          seasonNumber: 1,
          monitored: true,
        },
      ],
      status: 'ended',
      title: 'Blackstar',
      titleSlug: 'blackstar',
      tvdbId: 78682,
      year: 1981,
    },
    {
      added: false,
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
      monitored: true,
      network: 'Showcase (CA)',
      overview:
        'Intense, compelling and confrontational, Blackstone is an unmuted exploration of First Nations’ power and politics, unfolding over nine one-hour episodes. This raw, authentic drama tells the story of the fictional Blackstone First Nation, suffering disintegration by its own hand – the result of the corruption of its Chief and Council. From within the community, a new generation of leaders rise up and fight to create lasting and substantial change.',
      profile: 0,
      rating: 35,
      remotePoster: 'https://artworks.thetvdb.com/banners/posters/213921-2.jpg',
      seasonCount: 5,
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
      ],
      status: 'ended',
      title: 'Blackstone',
      titleSlug: 'blackstone',
      tvdbId: 213921,
      year: 2011,
    },
    {
      added: false,
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
      monitored: true,
      network: 'The CW',
      overview:
        'Jefferson Pierce, who retired from his superhero persona Black Lightning nine years ago after seeing the effects it had on his family, is forced to become a vigilante again when the rise of the local gang called the 100 leads to increased crime and corruption in his community of Freeland.',
      profile: 0,
      rating: 83,
      remotePoster:
        'https://artworks.thetvdb.com/banners/series/332525/posters/60148635c9919.jpg',
      seasonCount: 4,
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
      status: 'ended',
      title: 'Black Lightning',
      titleSlug: 'black-lightning',
      tvdbId: 332525,
      year: 2018,
    },
    {
      added: false,
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
      monitored: true,
      network: 'NBC',
      overview:
        'Undercover operative Tom Keen joins forces with Susan "Scottie" Hargrave, the brilliant and cunning chief of Grey Matters, a covert mercenary organization that solves problems governments don’t dare touch. While on the hunt for Liz’s attacker, Tom secretly discovered that Scottie is actually his biological mother. Now, as they team up to employ their unique skills and resources in a dangerous world of deadly criminals, Tom begins his own covert mission to find out more about his shadowy past.',
      profile: 0,
      rating: 72,
      remotePoster: 'https://artworks.thetvdb.com/banners/posters/311903-5.jpg',
      seasonCount: 1,
      seasons: [
        {
          seasonNumber: 1,
          monitored: true,
        },
      ],
      status: 'ended',
      title: 'The Blacklist: Redemption',
      titleSlug: 'the-blacklist-redemption',
      tvdbId: 311903,
      year: 2017,
    },
    {
      added: false,
      images: [],
      monitored: true,
      network: 'ZDF',
      overview:
        'After the invention of printing and the spread of the Reformation, the Vatican tried to regain sovereignty over the interpretation of knowledge. In the 16th century the Index Congregation was founded, which was supposed to check all books for heretical ideas. It created the Index librorum prohibitorum, the list of forbidden books. The journalist Wolf von Lojewski and the church historian Hubert Wolf also devote themselves to the European intellectual history of the 19th and 20th centuries.',
      profile: 0,
      rating: 0,
      seasonCount: 1,
      seasons: [
        {
          seasonNumber: 1,
          monitored: true,
        },
      ],
      status: 'ended',
      title: 'Index-The Vatican Black List',
      titleSlug: 'index-the-vatican-black-list',
      tvdbId: 367452,
      year: 2009,
    },
    {
      added: false,
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
      monitored: true,
      network: 'BBC Two',
      overview:
        "Alan Bleasdale's five-part series relates the further experiences of unemployed Liverpudlian tarmac layers Dixie, Chrissie, Loggo and Yosser, and their revered older friend, retired longshoreman and union leader, George Malone. As they struggle to make ends meet in a depressed economy, and to hold together their financially battered families, they are harrassed by the petty bureaucrats of the DHSS. But the lumbering investigational juggernaut is, both comically and tragically, guided by drivers with only a provisional license.",
      profile: 0,
      rating: 95,
      remotePoster: 'https://artworks.thetvdb.com/banners/posters/78748-1.jpg',
      seasonCount: 1,
      seasons: [
        {
          seasonNumber: 1,
          monitored: true,
        },
      ],
      status: 'ended',
      title: 'Boys from the Blackstuff',
      titleSlug: 'boys-from-the-blackstuff',
      tvdbId: 78748,
      year: 1982,
    },
    {
      added: false,
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
      monitored: true,
      overview:
        'First broadcast in Italy in 1984, The Octopus (La Piovra) is an international blockbuster, running 18 years and producing nine follow-up series. The title of this classic Mafia thriller says it all, evoking the image of a secret criminal culture extending its tentacles into every layer of society.',
      profile: 0,
      rating: 97,
      remotePoster: 'https://artworks.thetvdb.com/banners/posters/82709-11.jpg',
      seasonCount: 10,
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
      status: 'ended',
      title: 'The Octopus',
      titleSlug: 'the-octopus',
      tvdbId: 82709,
      year: 1984,
    },
  ],
  showNoResultsFound: false,
  profiles: [
    {
      name: '720p',
      id: 3,
    },
    {
      name: '1080p',
      id: 4,
    },
    {
      name: '1080p/720p',
      id: 7,
    },
    {
      name: 'Any',
      id: 8,
    },
    {
      name: 'DVD',
      id: 9,
    },
  ],
};
