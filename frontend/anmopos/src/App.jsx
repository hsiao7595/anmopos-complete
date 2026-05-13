import { useEffect } from 'react'
import { useAppStore } from './store/useAppStore'
import Dashboard from './components/dashboard/Dashboard'
import { stores } from './data/mockStores'

function App() {
  const initializeStore = useAppStore(state => state.initializeStore)

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const storeId = params.get('store') || 'yushou'
    const selectedStore = stores.find(s => s.id === storeId)

    if (selectedStore) {
      initializeStore(storeId, selectedStore.name)
    }
  }, [initializeStore])

  return (
    <div className="min-h-screen bg-gray-50">
      <Dashboard />
    </div>
  )
}

export default App
