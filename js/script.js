window.onload = function () {
    // PopupInfo
    var popupInfo = document.querySelector('#popup-info')

    document.querySelectorAll('.schedule.past').forEach((el) => {
        el.addEventListener('click', (e) => {
            var x = e.pageX
            var y = e.pageY

            // Avoid horizontal overflow
            if (x + el.offsetWidth > window.screen.width - 100) {
                x = x - el.offsetWidth - 36
            }

            popupInfo.style.display = 'block'
            popupInfo.style.left = `${x}px`
            popupInfo.style.top = `${y}px`
        })
    })

    document
        .querySelector('#popup-info .btn-close')
        .addEventListener('click', (e) => {
            popupInfo.style.display = 'none'
        })

    // PopupEditor
    var popupEditor = document.querySelector('#popup-editor')

    document
        .querySelectorAll('.schedule.active, .schedule.future')
        .forEach((el) => {
            el.addEventListener('click', (e) => {
                var x = e.pageX
                var y = e.pageY

                // Avoid horizontal overflow
                if (x + el.offsetWidth > window.screen.width - 100) {
                    x = x - el.offsetWidth - 36
                }

                popupEditor.style.display = 'block'
                popupEditor.style.left = `${x}px`
                popupEditor.style.top = `${y}px`
            })
        })

    document.querySelector('#btn-close').addEventListener('click', (e) => {
        popupEditor.style.display = 'none'
    })
}
