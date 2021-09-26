
window.addEventListener('load', () => {
  if (navigator.serviceWorker) {
    navigator.serviceWorker.register('/sw.js', { scope: '/' })
  }
})

// Adapted from https://codepen.io/rajatkantinandi/pen/VOJMGm
// JS only to store user settings
// let globalDarkMode = false;
// let isDarkModeUser = false;

// if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
//   // Set sytem dark mode setting
//   globalDarkMode = true;
// }
// // When browser window loads, check User setting of dark mode
// window.onload = () => {
//   isDarkModeUser = window.localStorage.getItem("isDarkMode") === "true";

//   if (isDarkModeUser ^ globalDarkMode) {
//     document.getElementById("toggle").checked = true;
//   }
// }

// function toggle () {
//   if (isDarkModeUser) {
//     window.localStorage.setItem("isDarkMode", "false");
//   } else {
//     window.localStorage.setItem("isDarkMode", "true");
//   }
// }
