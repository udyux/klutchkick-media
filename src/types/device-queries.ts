enum Devices {
  OnlyPhoneSm = 'onlyPhoneSm',
  PhoneLg = 'phoneLg',
  OnlyPhone = 'onlyPhone',
  Tablet = 'tablet',
  OnlyMobile = 'onlyMobile',
  Laptop = 'laptop',
  LaptopLg = 'laptopLg',
  Desktop = 'desktop',
  DesktopLg = 'desktopLg',
  Monitor = 'monitor',
  Ultrawide = 'ultrawide',
}

export type DeviceQueries = Record<Devices, boolean>;

export type DeviceQueryDefinitions = Record<Devices, string>;
