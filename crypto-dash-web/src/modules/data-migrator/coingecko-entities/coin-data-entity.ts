export interface CoinDataEntity {
  id: string;
  symbol: string;
  name: string;
  web_slug: string;
  asset_platform_id: null;
  platforms: Platforms;
  detail_platforms: DetailPlatforms;
  block_time_in_minutes: number;
  hashing_algorithm: string;
  categories: string[];
  preview_listing: boolean;
  public_notice: null;
  additional_notices: any[];
  has_supply_breakdown: boolean;
  description: Description;
  links: Links;
  image: Image;
  country_origin: string;
  genesis_date: string;
  sentiment_votes_up_percentage: number;
  sentiment_votes_down_percentage: number;
  watchlist_portfolio_users: number;
  market_cap_rank: number;
  market_cap_rank_with_rehypothecated: number;
  status_updates: any[];
  last_updated: string;
  market_data: MarketData;
  community_data: CommunityData;
  developer_data: DeveloperData;
  tickers: Ticker[];
}

interface Ticker {
  base: string;
  target: string;
  market: Market;
  last: number;
  volume: number;
  converted_last: ConvertedLast;
  converted_volume: ConvertedLast;
  trust_score: null;
  bid_ask_spread_percentage: number;
  timestamp: string;
  last_traded_at: string;
  last_fetch_at: string;
  is_anomaly: boolean;
  is_stale: boolean;
  trade_url: string;
  token_info_url: null;
  coin_id: string;
  target_coin_id: string;
  coin_mcap_usd: number;
}

interface ConvertedLast {
  btc: number;
  eth: number;
  usd: number;
}

interface Market {
  name: string;
  identifier: string;
  has_trading_incentive: boolean;
}

interface DeveloperData {
  forks: number;
  stars: number;
  subscribers: number;
  total_issues: number;
  closed_issues: number;
  pull_requests_merged: number;
  pull_request_contributors: number;
  code_additions_deletions_4_weeks: CodeAdditionsDeletions4Weeks;
  commit_count_4_weeks: number;
  last_4_weeks_commit_activity_series: number[];
}

interface CodeAdditionsDeletions4Weeks {
  additions: number;
  deletions: number;
}

interface CommunityData {
  facebook_likes: null;
  reddit_average_posts_48h: number;
  reddit_average_comments_48h: number;
  reddit_subscribers: number;
  reddit_accounts_active_48h: number;
  telegram_channel_user_count: null;
}

interface MarketData {
  current_price: CurrentPrice;
  total_value_locked: null;
  mcap_to_tvl_ratio: null;
  fdv_to_tvl_ratio: null;
  roi: null;
  ath: CurrentPrice;
  ath_change_percentage: CurrentPrice;
  ath_date: AthDate;
  atl: CurrentPrice;
  atl_change_percentage: CurrentPrice;
  atl_date: AthDate;
  market_cap: CurrentPrice;
  fully_diluted_valuation: CurrentPrice;
  market_cap_fdv_ratio: number;
  market_cap_rank: number;
  outstanding_token_value_usd: null;
  market_cap_rank_with_rehypothecated: number;
  total_volume: CurrentPrice;
  high_24h: CurrentPrice;
  low_24h: CurrentPrice;
  price_change_24h: number;
  price_change_percentage_24h: number;
  price_change_percentage_7d: number;
  price_change_percentage_14d: number;
  price_change_percentage_30d: number;
  price_change_percentage_60d: number;
  price_change_percentage_200d: number;
  price_change_percentage_1y: number;
  market_cap_change_24h: number;
  market_cap_change_percentage_24h: number;
  price_change_24h_in_currency: CurrentPrice;
  price_change_percentage_1h_in_currency: CurrentPrice;
  price_change_percentage_24h_in_currency: CurrentPrice;
  price_change_percentage_7d_in_currency: CurrentPrice;
  price_change_percentage_14d_in_currency: CurrentPrice;
  price_change_percentage_30d_in_currency: CurrentPrice;
  price_change_percentage_60d_in_currency: CurrentPrice;
  price_change_percentage_200d_in_currency: CurrentPrice;
  price_change_percentage_1y_in_currency: CurrentPrice;
  market_cap_change_24h_in_currency: CurrentPrice;
  market_cap_change_percentage_24h_in_currency: CurrentPrice;
  total_supply: number;
  max_supply: number;
  max_supply_infinite: boolean;
  circulating_supply: number;
  outstanding_supply: null;
  last_updated: string;
}

interface AthDate {
  btc: string;
  eur: string;
  usd: string;
}

interface CurrentPrice {
  btc: number;
  eur: number;
  usd: number;
}

interface Image {
  thumb: string;
  small: string;
  large: string;
}

interface Links {
  homepage: string[];
  whitepaper: string;
  blockchain_site: string[];
  official_forum_url: string[];
  chat_url: string[];
  announcement_url: string[];
  snapshot_url: null;
  twitter_screen_name: string;
  facebook_username: string;
  bitcointalk_thread_identifier: null;
  telegram_channel_identifier: string;
  subreddit_url: string;
  repos_url: ReposUrl;
}

interface ReposUrl {
  github: string[];
  bitbucket: any[];
}

interface Description {
  en: string;
}

interface DetailPlatforms {
  '': _;
}

interface _ {
  decimal_place: null;
  contract_address: string;
}

interface Platforms {
  '': string;
}
