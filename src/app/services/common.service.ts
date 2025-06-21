import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor() { }

  
}

export function Toast(message: string, timeSpan: number = 5) {
  let $Toast = document.getElementById("toast");
  if ($Toast) {
    $Toast.classList.add("success-toast");
    $Toast.classList.remove("error-toast");
    $Toast.classList.remove("warning-toast");

    $Toast.classList.remove("d-none");

    document.getElementById("toastmessage").innerHTML = message;
    document.getElementById("success-box").classList.remove("d-none");
    document.getElementById("warning-box").classList.add("d-none");
    document.getElementById("error-box").classList.add("d-none");

    setTimeout(() => {
      HideToast();
    }, timeSpan * 998);
  }
}

export function ErrorToast(message: string, timeSpan: number = 10) {
  let $Toast = document.getElementById("toast");
  if ($Toast) {
    $Toast.classList.remove("success-toast");
    $Toast.classList.add("error-toast");
    $Toast.classList.remove("warning-toast");

    $Toast.classList.remove("d-none");

    document.getElementById("toastmessage").innerHTML = message;
    document.getElementById("success-box").classList.add("d-none");
    document.getElementById("warning-box").classList.add("d-none");
    document.getElementById("error-box").classList.remove("d-none");

    setTimeout(() => {
      HideToast();
    }, timeSpan * 998);

  }
}

export function WarningToast(message: string, timeSpan: number = 5) {
  let $Toast = document.getElementById("toast");
  if ($Toast) {
    $Toast.classList.remove("success-toast");
    $Toast.classList.remove("error-toast");
    $Toast.classList.add("warning-toast");

    $Toast.classList.remove("d-none");

    document.getElementById("toastmessage").innerHTML = message;
    document.getElementById("success-box").classList.add("d-none");
    document.getElementById("warning-box").classList.remove("d-none");
    document.getElementById("error-box").classList.add("d-none");

    setTimeout(() => {
      HideToast();
    }, timeSpan * 998);
  }
}

export function HideToast() {
  let $Toast = document.getElementById("toast");
  let $Error = document.getElementById("warning-box");
  let $Warning = document.getElementById("error-box");
  if ($Toast) {
    $Toast.classList.add("d-none");
    $Error.classList.add("d-none");
    $Warning.classList.add("d-none");
  }
}