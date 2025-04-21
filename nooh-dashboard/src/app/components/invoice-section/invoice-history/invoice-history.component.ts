import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { InvoiceService } from '../service/InvoiceService';
import { CommonModule, DatePipe } from '@angular/common';

@Component({
  selector: 'app-invoice-history',
  standalone: true,
  imports: [CommonModule, DatePipe],
  templateUrl: './invoice-history.component.html',
  styleUrl: './invoice-history.component.css'
})
export class InvoiceHistoryComponent implements OnInit {
  invoices: any[] = [];

  shippedCount: number = 0;
  pendingCount: number = 0;
  paidCount: number = 0;

  constructor(private router: Router, private invoiceService: InvoiceService) {}

  ngOnInit(): void {
    this.loadInvoices();
  }

  loadInvoices() {
    this.invoiceService.getAllInvoices().subscribe(data => {
      this.invoices = data;
      this.updateInvoiceCounts();
    });
  }

  updateInvoiceCounts() {
    this.shippedCount = this.invoices.filter(i => i.status === 'Shipped').length;
    this.pendingCount = this.invoices.filter(i => i.status === 'Pending').length;
    this.paidCount = this.invoices.filter(i => i.status === 'Paid').length;
  }

  

  deleteInvoice(invoiceId: number): void {
    this.invoiceService.deleteInvoice(invoiceId).subscribe(() => {
      this.invoices = this.invoices.filter(inv => invoiceId !== inv.id);
      this.updateInvoiceCounts();
    });
  }

  navigateToCreateInvoice() {
    this.router.navigate(['/create-invoice']);
  }

  navigateToInvoice(invoiceId: number, invoiceType: string): void {
    this.router.navigate(['/invoice', invoiceId], { state: { type: invoiceType } });
  }
  
  
  
  
}
