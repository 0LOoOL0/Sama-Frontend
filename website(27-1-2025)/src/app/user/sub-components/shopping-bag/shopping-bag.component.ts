import { Component } from '@angular/core';
import { Cart, CartService } from '../../../services/cart.service';
import { ProductService } from '../../../services/product.service';
import { UserAuthService } from '../../../services/user-auth.service';
import { Router } from '@angular/router';
import { PetinfoService } from '../../../services/petinfo.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NavbarComponent } from '../navbar/navbar.component';

@Component({
  selector: 'app-shopping-bag',
  standalone: true,
  imports: [CommonModule, FormsModule, NavbarComponent],
  templateUrl: './shopping-bag.component.html',
  styleUrls: ['./shopping-bag.component.css']
})
export class ShoppingBagComponent {

  items: any[] = [];
  selectAll: boolean = false;
  isMember: boolean = false;
  discountRate: number = 0.1;
  totalPrice: number = 0.0;
  savedPrice: number = 0.0;
  selectedItemsCount: number = 0;
  currentItem: any;
  total: any;
  profile: any;
  pets: any;

  constructor(
    private cartService: CartService,
    private productService: ProductService,
    private authService: UserAuthService,
    private router: Router,
    private petInfoService: PetinfoService,
  ) {}


  
  goToCheckOut() {
    // If a temporary cart exists (membership package), use that data.
    const tempCart = localStorage.getItem('tempCart');
    if (tempCart) {
      localStorage.setItem('checkoutProducts', tempCart);
    } else {
      // Otherwise, use the selected items from the loaded cart items.
      const selectedItems = this.items.filter(item => item.selected).map(item => ({
        provider_id: item.provider_id,
        product_id: item.product_id,
        product_name: item.label,
        quantity: item.quantity,
        price: item.price,
        id: item.id,
        pet_id: item.pet_id
      }));
      localStorage.setItem('checkoutProducts', JSON.stringify(selectedItems));
    }
    this.cartService.updateTotalAmount(this.totalPrice);
    this.router.navigate(['/user-main-component/checkout']);
  }

  async incrementQuantity(item: any) {
    if (item.quantity < item.maxQuantity) {
      item.quantity++;
      await this.updateCartItem(item);
      this.calculateTotal();
    }
  }

  async decrementQuantity(item: any) {
    if (item.quantity > 1) {
      item.quantity--;
      await this.updateCartItem(item);
      this.calculateTotal();
    }
  }

  async onQuantityChange(item: any, event: any) {
    const newQuantity = event.target.value;
    item.quantity = Math.min(Math.max(newQuantity, 1), item.maxQuantity);
    await this.updateCartItem(item);
    this.calculateTotal();
  }

  async updateCartItem(item: any) {
    try {
      // For temporary membership items (which have no id), skip updating.
      if (!item.id) {
        console.log('Temporary item; no update needed.');
        return;
      }
      await this.cartService.updateCart(item.id, { ...item, quantity: item.quantity }).toPromise();
      console.log('Cart updated successfully');
    } catch (error) {
      console.error('Error updating cart:', error);
    }
  }

  async deleteSelectedItems() {
    try {
      const selectedItems = this.items.filter(item => item.selected);
      if (!selectedItems.length) return;
      await Promise.all(selectedItems.map(item => this.deleteCartItem(item)));
      await this.loadCartItems();
    } catch (error) {
      console.error('Error removing selected items from cart:', error);
    }
  }
  
  get isCartEmpty(): boolean {
    return !this.items.length;
  }

  async checkout() {
    // Additional validations can be added here.
  }
  
  // Call the updateCart service method, ensuring that updatedCart is of type Cart.
  updateCart(cartId: number, updatedCart: Cart) {
    this.cartService.updateCart(cartId, updatedCart).subscribe(
      (response: any) => {
        console.log('Cart updated successfully', response);
      },
      (error: any) => {
        console.error('Error updating cart:', error);
      }
    );
  }

  // Returns the total price. (If no items are selected, returns zero.)
  getTotalPrice(): number {
    if (this.selectedItemsCount === 0) return 0;
    return this.totalPrice;
  }

  async deleteCartItem(item: any) {
    try {
      const tempCartRaw = localStorage.getItem('tempCart');
  
      if (tempCartRaw) {
        const tempCart = JSON.parse(tempCartRaw);
  
        // If it's a membership-style cart (with `package`), just clear it
        if (tempCart.package) {
          localStorage.removeItem('tempCart');
        }
  
        // If it's an array (product-style cart from discount-details)
        else if (Array.isArray(tempCart)) {
          const updatedCart = tempCart.filter((cartItem: any) => cartItem.product_id !== item.product_id);
          if (updatedCart.length > 0) {
            localStorage.setItem('tempCart', JSON.stringify(updatedCart));
          } else {
            localStorage.removeItem('tempCart');
          }
        }
  
        // Fallback for single-object cart (legacy single product)
        else if (tempCart.product_id === item.product_id) {
          localStorage.removeItem('tempCart');
        }
  
        await this.loadCartItems(); // Refresh cart display
        alert('🗑️ Item removed from your cart.');
      } else {
        // Fallback: try removing from backend cart (if logged-in user)
        const cartItemToDelete = await this.findCartItem(item.product_id);
        if (cartItemToDelete) {
          await this.cartService.deleteCart(cartItemToDelete.id).toPromise();
          await this.loadCartItems();
          alert('🗑️ Item removed from your cart.');
        }
      }
    } catch (error) {
      console.error('Error removing item from cart:', error);
    }
  }
  

  async findCartItem(productId: number) {
    const petOwnerId = this.profile.id;
    const cartItems = await this.cartService.getCartsByPetOwnerId(petOwnerId).toPromise();
    return cartItems?.find((cart: { product_id?: number; }) => cart.product_id === productId) || null;
  }

  async ngOnInit() {
    await this.fetchUserProfile();
    await this.loadCartItems();
  }

  async fetchUserProfile() {
    try {
      this.profile = await this.authService.fetchProfileData();
    } catch (error) {
      console.error('Error fetching user profile:', error);
    }
  }

  async loadCartItems() {
    try {
      const tempCartRaw = localStorage.getItem('tempCart');
  
      if (tempCartRaw) {
        const tempCart = JSON.parse(tempCartRaw);
  
        // 🟢 Membership-style cart (single object with a `package`)
        if (tempCart.package) {
          this.items = [{
            pet_owner_id: tempCart.pet_owner_id,
            pet_ids: tempCart.pet_ids,
            quantity: tempCart.quantity,
            maxQuantity: tempCart.quantity,
            imageUrl: tempCart.package.imageUrl || 'assets/default-image.png',
            label: tempCart.package.name,
            price: tempCart.package.price,
            selected: true
          }];
        }
        // 🟢 Product-style cart (multiple cart items in array)
        else if (Array.isArray(tempCart)) {
          this.items = tempCart.map((item: any) => ({
            product_id: item.product_id,
            provider_id: item.provider_id,
            quantity: item.quantity,
            maxQuantity: item.maxQuantity || 10,
            imageUrl: item.imageUrl || 'assets/default-image.png',
            label: item.label || 'Unnamed Product',
            price: item.price || 0,
            selected: true
          }));
        }
        // 🟡 Fallback for legacy single product object (non-package)
        else {
          this.items = [{
            product_id: tempCart.product_id,
            provider_id: tempCart.provider_id,
            quantity: tempCart.quantity,
            maxQuantity: tempCart.maxQuantity || 10,
            imageUrl: tempCart.imageUrl || 'assets/default-image.png',
            label: tempCart.label || 'Unnamed Product',
            price: tempCart.price || 0,
            selected: true
          }];
        }
  
        this.calculateTotal();
      } else {
        // 🟢 Fallback: Load from backend if no tempCart exists
        const petOwnerId = this.profile.id;
        const carts = await this.cartService.getCartsByPetOwnerId(petOwnerId).toPromise();
  
        if (!carts?.length) {
          this.items = [];
          return;
        }
  
        const products = await Promise.all(
          carts.map(cart => this.getProduct(cart.product_id))
        );
        this.pets = await Promise.all(carts.map(cart => cart.pet_id));
  
        this.items = this.mergeCartWithProducts(carts, products);
        this.calculateTotal();
      }
    } catch (error) {
      console.error('Error fetching cart items:', error);
    }
  }
  
  
  

  async getProduct(productId: number | undefined) {
    return productId ? this.productService.getProductById(productId).toPromise() : null;
  }

  mergeCartWithProducts(carts: any[], products: any[]) {
    return carts.map((cart, index) => ({
      ...cart,
      maxQuantity: products[index]?.quantity || 10,
      imageUrl: products[index]?.images?.[0] || 'assets/default-image.png',
      label: products[index]?.name || 'Unknown Product',
      price: this.isMember ? products[index]?.new_price : products[index]?.old_price,
    }));
  }

  calculateTotal() {
    // Only items that are "selected" are used to compute the total.
    const selectedItems = this.items.filter(item => item.selected);
    const totalWithoutDiscount = selectedItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const subtotal = totalWithoutDiscount;
    if (this.isMember) {
      this.totalPrice = subtotal * (1 - this.discountRate);
      this.savedPrice = subtotal * this.discountRate;
    } else {
      this.totalPrice = subtotal;
      this.savedPrice = 0.0;
    }
    this.updateSelectedItemsCount();
  }

  updateSelectedItemsCount() {
    const regularItemsCount = this.items.filter(item => item.selected).length;
    this.selectedItemsCount = regularItemsCount;
  }

  selectAllItems(event: any) {
    const isChecked = event.target.checked;
    this.items.forEach(item => item.selected = isChecked);
    this.selectAll = isChecked;
    this.updatePageInfo();
  }

  updatePageInfo() {
    this.selectAll = this.items.every(item => item.selected);
    this.calculateTotal();
  }
}
