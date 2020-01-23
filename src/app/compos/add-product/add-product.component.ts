import { Component, OnInit } from '@angular/core';
import {ProductsModel} from '../product/products.model';
import {ProductTypes} from '../../models/models';
import {NgForm} from '@angular/forms';
import {ProductService} from '../product/product.service';
@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})
export class AddProductComponent implements OnInit {

  item: ProductsModel = {
    type: '',
    title: '',
    description: '',
    price: null,
    imageUrl: '',
    imageUrlTwo: '',
    imageUrlThree: '',
    imageUrlFour: '',
    primeColor: '',
    imgDem: '',
    hovered: false,
    compProd: '',
    otherColors: '',
    baseColor: ''
  };
  prodTypes: ProductTypes[] = [
    {value: 'earring', viewValue: 'Earring'},
    {value: 'necklace', viewValue: 'Necklace'},
    {value: 'bracelet', viewValue: 'Bracelet'},
    {value: 'clothing', viewValue: 'Clothing'},
  ];
  imgDem: ProductTypes[] = [
    {value: 'cube', viewValue: 'Cube'},
    {value: 'wide', viewValue: 'Wide'},
    {value: 'port', viewValue: 'Portrait'},
  ];
  imgCount =  1;
  constructor(private productService: ProductService) { }

  ngOnInit() {}

  onSubmit(addProdForm: NgForm) {
    // this.prodItemService.addItem(this.item);
    this.productService.addItem(this.item);
    addProdForm.resetForm();
  }
  autoFill(): any {
    this.item.type = 'earring';
    this.item.imageUrl = 'star';
    this.item.title = 'Auto Generated Title';
    this.item.description = 'To generate random number between two numbers is so simple.';
    this.item.price = Math.floor(Math.random() * 1000) + 1;
    this.item.primeColor = 'Blue';
    this.item.imgDem = 'cube';
    this.item.compProd = '';
  }
  clearAll(addProdForm): any {
    addProdForm.resetForm();
  }
  clearInput(e): void {
    const inputName = e.target.previousElementSibling.name;
    if (inputName === 'title') {
      this.item.title = '';
    }
    if (inputName === 'description') {
      this.item.description = '';
    }
    if (inputName === 'price') {
      this.item.price = null;
    }
    if (inputName === 'imageUrl') {
      this.item.imageUrl = '';
    }
    if (inputName === 'imageUrlTwo') {
      this.item.imageUrlTwo = '';
    }
    if (inputName === 'imageUrlThree') {
      this.item.imageUrlThree = '';
    }
    if (inputName === 'imageUrlFour') {
      this.item.imageUrlFour = '';
    }
    if (inputName === 'primeColor') {
      this.item.primeColor = '';
    }

    if (inputName === 'compProd') {
      this.item.compProd = '';
    }
    if (inputName === 'imgDem') {
      this.item.imgDem = '';
    }
  }
  changeCount(val) {
    this.imgCount = val;
  }

}
