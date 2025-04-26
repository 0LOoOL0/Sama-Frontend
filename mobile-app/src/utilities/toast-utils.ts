import { ToastController } from '@ionic/angular';

export async function showToast(
  toastController: ToastController,
  message: string,
  color: string,
) {
  const toast = await toastController.create({
    message,
    duration: 2000,
    color,
  });
  toast.present();
}
