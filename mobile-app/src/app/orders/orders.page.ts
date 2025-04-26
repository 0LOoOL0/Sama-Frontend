import { Component, OnInit } from '@angular/core';
import { today } from 'ionicons/icons';
import { AlertController } from '@ionic/angular';
import { AuthService } from '../services/auth.service';
import { OrderService, Order } from '../services/order.service';
import { ProviderService } from '../services/provider.service'; // Adjust based on your OrderService
@Component({
  selector: 'app-orders',
  templateUrl: './orders.page.html',
  styleUrls: ['./orders.page.scss'],
})
export class OrdersPage implements OnInit {
  toggleItems: { [key: string]: boolean } = {};
  orders: Order[] = [];
  userId: number = 21;
  profile: any = {};
  provider: any;
  orderProductsMap: { [orderId: string]: any[] } = {}; 
  groupedOrders: { date: string, orders: Order[] }[] = [];
  draft = [
    {
      orderId: '12345',
      restaurantName: 'Burger King',
      restaurantLogo: 'assets/mypet.svg',
      orderStatus: 'Delivered',
      orderDate: '2024-08-10',
      deliveryTime: '1:30 pm',
      totalAmount: 15.99,
      DisountTotalAmount: 10.00,
      items: [
        {
          itemName: 'Whopper Meal',
          quantity: 1,
          price: 7.99
        },
        {
          itemName: 'Coca-Cola',
          quantity: 1,
          price: 1.99
        }
      ]
    },
    {
      orderId: '67890',
      restaurantName: 'Pizza Hut',
      restaurantLogo: 'assets/catPlaceHolder.svg',
      orderStatus: 'Pending',
      orderDate: '2024-08-11',
      deliveryTime: '8:30 pm',
      totalAmount: 22.49,
      DisountTotalAmount: 18.53,
      items: [
        {
          itemName: 'Large Pepperoni Pizza',
          quantity: 1,
          price: 14.99
        },
        {
          itemName: 'Garlic Bread',
          quantity: 2,
          price: 4.50
        },
        {
          itemName: 'Pepsi',
          quantity: 2,
          price: 1.50
        }
      ]
    },
    {
      orderId: '54321',
      restaurantName: 'Starbucks',
      restaurantLogo: 'assets/DogPlaceHolder.svg',
      orderStatus: 'Delivered',
      orderDate: '2024-08-09',
      deliveryTime: '11:00 am',
      totalAmount: 10.50,
      DisountTotalAmount: 6.99,
      items: [
        {
          itemName: 'Caramel Macchiato',
          quantity: 1,
          price: 4.50
        },
        {
          itemName: 'Blueberry Muffin',
          quantity: 1,
          price: 3.00
        },
        {
          itemName: 'Latte',
          quantity: 1,
          price: 3.00
        }
      ]
    }
  ];
  groupedDraftss: { date: string, orders: any[] }[] = [];


  constructor( private authService: AuthService, private providerService: ProviderService, private alertController: AlertController, private orderService: OrderService) { }

  ngOnInit() {
    this.authService
    .fetchProfileData()
    .then(profileData => {
      this.profile = profileData;
      this.userId = this.profile.id;
      this.fetchOrdersByUserId(this.userId);
      this.groupOrdersByDate();
    })
    .catch(error => {
      console.error('Error fetching profile data:', error);
    });

  }

  fetchOrdersByUserId(userId: number) {
    this.orderService.getOrdersByUserId(userId).then(response => {
      const orders = response.orders;

      if (Array.isArray(orders)) {
        this.orders = orders;

        this.orders.forEach(order => {
          const orderId = order.id; 
          order.quantity = order.quantity || 0; // Initialize quantity if it doesn't exist
  
          if (order.metadata) {
            let metadata;
            // Check if metadata is a string and parse it if necessary
            if (typeof order.metadata === 'string') {
              try {
                metadata = JSON.parse(order.metadata);
              } catch (error) {
                console.error('Error parsing metadata:', error);
                return;
              }
            } else {
              metadata = order.metadata;
            }
  
            // Store products in the map and update the quantity
            this.orderProductsMap[orderId] = metadata?.products || [];
  
            // Calculate the total quantity based on products
            this.orderProductsMap[orderId].forEach(item => {
              order.quantity += item.amount; // Add item amount to the order's quantity
            });
          }
        });
  


        if (this.orders.length === 0) {
          console.error('No orders found.');
          return;
        }
        const order = this.orders[0];  // Access the first order
        if (!order || !order.metadata) {
          console.error('Order or metadata is undefined.');
          return;
        }
      
        let metadata;
        // Check if metadata is a string and parse it if necessary
        if (typeof order.metadata === 'string') {
          try {
            metadata = JSON.parse(order.metadata);  // Parse metadata if it's a string
          } catch (error) {
            console.error('Error parsing metadata:', error);
            return;  // Exit if metadata can't be parsed
          }
        } else {
          metadata = order.metadata;  // Metadata is already an object
        }
      
        // Check if products exist in metadata and fetch provider for the first product
        if (metadata?.products?.length > 0) {
          this.fetchProviderForFirstProduct(metadata.products[0].provider_id);
        } else {
          console.error('No products found in metadata.');
        }



        console.log('Orders fetched:', orders);
        this.groupOrdersByDate();
      } else {
        console.error('Expected orders to be an array but got:', orders);
        this.alertController.create({
          header: 'Error',
          message: 'Invalid order data received.',
          buttons: ['OK']
        }).then(alert => alert.present());
      }
    }).catch(error => {
      console.error('Error fetching orders:', error);
      this.alertController.create({
        header: 'Error',
        message: 'Could not fetch order history.',
        buttons: ['OK']
      }).then(alert => alert.present());
    });
  }
  
  groupOrdersByDate() {
    const groups: { [key: string]: Order[] } = {};

    this.orders.forEach(order => {
      // Split order_date into date and time using space as the delimiter
      const [date, time] = order.order_date.split(' '); 
  
      // Create the date group if it doesn't exist
      if (!groups[date]) {
        groups[date] = [];
      }
  
      // Add the time to the order object
      order.deliveryTime = time; // Store time in the order object
  
      // Add the order to the respective group
      groups[date].push(order);
    });
  
    // Group and sort the orders by date
    this.groupedOrders = Object.keys(groups)
      .sort((a, b) => {
        const today = this.getTodayDate(); // Get today's date in "YYYY-MM-DD" format
        if (a === today) return -1; // Show today's orders first
        if (b === today) return 1;  // Show today's orders first
        return new Date(b).getTime() - new Date(a).getTime(); // Sort by date (most recent first)
      })
      .map(date => ({
        date: date,
        orders: groups[date] // Each order now contains its delivery time
      }));
  
    console.log('Grouped Orders:', this.groupedOrders);
  }
  

  formatDate(dateString: string): string {
    const today = new Date().toISOString().split('T')[0]; 
    if (dateString === today) {
      return 'Today';
    } else {
      const options: Intl.DateTimeFormatOptions = { day: 'numeric', month: 'short' };
      return new Date(dateString).toLocaleDateString('en-US', options);
    }
  }

  
  isWork(){
    this.alertController.create({
      header: 'Success',
      message: 'It works!',
      buttons: ['OK']
    }).then(alert => alert.present());
  }

  // reOrder(orderId: string) {
  //   const orderToReorder = this.orders.find(order => order.orderId === orderId);
  
  //   if (orderToReorder) {
      
  //     const newOrder = {
  //       orderId: this.generateOrderId(), 
  //       restaurantName: orderToReorder.restaurantName,
  //       restaurantLogo: orderToReorder.restaurantLogo,
  //       orderStatus: 'Pending', 
  //       orderDate: this.getTodayDate(), 
  //       deliveryTime: this.getCurrentTime(), 
  //       totalAmount: orderToReorder.totalAmount,
  //       DisountTotalAmount: orderToReorder.DisountTotalAmount,
  //       items: orderToReorder.items
  //     };
  
      
  //     this.orders.push(newOrder);
  //     this.groupOrdersByDate(); 
  
      
  //     this.alertController.create({
  //       header: 'Order Again',
  //       message: 'The order has been added to your orders.',
  //       buttons: ['OK']
  //     }).then(alert => alert.present());
  //   } else {
      
  //     this.alertController.create({
  //       header: 'Error',
  //       message: 'Order not found.',
  //       buttons: ['OK']
  //     }).then(alert => alert.present());
  //   }
  // }
  
  
  generateOrderId(): string {
    return Math.floor(Math.random() * 100000).toString(); 
  }
  
  
  getTodayDate(): string {
    const today = new Date();
    return today.toISOString().split('T')[0]; 
  }
  
  getCurrentTime(): string {
    const today = new Date();
    const options: Intl.DateTimeFormatOptions = { hour: 'numeric', minute: 'numeric', hour12: true };
    return today.toLocaleTimeString('en-US', options);
  }

  fetchProviderForFirstProduct(providerId: number) {
    this.providerService.getProviderById(providerId).then(provider => {
      this.provider = provider.data[0]; // Store provider details
      console.log(this.provider)
      console.log(`Provider details for ID ${providerId}:`, provider.data[0]);
    }).catch(error => {
      console.error(`Error fetching provider details for ID ${providerId}:`, error);
      this.alertController.create({
        header: 'Error',
        message: `Could not fetch provider details for provider ID ${providerId}.`,
        buttons: ['OK']
      }).then(alert => alert.present());
    });
  }
  
}