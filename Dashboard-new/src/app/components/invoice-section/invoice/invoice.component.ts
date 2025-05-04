import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { InvoiceService } from '../service/InvoiceService';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';

@Component({
  selector: 'app-invoice',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.css']
})
export class InvoiceComponent implements OnInit {
  invoice: any;
  invoiceMode: string = 'order';

  constructor(
    private invoiceService: InvoiceService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const invoiceId = Number(this.route.snapshot.paramMap.get('id'));
    const navState = history.state;
  
    if (navState && navState.selectedPets && navState.mode === 'pet') {
      this.invoiceMode = 'membership';
      this.invoice = {
        id: 'New Membership',
        invoice_date: new Date(),
        customer_name: navState.ownerData.ownerName,
        address: navState.ownerData.city || navState.ownerData.location || '',
        contact_no: navState.ownerData.contactNumber,
        email: navState.ownerData.email,
        total_amount: navState.selectedPets.reduce(
          (total: number, pet: any) => total + Number(pet.membership?.price || 0),
          0
        ),
        delivery: 0,
        order_products: navState.selectedPets.map((pet: any) => ({
          pet_name: pet.name,
          // Use pay_type from membership for package name
          package_type: pet.membership?.pay_type || 'N/A',
          price: Number(pet.membership?.price || 0),
        }))
      };
      
      
    } else if (invoiceId) {
      this.invoiceService.getInvoice(invoiceId).subscribe(data => {
        this.invoice = data;
        this.invoiceMode = data.type || 'order'; // important line
      }, error => {
        console.error('Error fetching invoice:', error);
      });
    } else {
      console.error('No invoice id or selected pets provided.');
    }
  }
  
  
  
  

  get totalDue(): number {
    return this.invoice?.status?.toLowerCase() === 'paid'
      ? 0
      : Number(this.invoice?.total_amount);
  }
  

  printInvoice(): void {
    const invoiceElement = document.querySelector('.invoice') as HTMLElement;
    if (invoiceElement) {
      html2canvas(invoiceElement).then(canvas => {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF('p', 'mm', 'a4');
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const imgProps = pdf.getImageProperties(imgData);
        const pdfImgHeight = (imgProps.height * pdfWidth) / imgProps.width;
        pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfImgHeight);
        pdf.save('invoice.pdf');
      });
    }
  }
}
