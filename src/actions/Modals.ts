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

export const showEditPlaylistForm = (id: number): any => ({
  type: 'editPlaylistForm/open',
  payload: id,
})

export const closeEditPlaylistForm = (): any => ({
  type: 'editPlaylistForm/close',
})
