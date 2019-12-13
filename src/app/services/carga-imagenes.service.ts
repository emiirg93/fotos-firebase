import { Injectable } from "@angular/core";
import { AngularFirestore } from "@angular/fire/firestore";
import * as firebase from "firebase/app";
import { FileItem } from "../models/file-item";

@Injectable({
  providedIn: "root"
})
export class CargaImagenesService {
  private carpeta_imagenes = "img";

  constructor(private db: AngularFirestore) {}

  cargarImagenesFirebase(imagenes: FileItem[]) {
    const storageRef = firebase.storage().ref();

    for (const item of imagenes) {
      item.subiendo = true;

      if (item.progreso >= 100) {
        continue;
      }

      const uploadTask: firebase.storage.UploadTask = storageRef
        .child(`${this.carpeta_imagenes}/${item.nombreArchivo}`)
        .put(item.archivo);

      uploadTask.on(
        firebase.storage.TaskEvent.STATE_CHANGED,
        snapshot =>
          (item.progreso =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100),
        error => console.error("error al subir", error),
        () => {
          uploadTask.snapshot.ref.getDownloadURL().then(downloadURL => {
            console.log("file available at",downloadURL);
            item.url = downloadURL;
            item.subiendo = false;
            this.guardarImagen({
              nombre: item.nombreArchivo,
              url: item.url
            });
          });
        }
      );
    }
  }

  private guardarImagen(imagen: { nombre: string; url: string }) {
    this.db.collection(`/${this.carpeta_imagenes}`).add(imagen);
  }
}
