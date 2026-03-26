export function useDashboardPanels() {
  const notificationsOpen = useState('dashboard-notifications-open', () => false)
  const userMenuOpen = useState('dashboard-user-menu-open', () => false)
  const profileModalOpen = useState('dashboard-profile-modal-open', () => false)
  const commandSearchOpen = useState('dashboard-command-search-open', () => false)

  function closeAllPanels() {
    notificationsOpen.value = false
    userMenuOpen.value = false
    profileModalOpen.value = false
    commandSearchOpen.value = false
  }

  return {
    notificationsOpen,
    userMenuOpen,
    profileModalOpen,
    commandSearchOpen,
    closeAllPanels,
  }
}
