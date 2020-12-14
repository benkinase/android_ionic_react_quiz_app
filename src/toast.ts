export function toast(message: string, color: string) {
  const toast = document.createElement("ion-toast");
  toast.message = message;
  toast.duration = 2000;
  toast.color = color;

  document.body.appendChild(toast);
  return toast.present();
}
