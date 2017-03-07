import createPrefixer from 'inline-style-prefixer/dynamic/createPrefixer';

import cursor from 'inline-style-prefixer/dynamic/plugins/cursor';
import crossFade from 'inline-style-prefixer/dynamic/plugins/crossFade';
import filter from 'inline-style-prefixer/dynamic/plugins/filter';
import flex from 'inline-style-prefixer/dynamic/plugins/flex';
import flexboxOld from 'inline-style-prefixer/dynamic/plugins/flexboxOld';
import gradient from 'inline-style-prefixer/dynamic/plugins/gradient';
import imageSet from 'inline-style-prefixer/dynamic/plugins/imageSet';
import position from 'inline-style-prefixer/dynamic/plugins/position';
import sizing from 'inline-style-prefixer/dynamic/plugins/sizing';
import transition from 'inline-style-prefixer/dynamic/plugins/transition';

import prefixAll from 'inline-style-prefixer/static';
import dynamicData from 'inline-style-prefixer/dynamic/dynamicData';

const plugins = [
  crossFade,
  cursor,
  filter,
  flexboxOld,
  gradient,
  imageSet,
  position,
  sizing,
  transition,
  flex,
];

const Prefixer = createPrefixer(
  {
    prefixMap: dynamicData.prefixMap,
    plugins,
  },
  prefixAll
);

export default Prefixer;
