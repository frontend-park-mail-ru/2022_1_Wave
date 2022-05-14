export const showAuthRequired = (): any => ({
  type: 'authRequired/open',
})

export const closeAuthRequired = (): any => ({
  type: 'authRequired/close',
})

export const showCreatePlaylistForm = (): any => ({
  type: 'createPlaylistForm/open',
})

export const closeCreatePlaylistForm = (): any => ({
  type: 'createPlaylistForm/close',
})
