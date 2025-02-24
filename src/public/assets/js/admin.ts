window.addEventListener('load', (_event: Event) => {
  const tasks: {
    [selector: string]: (el: HTMLElement) => void
  } = {
    '.article-form button[type="submit"]': (element: HTMLElement) => {
      const form = (element as HTMLButtonElement).form
      const elements = {
        title: (form?.elements as any)?.title as HTMLInputElement,
        date: (form?.elements as any)?.date as HTMLInputElement,
        lat: (form?.elements as any)?.lat as HTMLInputElement,
        lng: (form?.elements as any)?.lng as HTMLInputElement,
        explain: (form?.elements as any)?.explain as HTMLTextAreaElement
      }
      if (Object.values(elements).some((el) => !el)) {
        return
      }
      const distribute = () => {
        if (Object.values(elements).some((el) => !el.value)) {
          element.setAttribute('disabled', 'disabled')
        } else {
          element.removeAttribute('disabled')
        }
      }

      const observer = new MutationObserver((mutationList) => {
        distribute()
      })

      Object.values(elements).forEach((el) => {
        el.addEventListener('input', distribute)
        el.addEventListener('change', distribute)
        observer.observe(el, {
          attributes: true,
          attributeFilter: ['value'],
          characterData: true,
          subtree: true,
          childList: true
        })
      })
      distribute()
    }
  }

  Object.keys(tasks).forEach((key) => {
    const uniqueElement = document.querySelector(key)
    uniqueElement && tasks[key]?.(uniqueElement as HTMLElement)
  })
})
