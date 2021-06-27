export interface CustomFeed {
  title: string;
}

export interface CustomItem {
  title: string;
  link: string;
  pubDate: Date;
}

export interface ProcessedFeed {
  title: string;
  items: CustomItem[];
  mostRecentPubDate: Date;
}

export interface CombinedFeeds {
  feeds: ProcessedFeed[];
  timeUpdated: string;
}
