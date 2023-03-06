type EventHandler<E = unknown> = (event: E) => void;

type MediaValues = Record<
  | 'aspect-ratio'
  | 'color-index'
  | 'color'
  | 'device-aspect-ratio'
  | 'device-height'
  | 'device-width'
  | 'grid'
  | 'height'
  | 'monochrome'
  | 'orientation'
  | 'resolution'
  | 'scan'
  | 'type'
  | 'width',
  unknown
>;

type MatchMediaChangeEvent = {
  matches: boolean;
  media: string;
};

declare module 'matchmediaquery' {
  declare class Mql {
    constructor(query: string, values?: Partial<MediaValues>, forceStatic?: boolean);
    addListener(listener: EventHandler<MatchMediaChangeEvent>): void;
    removeListener(listener: EventHandler<MatchMediaChangeEvent>): void;
    dispose(): void;
    matches: boolean;
    media: string;
  }

  declare function matchMedia(query: string, values?: Partial<MediaValues>, forceStatic?: boolean): Mql;
  export = matchMedia;
}
