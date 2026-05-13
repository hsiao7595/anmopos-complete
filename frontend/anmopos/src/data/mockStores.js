export const stores = [
  {
    id: 'yushou',
    name: '御手足悦',
    logo: '/logos/yushouzu-yue-logo.svg',
    color: 'purple',
  },
  {
    id: 'zubulao',
    name: '足不老',
    logo: '/logos/zubulao-logo.svg',
    color: 'blue',
  },
]

export const getStore = (storeId) => {
  return stores.find(s => s.id === storeId) || stores[0]
}
