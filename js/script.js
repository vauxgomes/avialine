function resolveTogglerLoading(togglerName) {
  var toggler = window.localStorage.getItem(togglerName)

  if (toggler === null) {
    toggler = false
    window.localStorage.setItem(togglerName, JSON.stringify(toggler))
  } else {
    toggler = JSON.parse(toggler)
  }

  return toggler
}

window.onload = function () {
  // Sidebar Toggler
  var sidebarStatus = resolveTogglerLoading('sidebar-status')
  if (sidebarStatus) {
    document.querySelector('.sidebar').classList.add('toggled')
  }

  document.querySelector('.sidebar .toggler').addEventListener('click', () => {
    sidebarStatus = document
      .querySelector('.sidebar')
      .classList.toggle('toggled')
    window.localStorage.setItem('sidebar-status', JSON.stringify(sidebarStatus))
  })

  // Stats Toggler
  var statsStatus = resolveTogglerLoading('stats-status')
  if (statsStatus) {
    document.querySelector('#meals-stats').classList.add('toggled')
  }

  document
    .querySelector('#meals-stats-toggler')
    .addEventListener('click', () => {
      document.querySelector('#calendar nav button').classList.toggle('active')

      statsStatus = document
        .querySelector('#meals-stats')
        .classList.toggle('toggled')

      window.localStorage.setItem('stats-status', JSON.stringify(sidebarStatus))
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
