import Router from './utils/router';
import routes from './routes';
import addButtonsForMobile from './utils/addButtonsForMobile';

addButtonsForMobile();
new Router(routes);
