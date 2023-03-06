import { reactive } from 'vue';
import matchMedia from 'matchmediaquery';
import type { DeviceQueries, DeviceQueryDefinitions } from '@/types/device-queries';

const em = (px: number) => `${px / 16}em`;

const mediaqueries: DeviceQueryDefinitions = {
  onlyPhoneSm: `(max-width: ${em(567)})`,
  phoneLg: `(min-width: ${em(568)})`,
  onlyPhone: `(max-width: ${em(739)})`,
  tablet: `(min-width: ${em(740)})`,
  onlyMobile: `(max-width: ${em(1023)})`,
  laptop: `(min-width: ${em(1024)})`,
  laptopLg: `(min-width: ${em(1160)})`,
  desktop: `(min-width: ${em(1360)})`,
  desktopLg: `(min-width: ${em(1440)})`,
  monitor: `(min-width: ${em(1680)})`,
  ultrawide: `(min-width: ${em(2032)})`,
};

const device = reactive<DeviceQueries>(
  Object.entries(mediaqueries).reduce((mqMap, [name, query]) => {
    const mq = matchMedia(query, { width: 1440 });

    mq.addListener(({ matches }) => {
      updateDevice(name, matches);
    });

    return { ...mqMap, [name]: mq.matches };
  }, {} as DeviceQueries)
);

function updateDevice(key: string, value: boolean) {
  device[key as keyof DeviceQueries] = value;
}

export function useDevice() {
  return { device };
}
