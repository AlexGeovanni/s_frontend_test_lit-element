class AppRouter extends EventTarget {
  constructor () {
    super()
    this.currentRoute = window.location.pathname || ''

    window.addEventListener('popstate', () => {
      this.currentRoute = window.location.pathname
      this._notify()
    })
  }

  navigate (path) {
    if (path === this.currentRoute) return

    history.pushState({}, '', path)
    this.currentRoute = path
    this._notify()
  }

  _notify () {
    this.dispatchEvent(new Event('route-change'))
  }
}

export const router = new AppRouter()
