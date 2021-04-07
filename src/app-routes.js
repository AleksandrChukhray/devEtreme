import {withNavigationWatcher} from './contexts/navigation';
import {HomePage, PlanetsPage, PlanetPage, CreaturePage, CreaturesPage} from './pages';

const routes = [
    {
        path: '/home',
        component: HomePage
    },
    {
        path: '/planets',
        component: PlanetsPage
    },
    {
        path: '/planets/:id',
        component: PlanetPage
    },
    {
        path: '/creatures',
        component: CreaturesPage
    },
    {
        path: '/creatures/:id',
        component: CreaturePage
    }
];

export default routes.map(route => {
    return {
        ...route,
        component: withNavigationWatcher(route.component)
    };
});
