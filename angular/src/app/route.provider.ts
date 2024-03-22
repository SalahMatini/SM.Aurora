import { RoutesService, eLayoutType } from '@abp/ng.core';
import { APP_INITIALIZER } from '@angular/core';

export const APP_ROUTE_PROVIDER = [
  { provide: APP_INITIALIZER, useFactory: configureRoutes, deps: [RoutesService], multi: true },
];

function configureRoutes(routesService: RoutesService) {
  return () => {
    routesService.add([
      {
        path: '/',
        name: '::Menu:Home',
        iconClass: 'fas fa-home',
        order: 1,
        layout: eLayoutType.application,
      },
      {
        path: '/bike-shop',
        name: '::Menu:BikeShop',
        iconClass: 'fas fa-store',
        order: 2,
        layout: eLayoutType.application,
      },
      {
        path: '/bikes',
        name: '::Menu:Bikes',
        iconClass: 'fas fa-bicycle',
        parentName: '::Menu:BikeShop',
        layout: eLayoutType.application,
        requiredPolicy: 'BikeShop.Bikes',
      },
      {
        path: '/customers',
        name: '::Menu:Customers',
        iconClass: 'fas fa-biking',
        parentName: '::Menu:BikeShop',
        layout: eLayoutType.application,
        requiredPolicy: 'BikeShop.Customers',
      },
    ]);
  };
}
