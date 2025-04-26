import { Component, OnInit, ViewChild } from '@angular/core';
import { CartService, Cart } from '../services/cart.service';
import { IonModal } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../services/product.service';
import { AuthService } from '../services/auth.service';
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { PetInfoService } from '../services/pet-info.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.page.html',
  styleUrls: ['./cart.page.scss'],
})
export class CartPage implements OnInit {
  @ViewChild('petModal') petModal: IonModal | undefined;

  items: any[] = [];
  selectAll: boolean = false;
  isMember: boolean = false;
  discountRate: number = 0.1;
  pets: any[] = [];
  totalPrice: number = 0.0;
  savedPrice: number = 0.0;
  selectedItemsCount: number = 0;
  selectedPetId: number | null = null;
  currentItem: any;

  constructor(
    private cartService: CartService,
    private productService: ProductService,
    private authService: AuthService,
    private toastController: ToastController,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private alertController: AlertController,
    private petInfoService: PetInfoService,
  ) {}

  async ngOnInit() {
    await this.loadCartItems();
  }

  async loadCartItems() {
    try {
      const profile = await this.authService.fetchProfileData();
      const petOwnerId = profile.id;
      this.petInfoService
      .fetchPets()
      .then((petsData: any) => {
        this.pets = petsData;
        console.log('Pets data:', this.pets);
      })
      .catch(error => {
        console.error('Error fetching pets data:', error);
      });
      const carts = await this.cartService
        .getCartsByPetOwnerId(petOwnerId)
        .toPromise();
      if (!carts?.length) {
        this.items = [];
        return;
      }
    const products = await Promise.all(
        carts.map(cart => this.getProduct(cart.product_id)),
      );
      this.items = this.mergeCartWithProducts(carts, products);
      this.calculateTotal();
      console.log('Cart items:', this.items);
    } catch (error) {
      console.error('Error fetching cart items:', error);
    }
  }

  async getProduct(productId: number | undefined) {
    return productId
      ? this.productService.getProductById(productId).toPromise()
      : null;
  }

  mergeCartWithProducts(carts: any[], products: any[]) {
    return carts.map((cart, index) => ({
      ...cart,
      maxQuantity: products[index]?.quantity || 10, // maxQuantity from the product table
      imageUrl: products[index]?.images?.[0] || 'assets/default-image.png',
      label: products[index]?.name || 'Unknown Product',
      price: this.isMember
        ? products[index]?.new_price
        : products[index]?.old_price,
    }));
  }

  selectAllItems(event: any) {
    const isChecked = event.detail.checked;
    this.items.forEach(item => (item.selected = isChecked));
    this.selectAll = isChecked;
    this.updatePageInfo();
  }

  updatePageInfo() {
    this.selectAll = this.items.every(item => item.selected);
    this.updateSelectedItemsCount();
    this.calculateTotal();
  }

  updateSelectedItemsCount() {
    this.selectedItemsCount = this.items.filter(item => item.selected).length;
  }

  calculateTotal() {
    const selectedItems = this.items.filter(item => item.selected);
    const totalWithoutDiscount = selectedItems.reduce((sum, item) => {
      return sum + item.price * item.quantity; // Calculate total based on price and quantity
    }, 0);
  
    console.log('Total Without Discount:', totalWithoutDiscount); // Debug log
  
    if (this.isMember) {
      this.totalPrice = totalWithoutDiscount * (1 - this.discountRate);
      this.savedPrice = totalWithoutDiscount * this.discountRate;
    } else {
      this.totalPrice = totalWithoutDiscount;
      this.savedPrice = 0.0;
    }
  
    console.log('Total Price:', this.totalPrice); // Debug log
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
      this.showToast('Error updating cart', 'danger');
    }
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
      this.showToast('Error removing item from cart', 'danger');
    }
  }

  async deleteSelectedItems() {
    try {
      const selectedItems = this.items.filter(item => item.selected);
      if (!selectedItems.length) return;

      await Promise.all(selectedItems.map(item => this.deleteCartItem(item)));
      await this.loadCartItems();
      this.showToast('Selected items removed from cart', 'danger');
    } catch (error) {
      console.error('Error removing selected items from cart:', error);
      this.showToast('Error removing selected items from cart', 'danger');
    }
  }
  async findCartItem(productId: number) {
    const profile = await this.authService.fetchProfileData();
    const petOwnerId = profile.id;
    const cartItems = await this.cartService
      .getCartsByPetOwnerId(petOwnerId)
      .toPromise();
    if (cartItems) {
      return cartItems.find(cart => cart.product_id === productId);
    }
    return null;
  }

  async showToast(message: string, color: string) {
    const toast = await this.toastController.create({
      message,
      color,
      duration: 2000,
    });
    toast.present();
  }

  get isCartEmpty(): boolean {
    return !this.items.length;
  }

  async checkout() {
    if (this.totalPrice === 0) {
      const alert = await this.alertController.create({
        header: 'Alert',
        message: 'Your total is zero. Please add items to your cart before checking out.',
        buttons: ['OK'],
      });
      await alert.present();
    } else {
      const selectedItems = this.items.filter(item => item.selected).map(item => ({
        provider_id: item.provider_id,
        product_id: item.product_id,
        product_name: item.name,
        amount: item.quantity,
        price: item.price
      }));
      
      localStorage.setItem('checkoutProducts', JSON.stringify(selectedItems));
  
      this.router.navigate(['/check-out', 'cart', this.totalPrice]);
    }
  }

  selectPet(item: Cart) {
    const selectedPet = this.pets.find(pet => pet.id === item.selectedPetId);
    if (selectedPet) {
      item.selectedPetName = selectedPet.name;
  
      // Create an updatedCart object of type Cart
      const updatedCart: Cart = {
        ...item,  
        pet_id: item.selectedPetId  // Update the pet_id field
      };
  
      this.updateCart(item.id, updatedCart);
    }
  }
  
  // Call the updateCart service method, ensuring that updatedCart is of type Cart
  updateCart(cartId: number, updatedCart: Cart) {
    this.cartService.updateCart(cartId, updatedCart).subscribe(
      (response) => {
        console.log('Cart updated successfully', response);
      },
      (error) => {
        console.error('Error updating cart:', error);
      }
    );
  }

  async confirmDeleteAll() {
    const alert = await this.alertController.create({
      header: 'Confirm Deletion',
      message: 'Are you sure you want to delete all selected items?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
        },
        {
          text: 'Delete',
          handler: () => {
            this.deleteSelectedItems(); // Call your delete function
          },
        },
      ],
    });
  
    await alert.present();
  }

}