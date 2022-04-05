window.onload = function () {
  var toggled = window.localStorage.getItem('sidebar-status')

  if (toggled === null) {
    toggled = false
    window.localStorage.setItem('sidebar-status', JSON.stringify(toggled))
  } else {
    toggled = JSON.parse(toggled)
  }

  if (toggled == true) {
    document.querySelector('.sidebar').classList.add('toggled')
  }

  var sideBarToggler = document.querySelector('.sidebar .toggler')

  sideBarToggler.addEventListener('click', () => {
    toggled = document.querySelector('.sidebar').classList.toggle('toggled')
    window.localStorage.setItem('sidebar-status', JSON.stringify(toggled))
  })

  // // PopupInfo
  // var popupInfo = document.querySelector('#popup-info')

  // document.querySelectorAll('.day.past').forEach((el) => {
  //     el.addEventListener('click', (e) => {
  //         var x = e.pageX
  //         var y = e.pageY

  //         var pageWidth = document.querySelector('body').clientWidth
  //         console.log(el.clientWidth)

  //         // Avoid horizontal overflow
  //         if (pageWidth - x < 360) {
  //             x -= 360 - (pageWidth - x)
  //         }

  //         popupInfo.style.display = 'block'
  //         popupInfo.style.left = `${x}px`
  //         popupInfo.style.top = `${y}px`
  //     })
  // })

  // document
  //     .querySelector('#popup-info .btn-close')
  //     .addEventListener('click', (e) => {
  //         popupInfo.style.display = 'none'
  //     })

  // // PopupEditor
  // var popupEditor = document.querySelector('#popup-editor')

  // document
  //     .querySelectorAll('.day:not(.past)')
  //     .forEach((el) => {
  //         el.addEventListener('click', (e) => {
  //             var x = e.pageX
  //             var y = e.pageY

  //             var pageWidth = document.querySelector('body').clientWidth

  //             // Avoid horizontal overflow
  //             if (pageWidth - x < 360) {
  //                 x -= 360 - (pageWidth - x)
  //             }

  //             popupEditor.style.display = 'block'
  //             popupEditor.style.left = `${x}px`
  //             popupEditor.style.top = `${y}px`
  //         })
  //     })

  // document.querySelector('#btn-close').addEventListener('click', (e) => {
  //     popupEditor.style.display = 'none'
  // })

  // // QR-Code
  // document.querySelector('#activate-qr').addEventListener('click', (e) => {
  //     document.querySelector('#qr-container').classList.add('active')
  //     popupEditor.style.display = 'none'
  // })

  // document.querySelector('#qr-container').addEventListener('click', (e) => {
  //     document.querySelector('#qr-container').classList.remove('active')
  // })
}
