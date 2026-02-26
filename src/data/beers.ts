export interface Beer {
  id: number;
  name: string;
  type: string;
  descriptor: string;
  video: string;
}

export const beers: Beer[] = [
  { id: 1, name: 'Witbier', type: 'Craft Beer', descriptor: 'Belgian-style wheat', video: '/6 BEERS/WITBIER.mp4' },
  { id: 2, name: 'Indian Pale Lager', type: 'Bottle Beer', descriptor: 'Crisp & refreshing', video: '/6 BEERS/INDIAN PALE LAGER.mp4' },
  { id: 3, name: 'Hefeweizen', type: 'Craft Beer', descriptor: 'Bavarian wheat', video: '/6 BEERS/Hefeweizen.mp4' },
  { id: 4, name: 'Dunkel Weissbier', type: 'Craft Beer', descriptor: 'Dark wheat', video: '/6 BEERS/DUNKEL WEISSBIER.mp4' },
  { id: 5, name: 'Blonde Ale', type: 'Craft Beer', descriptor: 'Light & smooth', video: '/6 BEERS/BLONDE ALE.mp4' },
  { id: 6, name: 'American Adjutant Lager', type: 'Bottle Beer', descriptor: 'Classic lager', video: '/6 BEERS/AMERICAN ADJUTANT LAGER.mp4' },
];
