// use the Service-Worker-Allowed HTTP header to allow the scope
// response.writeHead(200, {'Service-Worker-Allowed':'/', 'Content-Type':'application/javascript'});

// const controller = navigator.serviceWorker.controller
// if (controller) {
//     console.log('Your page is controlled by', controller)
// } else {
//     console.log('Your page is not controlled by any service worker.')
// }

window.addEventListener('load', () => {
  // register service worker
  navigator.serviceWorker.register('/sw.js', { scope: '/' }).then(onRegister, onError)

  // listen to messages emitted by sw
  navigator.serviceWorker.addEventListener('message', event => {
    console.info("message", event.data.msg, event.data.url)
  })

  // on button click
  const btn = document.getElementById('btn')
  console.log("Web page has loaded", btn)
  btn.addEventListener('click', onButtonClick)
})

// registration succeded
const onRegister = registration => {
  console.log('ServiceWorker registration successful with scope!', registration.scope)
}

// registration failed
const onError = err => {
  console.log('ServiceWorker registration failed.', err);
}

const onButtonClick = e => {
  window.fetch('https://pokeapi.co/api/v2/pokemon/1/')
    .then(data => data.json())
    .then(data => {
      console.log("API response", data)
      navigator.serviceWorker.controller.postMessage(data)
    })
}