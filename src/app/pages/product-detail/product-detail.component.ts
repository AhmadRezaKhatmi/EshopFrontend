import {Component, OnInit, ViewChild} from '@angular/core';
import {ProductsService} from '../../services/products.service';
import {ActivatedRoute, Router} from '@angular/router';
import {ImageGalleryPath, ImagePath} from '../../Utilities/PathTools';
import {Product} from '../../DTOs/Products/Product';
import {ProductGallery} from '../../DTOs/Products/ProductGallery';
import {ProductCommentDTO} from '../../DTOs/Products/ProductCommentDTO';
import {CurrentUser} from '../../DTOs/Account/CurrentUser';
import {AuthService} from '../../services/auth.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AddProductComment} from '../../DTOs/Products/AddProductComment';
import {OrderService} from '../../services/order.service';
import {SwalComponent} from '@sweetalert2/ngx-sweetalert2';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {

  imagePath = ImagePath;
  imageGalleryPath = ImageGalleryPath;
  product: Product;
  galleries: ProductGallery[];
  mainImage: string;
  selectedImageId = 0;
  relatedProducts: Product[] = [];
  productComments: ProductCommentDTO[] = [];
  currentUser: CurrentUser = null;
  commentForm: FormGroup;
  count = 1;
  @ViewChild('sweetAlert') private sweetAlert: SwalComponent;

  constructor(
    private productService: ProductsService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private orderService: OrderService
  ) {
  }

  ngOnInit(): void {

    this.authService.getCurrentUser().subscribe(res => {
      if (res !== null) {
        this.currentUser = res;
      }
    });
    this.activatedRoute.params.subscribe(params => {
      const productId = params.productId;
      if (productId === undefined) {
        this.router.navigate(['']);
      }

      this.productService.getSingleProduct(productId).subscribe(res => {
        if (res.status === 'NotFound') {
          this.router.navigate(['']);
        } else if (res.status === 'Success') {
          this.product = res.data.product;
          this.galleries = res.data.galleries;
          this.mainImage = ImagePath + this.product.imageName;
        }

        this.productService.getRelatedProducts(productId).subscribe(result => {
          if (result.status === 'Success') {
            this.relatedProducts = result.data;
          }
        });
      });

      this.productService.getProductComments(productId).subscribe(res => {
        this.productComments = res.data;
      });
    });

    this.commentForm = new FormGroup({
      text: new FormControl(null, [
        Validators.required,
        Validators.maxLength(1000)
      ])
    });
  }

  selectImage(imageId: number) {
    this.selectedImageId = imageId;
    if (imageId !== 0) {
      const gallery = this.galleries.filter(g => g.id === imageId)[0];
      this.mainImage = this.imageGalleryPath + gallery.imageName;
    } else {
      this.mainImage = this.imagePath + this.product.imageName;
    }
  }

  addComment() {
    if (this.commentForm.valid) {
      const comment = new AddProductComment(this.product.id, this.commentForm.controls.text.value);
      // add comment to database
      this.productService.addProductComment(comment).subscribe(res => {
        if (res.status === 'Success') {
          const commentDTO = res.data;
          commentDTO.userFullName = this.currentUser.firstName + ' ' + this.currentUser.lastName;
          this.productComments.unshift(commentDTO);
          this.commentForm.reset();
        }
      });
    }
  }

  addCount() {
    this.count += 1;
  }

  minusCount() {
    if (this.count > 1) {
      this.count -= 1;
    }
  }

  addProductToOrder() {
    const productId = this.product.id;
    const count = this.count;
    if (count >= 1) {
      this.orderService.addProductToOrder(productId, count).subscribe(res => {
        this.sweetAlert.text = res.data.message;
        this.sweetAlert.fire();
        console.log(res.data);
        this.orderService._setOrderDetails(res.data.details);
      });
    }
  }
}
