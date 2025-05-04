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
  styleUrl: './shopping-bag.component.css'
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
  pets:any;

  constructor(
    private cartService: CartService,
    private productService: ProductService,
    private authService: UserAuthService,
    private router: Router,
    private petInfoService: PetinfoService,
  ) {}

  goToCheckOut(){
    const selectedItems = this.items.filter(item => item.selected).map(item => ({
      provider_id: item.provider_id,
      product_id: item.product_id,
      product_name: item.name,
      amount: item.quantity,
      price: item.price,
      id: item.id,
      pet_id: item.pet_id
    }));
    localStorage.setItem('checkoutProducts', JSON.stringify(selectedItems));
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
      await this.cartService.updateCart(item.id, {
        ...item,
        quantity: item.quantity
      }).toPromise();
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
    // if (this.totalPrice === 0) {
    //   const alert = await this.alertController.create({
    //     header: 'Alert',
    //     message: 'Your total is zero. Please add items to your cart before checking out.',
    //     buttons: ['OK'],
    //   });
    //   await alert.present();
    // } else {
    //   this.router.navigate(['/check-out', this.totalPrice]);
    // }
  }
  
  // Call the updateCart service method, ensuring that updatedCart is of type Cart
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

  // Add this method to get the total price
  getTotalPrice(): number {
    if (this.selectedItemsCount === 0) return 0;
    return this.totalPrice;
  }

  async deleteCartItem(item: any) {
    try {
      const cartItemToDelete = await this.findCartItem(item.product_id);
      if (cartItemToDelete) {
        await this.cartService.deleteCart(cartItemToDelete.id).toPromise();
        await this.loadCartItems();
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
      const petOwnerId = this.profile.id;

      const carts = await this.cartService.getCartsByPetOwnerId(petOwnerId).toPromise();
      if (!carts?.length) {
        this.items = [];
        return;
      }

      const products = await Promise.all(
        carts.map(cart => this.getProduct(cart.product_id)),
      );
      this.pets = await Promise.all(carts.map(cart => cart.pet_id));
      this.items = this.mergeCartWithProducts(carts, products);
      this.calculateTotal();
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
    const selectedItems = this.items.filter(item => item.selected);
    const totalWithoutDiscount = selectedItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
    
    const subtotal = totalWithoutDiscount ;

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