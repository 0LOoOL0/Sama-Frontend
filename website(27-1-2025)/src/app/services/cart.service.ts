import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { from, Observable, throwError, of } from 'rxjs';
import { environment } from '../../environments/environment';
import axios from 'axios';
import { map, catchError, switchMap } from 'rxjs/operators'; 
import { UserAuthService } from './user-auth.service';
import { Product, ProductService } from './product.service';
import { BehaviorSubject } from 'rxjs';
export interface Cart {
  id: number;
  pet_owner_id?: number;
  product_id?: number;
  pet_id?: number;
  quantity: number;
  selectedPetId?: number;  // Optional
  selectedPetName?: string;
}

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private apiUrl = `${environment.apiUrl}/api/carts`;
  
  private totalAmountSource = new BehaviorSubject<number>(0);
  currentTotalAmount = this.totalAmountSource.asObservable();

  updateTotalAmount(amount: number) {
    this.totalAmountSource.next(amount);
  }
  
  constructor(private http: HttpClient, private authService: UserAuthService, private productService: ProductService) {
    axios.interceptors.request.use(
      config => {
        const token = localStorage.getItem('token'); // Retrieve the token from storage
        if (token) {
          // Initialize headers if they are undefined
          config.headers = config.headers || {};
          config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
      },
      error => {
        return Promise.reject(error);
      }
    );
    
  }

  // Fetch all carts
  getCarts(): Observable<Cart[]> {
    return from(axios.get<Cart[]>(this.apiUrl)).pipe(
      map(response => response.data),
    );
  }

  // Fetch a single cart by id
  getCartById(id: number): Observable<Cart> {
    return from(axios.get<Cart>(`${this.apiUrl}/${id}`)).pipe(
      map(response => response.data),
    );
  }

  // Create a new cart
  createCart(cart: Cart): Observable<Cart> {
    return from(axios.post<Cart>(this.apiUrl, cart)).pipe(
      map(response => response.data),
    );
  } 

  // Update an existing cart
  updateCart(id: number, cart: Cart): Observable<Cart> {
    if (cart.product_id === undefined || cart.product_id === null) {
      // Handle the case where product_id is missing
      return throwError(() => new Error('Product ID is not available.'));
    }
    return this.productService.getProductById(cart.product_id).pipe(
      switchMap((product: Product) => {
        // Check if the product name is "collar"
        if (product.name.toLowerCase() === 'collar') {
          // Create a new cart if the product is a collar
          return this.createCart(cart);
        } else {
          // Otherwise, update the existing cart
          return from(axios.put<Cart>(`${this.apiUrl}/${id}`, cart)).pipe(
            map(response => response.data)
          );
        }
      }),
      catchError(error => {
        console.error('Error in updateCart:', error);
        return throwError(() => new Error('Error updating cart'));
      })
    );
  }

  // Delete a cart
  deleteCart(id: number): Observable<void> {
    return from(axios.delete(`${this.apiUrl}/${id}`)).pipe(
      map(() => undefined)  // Return undefined to match Observable<void>
    );
  }
  

  getCartsByPetOwnerId(petOwnerId: number): Observable<Cart[]> {
    return from(
      axios.get<Cart[]>(`${this.apiUrl}/pet_owner/${petOwnerId}`),
    ).pipe(map(response => response.data));
  }
  isProductInCart(petOwnerId: number, productId: number | undefined): Observable<boolean> {

  return this.getCartsByPetOwnerId(petOwnerId).pipe(
    switchMap(carts => {
      const cart = carts.find(cart => cart.product_id === productId);

      if (!cart) {
        return of(false);
      }
      
      if (cart.product_id === undefined || cart.product_id === null) {
        // Handle the case where product_id is missing
        return throwError(() => new Error('Product ID is not available.'));
      }
      
      return this.productService.getProductById(cart.product_id).pipe(
        map((product: Product) => {
          if (product.name.toLowerCase() === 'collar') {
            return false;
          }

          return carts.some(cart => cart.product_id === productId);
        }),
      );
    }),
    catchError(error => {
      console.error('Error checking if product is in cart:', error);
      return of(false);
    })
  );
  }
  toggleCartItem(product: Product, quantity: number): Promise<void> {
    return this.authService.fetchProfileData().then(profile => {
      const petOwnerId = profile.id;
      return new Promise((resolve, reject) => {
        this.isProductInCart(petOwnerId, product.id).subscribe(isInCart => {
          if (isInCart) {
            // Update the cart by increasing the quantity
            this.getCartsByPetOwnerId(petOwnerId).subscribe(cartItems => {
              const cartItemToUpdate = cartItems.find(
                cart => cart.product_id === product.id
              );
              if (cartItemToUpdate && cartItemToUpdate.id !== undefined) {
                const updatedCart: Cart = {
                  ...cartItemToUpdate,
                  quantity: cartItemToUpdate.quantity + quantity, // Increase quantity
                };
                this.updateCart(cartItemToUpdate.id, updatedCart).subscribe(
                  () => {
                    console.log('Cart quantity updated');
                    resolve();
                  },
                  error => {
                    console.error('Error updating cart quantity:', error);
                    reject(error);
                  }
                );
              } else {
                console.error(
                  'Cart item not found to update or ID is undefined'
                );
                reject('Cart item not found or ID is undefined');
              }
            });
          } else {
            // Add a new item to the cart
            const cart: Cart = {
              id: 0,
              pet_owner_id: petOwnerId,
              product_id: product.id,
              quantity: quantity,
            };
            this.createCart(cart).subscribe(
              () => {
                product.isInCart = true;
                console.log('Added to cart');
                resolve();
              },
              error => {
                console.error('Error adding to cart:', error);
                reject(error);
              }
            );
          }
        });
      });
    });
  }  
}
