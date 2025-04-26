import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, DetachedRouteHandle, RouteReuseStrategy } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class CustomRouteReuseStrategy extends RouteReuseStrategy {
  private handlers: { [key: string]: DetachedRouteHandle | null } = {};

  public shouldDetach(route: ActivatedRouteSnapshot): boolean {
    // Define your logic to decide if the route should be detached
    return true; // Change this condition based on your needs
  }

  public store(route: ActivatedRouteSnapshot, detachedTree: DetachedRouteHandle | null): void {
    // Store the detached route handle for the specific route path
    this.handlers[route.routeConfig?.path as string] = detachedTree;
  }

  public shouldAttach(route: ActivatedRouteSnapshot): boolean {
    // Return true if there is a stored route handle for this route
    return !!this.handlers[route.routeConfig?.path as string];
  }

  public retrieve(route: ActivatedRouteSnapshot): DetachedRouteHandle | null {
    // Return the stored route handle if it exists
    return this.handlers[route.routeConfig?.path as string] || null;
  }

  public shouldReuseRoute(future: ActivatedRouteSnapshot, curr: ActivatedRouteSnapshot): boolean {
    // Check if the route should be reused
    return (future.routeConfig === curr.routeConfig) || future.data['reuse'];
  }
}