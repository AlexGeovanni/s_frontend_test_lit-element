class AppRouter extends EventTarget {
  constructor () {
    super()
    this.currentRoute = window.location.pathname || ''

    window.addEventListener('popstate', () => {
      this.currentRoute = window.location.pathname
      this.notify()
    })
  }

  navigate (path) {
    if (path === this.currentRoute) return

    history.pushState({}, '', path)
    this.currentRoute = path
    this.notify()
  }

  notify () {
    this.dispatchEvent(new Event('route-change'))
  }
}

export const router = new AppRouter()
