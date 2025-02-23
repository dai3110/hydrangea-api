window.addEventListener('load', (_event: Event) => {
  const tasks: {
    [selector: string]: (el: HTMLElement) => void
  } = {
    '.photo-form': (element: HTMLElement) => {
      type StockFile = {
        file: File
        content: string | null
      } | null

      const dropArea = element.querySelector('dl') as HTMLDListElement
      const fileInput = element.querySelector('input[type="file"]') as HTMLInputElement
      const triggerArea = element.querySelector('dt') as HTMLElement
      const confirmArea = element.querySelector('dd') as HTMLElement
      const infoArea = element.querySelector('._info') as HTMLElement
      const submitButton = element.querySelector('button[type="submit"]') as HTMLElement

      if (
        !dropArea ||
        !fileInput ||
        !triggerArea ||
        !confirmArea ||
        !infoArea ||
        !submitButton
      ) {
        return
      }

      const state = {
        stock: null as StockFile
      }

      const removeFile = () => {
        state.stock = null
        fileInput.files = null
        distribute()
      }

      const distribute = () => {
        if (state.stock) {
          triggerArea.classList.add('-hidden')
          confirmArea.classList.remove('-hidden')
        } else {
          triggerArea.classList.remove('-hidden')
          confirmArea.classList.add('-hidden')
        }

        while (infoArea.firstChild) {
          infoArea.removeChild(infoArea.firstChild)
        }
        if (!state.stock) {
          console.log(submitButton)
          submitButton.setAttribute('disabled', 'disabled')
          return
        }
        submitButton.removeAttribute('disabled')

        const fileInfo = document.createElement('div')
        const preview = document.createElement('div')
        const previewInner = document.createElement('div')
        const remover = document.createElement('button')
        const previewImage = document.createElement('img')

        previewImage.src = state.stock.content ?? ''
        preview.classList.add('_preview')
        preview.addEventListener('click', () => {
          fileInput.click()
        })

        previewInner.appendChild(previewImage)
        preview.appendChild(previewInner)

        fileInfo.classList.add('_fileinfo')
        fileInfo.appendChild(document.createTextNode(state.stock.file.name))

        remover.classList.add('material-icons', '_remover')
        remover.appendChild(document.createTextNode('delete'))
        remover.addEventListener('click', removeFile)

        infoArea.appendChild(preview)
        infoArea.appendChild(fileInfo)
        infoArea.appendChild(remover)
      }

      const readFileAsDataURL = (file: File) =>
        new Promise<string | null>((resolve, reject) => {
          const reader = new FileReader()
          reader.onload = () => resolve(reader.result?.toString() ?? null)
          reader.onerror = () => reject(new Error())
          reader.readAsDataURL(file)
        })

      const accepts = fileInput.accept?.split(',').map((exp) => exp.trim())
      const isAcceptableFile = (file: File) => {
        return (
          !accepts ||
          accepts.some((exp) =>
            exp.includes('/')
              ? file.type === exp
              : exp[0] === '.' &&
                exp
                  .split(',')
                  .map((ex) => ex.trim())
                  .some((ex) => file.name.slice(-ex.length))
          )
        )
      }

      const hasSameFile = async (compFile: File) => {
        const content = await readFileAsDataURL(compFile).catch(() => null)
        return (
          content &&
          state.stock?.content === content &&
          state.stock?.file.name === compFile.name &&
          state.stock?.file.lastModified === compFile.lastModified
        )
      }

      const acceptFiles = async (files: File[]) => {
        await files.reduce(async (acc, file) => {
          const stockTarget = await acc
          if (stockTarget) {
            return stockTarget
          }
          if (isAcceptableFile(file) && !(await hasSameFile(file))) {
            state.stock = {
              file,
              content: await readFileAsDataURL(file)
            }
            return state.stock
          }
          return null
        }, Promise.resolve<StockFile>(null))

        fileInput.files = [state.stock].reduce<DataTransfer>(
          (transfer, stock) => (stock && transfer.items.add(stock.file), transfer),
          new DataTransfer()
        ).files

        distribute()
      }

      dropArea.addEventListener('dragover', (event) => {
        event.preventDefault()
      })

      dropArea.addEventListener('drop', (event) => {
        event.preventDefault()
        acceptFiles(Array.from(event.dataTransfer?.files ?? []))
      })

      fileInput.addEventListener('change', (event: Event) => {
        acceptFiles(Array.from((event.currentTarget as any).files ?? []))
      })

      triggerArea.addEventListener('click', () => {
        fileInput.click()
      })

      distribute()
    }
  }

  Object.keys(tasks).forEach((key) => {
    const uniqueElement = document.querySelector(key)
    uniqueElement && tasks[key]?.(uniqueElement as HTMLElement)
  })
})
