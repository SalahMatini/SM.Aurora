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
        order: 10,
        layout: eLayoutType.application,
      },
      {
        path: '/bike-types',
        name: '::Menu:BikeTypes',
        iconClass: 'fas fa-bicycle',
        layout: eLayoutType.application,
        order: 15,
      },
      {
        path: '/bikes',
        name: '::Menu:Bikes',
        iconClass: 'fas fa-bicycle',
        layout: eLayoutType.application,
        order: 20,
        requiredPolicy: 'BikeShop.Bikes',
      },
      {
        path: '/customers',
        name: '::Menu:Customers',
        iconClass: 'fas fa-biking',
        layout: eLayoutType.application,
        order: 30,
        requiredPolicy: 'BikeShop.Customers',
      },
      {
        path: '/orders',
        name: '::Menu:Orders',
        iconClass: 'fas fa-clipboard-check',
        layout: eLayoutType.application,
        order: 40,
        requiredPolicy: 'BikeShop.Orders',
      },
    ]);
  };
}
