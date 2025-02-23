import { MouseEvent } from 'react';
import Leaflet, { marker } from 'leaflet'

window.addEventListener('load', (_event: Event) => {
  const tasks: {
    [selector: string]: (el: HTMLElement) => void
  } = {
    '[data-map]': (element: HTMLElement) => {
      const [latName, lngName] = (element.dataset['map'] ?? '').split(',')
      const latInput = element.parentNode?.querySelector(`input[name="${latName}"]`) as HTMLInputElement
      const lngInput = element.parentNode?.querySelector(`input[name="${lngName}"]`) as HTMLInputElement

      if (!latInput || !lngInput) {
        return
      }
      const state = {
        marker: null as any | null,
        latlng: {
          lat: null as number | null,
          lng: null as number | null
        }
      }

      const distribute = () => {
        latInput.value = String(state.latlng?.lat ?? '')
        lngInput.value = String(state.latlng?.lng ?? '')
      }

      // express用のtscと併用していて、browser用のtscでのimportが効かないため、
      // window.Lを直接使用して、Leafletの型をここに当てはめて使用する
      const leaflet = (window as any).L as typeof Leaflet
      const map = leaflet.map(element, {
        center: [ Number(latInput.value || 36), Number(lngInput.value || 140)],
        zoom: 8
      })

      const select = (lat: number, lng: number) => {
        if (lat === null || lng === null) {
          state.marker && map.removeLayer(state.marker)
          state.latlng.lat = null
          state.latlng.lng = null
        } else {
          state.marker = leaflet.marker({lat, lng}).addTo(map)
          state.latlng.lat = lat
          state.latlng.lng = lng
        }
      }

      leaflet
        .tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution:
            '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        })
        .addTo(map)

      if (latInput.value && lngInput.value) {
        select(Number(latInput.value), Number(lngInput.value))
      }
      
      map.on('click', (event) => {
        state.marker && map.removeLayer(state.marker)
        select(event.latlng.lat, event.latlng.lng)
        distribute()
      })
    }
  }

  Object.keys(tasks).forEach((key) => {
    const uniqueElement = document.querySelector(key)
    uniqueElement && tasks[key]?.(uniqueElement as HTMLElement)
  })
})
