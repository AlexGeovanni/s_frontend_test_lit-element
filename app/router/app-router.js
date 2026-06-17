class AppRouter extends EventTarget {
  constructor () {
    super()
    this.currentRoute = window.location.pathname || ''

    // Reacciona al boton atras/adelante del navegador.
    window.addEventListener('popstate', () => {
      this.currentRoute = window.location.pathname
      this._notify()
    })
  }

  navigate (path) {
    if (path === this.currentRoute) return

    // Cambia la URL sin recargar la pagina.
    history.pushState({}, '', path)
    this.currentRoute = path
    this._notify()
  }

  _notify () {
    // Avisa a la app que la ruta cambio.
    this.dispatchEvent(new Event('route-change'))
  }
}

export const router = new AppRouter()
