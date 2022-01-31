import * as events from './events';
import * as timeago from './timeago';
import * as navs from './navlinks';

navs.init();
timeago.init();

events.focus();
events.mobile();
events.dropdowns();
