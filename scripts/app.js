const onRegister = registration => {
  // registration succeded
  console.log('ServiceWorker registration successful with scope!', registration.scope)
}

const onError = err => {
  // registration failed
  console.log('ServiceWorker registration failed.', err);
}

navigator.serviceWorker.register('/sw.js', { scope: '/' }).then(onRegister, onError)

// use the Service-Worker-Allowed HTTP header to allow the scope
// response.writeHead(200, {'Service-Worker-Allowed':'/', 'Content-Type':'application/javascript'});

// const controller = navigator.serviceWorker.controller
// if (controller) {
//     console.log('Your page is controlled by', controller)
// } else {
//     console.log('Your page is not controlled by any service worker.')
// }

window.addEventListener('load', () => {
  const btn = document.getElementById('btn')
  console.log("Loaded...", btn)
  btn.addEventListener('click', onButtonClick)
})

const onButtonClick = e => {
  console.log("Clicked!")
  window.fetch('https://pokeapi.co/api/v2/pokemon/1/').then(data => {
    console.log("API response", data)
  })
}