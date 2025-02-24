window.addEventListener('load', (_event: Event) => {
  const tasks: {
    [selector: string]: (el: HTMLElement) => void
  } = {
    '.date_input': (element: HTMLElement) => {
      const name = (element as HTMLInputElement).name
      const yearInput = element.parentNode?.querySelector(
        `[data-rel-year="${name}"]`
      ) as HTMLInputElement
      const monthInput = element.parentNode?.querySelector(
        `[data-rel-month="${name}"]`
      ) as HTMLInputElement
      const dateInput = element.parentNode?.querySelector(
        `[data-rel-date="${name}"]`
      ) as HTMLInputElement

      if (!yearInput || !monthInput || !dateInput) {
        return
      }
      const [year, month, date] = (element as HTMLInputElement).value.split('-')
      yearInput.setAttribute('value', String(Number(year) || ''))
      monthInput.setAttribute('value', String(Number(month) || ''))
      dateInput.setAttribute('value', String(Number(date) || ''))

      const distribute = () => {
        const targetElement = element as HTMLInputElement
        if (!yearInput.value || !monthInput.value || !dateInput.value) {
          targetElement.setAttribute('value', '')
          return
        }
        const date = new Date(
          Number(yearInput.value),
          Number(monthInput.value) - 1,
          Number(dateInput.value)
        )
        targetElement.setAttribute('value', `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`)
      }
      yearInput.addEventListener('change', distribute)
      monthInput.addEventListener('change', distribute)
      dateInput.addEventListener('change', distribute)
      yearInput.addEventListener('input', distribute)
      monthInput.addEventListener('input', distribute)
      dateInput.addEventListener('input', distribute)
    }
  }

  Object.keys(tasks).forEach((key) => {
    const uniqueElement = document.querySelector(key)
    uniqueElement && tasks[key]?.(uniqueElement as HTMLElement)
  })
})
