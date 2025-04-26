import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PetinfoService } from '../../../services/petinfo.service';
@Component({
  selector: 'app-qrcode',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './qrcode.component.html',
  styleUrl: './qrcode.component.scss',
})
export class QrcodeComponent {
  petDet: any = {};
  petId: number | undefined;
  profile: any = {};
  constructor(
    private activatedRoute: ActivatedRoute,
    private petInfoService: PetinfoService,
  ) {}

  async ngOnInit() {
    this.petId = +this.activatedRoute.snapshot.paramMap.get('id')!;
    console.log('pet id ------->', this.petId);
    if (this.petId !== null) {
      console.log('pet id inside if ------->', this.petId);
      this.petInfoService.getPet(this.petId).subscribe((Response: any) => {
        this.petDet = Response.data;
        // this.loadImages();
        console.log('pet------->', this.petDet);
      });
    }
  }

  // async loadImages() {
  //   if (this.petDet.image) {
  //     await this.petInfoService.uploadImage(this.petDet.image).then(res => {
  //       this.petDet.imageUrl = res;
  //       console.log('this.petDet.imageUrl', this.petDet.imageUrl);
  //     });
  //   }
  // }
}
