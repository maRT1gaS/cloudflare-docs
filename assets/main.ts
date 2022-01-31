import * as events from './events';
import * as timeago from './timeago';
import * as navs from './navlinks';

navs.init();
timeago.init();

events.mobile();
