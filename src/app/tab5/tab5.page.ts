import { Component } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { Platform } from "@ionic/angular";
import { UserService } from "../api/user.service";
import { HttpClient } from "@angular/common/http";
import { Toast } from "@ionic-native/toast/ngx";
import { WebView } from "@ionic-native/ionic-webview/ngx";
import { File, FileEntry } from "@ionic-native/file/ngx";
import { ActionSheetController } from "@ionic/angular";
import {
  Camera,
  CameraOptions,
  PictureSourceType,
} from "@ionic-native/camera/ngx";
import { FilePath } from "@ionic-native/file-path/ngx";
//import { Crop } from "@ionic-native/crop/ngx";
//import { ImagePicker } from "@ionic-native/image-picker/ngx";
/*import {
  FileTransfer,
  FileUploadOptions,
  FileTransferObject,
} from "@ionic-native/file-transfer/ngx";*/
@Component({
  selector: "app-tab5",
  templateUrl: "tab5.page.html",
  styleUrls: ["tab5.page.scss"],
})
export class Tab5Page {
  profile: string = "posts";
  submitted = false;
  productForm: FormGroup;
  type: any = "password";
  log: any = false;
  imgURL;
  allCategories: [];

  constructor(
    public UserService: UserService,
    private router: Router,
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private toast: Toast,
    private camera: Camera,
    private file: File,
    private filepath: FilePath,
    public plt: Platform,
    public actionSheetController: ActionSheetController,

    private webview: WebView
  ) {
    this.createProductForm();
    this.getAllCategotries();
  }
  getAllCategotries() {
    const data = null;
    this.UserService.getAllCategories(data).subscribe((res) => {
      this.allCategories = res.data;
      console.log("all categories", this.allCategories);
    });
  }

  createProductForm() {
    this.productForm = this.formBuilder.group(
      {
        // pic: [, [Validators.required]],
        title: ["", [Validators.required]],
        desc: ["", [Validators.required, Validators.email]],
        price: ["", [Validators.required]],
        qun: ["", [Validators.required]],
        categories: ["", [Validators.required]],
      },
      {}
    );
  }
  onSubmit(value: any): void {
    this.submitted = true;
    // Stop if the form validation has failed
    // if (this.productForm.invalid) {
    //   return;
    // }
    var data = {
      id: localStorage.getItem("userid"),
      title: value.title,
      desc: value.desc,
      price: value.price,
      qun: value.qun,
      categories: value.categories,
    };
    console.log("form values", data);
    // this.UserService.addProduct(data).subscribe((res) => {
    //   {
    //     console.log(res);
    //   }
    // });
    // this._userservice.signup(data).subscribe(
    //   (res) => {
    //     console.log(res);
    //     this.loadingController.dismiss();
    //     if (res.status === 0) {
    //       this.toast
    //         .show(`Registered Successfully`, '5000', 'center')
    //         .subscribe((toast) => {});
    //       this.onReset();
    //       this.router.navigate(['/login']);
    //     } else if (res.status === 2) {
    //       this.toast.show(res.msg, '5000', 'center').subscribe((toast) => {});
    //     } else if (res.status === 3) {
    //       this.toast.show(res.msg, '5000', 'center').subscribe((toast) => {});
    //     } else {
    //       this.toast
    //         .show(`Unable to Register , Try Again!`, '5000', 'center')
    //         .subscribe((toast) => {});
    //     }
    //   },
    //   (err) => {
    //     this.loadingController.dismiss();
    //     this.toast
    //       .show(`Network Error , Try Again!`, '5000', 'center')
    //       .subscribe((toast) => {});
    //   }
    // );
  }
  get form() {
    return this.productForm.controls;
  }
  async selectImage() {
    const actionSheet = await this.actionSheetController.create({
      header: "Select Image source",
      buttons: [
        {
          text: "Load from Library",
          handler: () => {
            this.takePicture(this.camera.PictureSourceType.PHOTOLIBRARY);
          },
        },
        {
          text: "Use Camera",
          handler: () => {
            this.takePicture(this.camera.PictureSourceType.CAMERA);
          },
        },
        {
          text: "Cancel",
          role: "cancel",
        },
      ],
    });
    await actionSheet.present();
  }
  takePicture(sourceType: PictureSourceType) {
    const options: CameraOptions = {
      quality: 100,
      sourceType: sourceType,
      saveToPhotoAlbum: false,
      correctOrientation: true,
    };
    this.camera.getPicture(options).then((imagePath) => {
      if (
        this.plt.is("android") &&
        sourceType === this.camera.PictureSourceType.PHOTOLIBRARY
      ) {
        this.filepath.resolveNativePath(imagePath).then((filePath) => {
          const correctPath = filePath.substr(0, filePath.lastIndexOf("/") + 1);
          const currentName = imagePath.substring(
            imagePath.lastIndexOf("/") + 1,
            imagePath.lastIndexOf("?")
          );
          this.copyFileToLocalDir(
            correctPath,
            currentName,
            this.createFileName()
          );
        });
      } else {
        const currentName = imagePath.substr(imagePath.lastIndexOf("/") + 1);
        const correctPath = imagePath.substr(0, imagePath.lastIndexOf("/") + 1);
        this.copyFileToLocalDir(
          correctPath,
          currentName,
          this.createFileName()
        );
      }
    });
  }

  createFileName() {
    const d = new Date(),
      n = d.getTime(),
      newFileName = n + ".jpg";
    return newFileName;
  }
  copyFileToLocalDir(namePath, currentName, newFileName) {
    this.file
      .copyFile(namePath, currentName, this.file.dataDirectory, newFileName)
      .then(
        (success) => {
          // this.updateStoredImages(newFileName);
          this.finalmethod(newFileName, namePath);
          this.toast
            .show("Success while storing file.", "5000", "center")
            .subscribe((toast) => {
              console.log(toast);
            });
        },
        (error) => {
          this.toast
            .show("Error while storing file.", "5000", "center")
            .subscribe((toast) => {
              console.log(toast);
            });
        }
      );
  }
  finalmethod(img, file) {
    const formData = new FormData();
    console.log("image data", img, file);
    formData.append("file", img, file);
    const uid = localStorage.getItem("userid");
    formData.append("id", uid);
    formData.append("title", this.productForm.value.title);
    formData.append("desc", this.productForm.value.desc);
    formData.append("price", this.productForm.value.price);
    formData.append("qun", this.productForm.value.qun);
    formData.append("categories", this.productForm.value.categories);
    this.UserService.addProduct(formData).subscribe((res) => {
      {
        console.log(res);
      }
    });
  } // updateStoredImages(name) {
  //   this.storage.get(STORAGE_KEY).then((images) => {
  //     let arr = [];
  //     if (images && images !== "" && images.length > 0) {
  //       arr = JSON.parse(images);
  //     } else {
  //       arr = [];
  //     }
  //     if (!arr) {
  //       const newImages = [name];
  //       this.storage.set("my_images", JSON.stringify(newImages));
  //     } else {
  //       arr.push(name);
  //       this.storage.set("my_images", JSON.stringify(arr));
  //     }
  //     const filePath = this.file.dataDirectory + name;
  //     const resPath = this.pathForImage(filePath);
  //     const newEntry = {
  //       name: name,
  //       path: resPath,
  //       filePath: filePath,
  //     };
  //     this.images = [newEntry, ...this.images];
  //   });
  // }
}
