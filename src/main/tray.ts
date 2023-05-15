import { Menu, Tray, nativeImage, BrowserWindow } from 'electron'
import path from 'node:path'

export function createTray(window: BrowserWindow) {
  // app.whenReady().then(() => {}) - import app from electron
  const icon = nativeImage.createFromPath(
    path.resolve(__dirname, 'rotionTemplate.png'),
  )
  const tray = new Tray(icon)

  const menu = Menu.buildFromTemplate([
    { label: 'Rotion', enabled: false },
    { type: 'separator' },
    {
      label: 'Criar novo documento',
      click: () => {
        window.webContents.send('new-document')
      },
      accelerator: 'CommandOrControl+N',
    },
    { type: 'separator' },
    {
      type: 'checkbox',
      label: 'Togle',
      checked: true,
      accelerator: 'CommandOrControl+1',
      acceleratorWorksWhenHidden: true,
      click: () => {
        console.log('toggle')
      },
    },
    { type: 'separator' },
    {
      type: 'submenu',
      label: 'Documentos recentes',
      submenu: [
        {
          label: 'Discover',
          accelerator: 'CommandOrControl+2',
          click: () => {
            console.log('discover')
          },
        },
        { label: 'Ignite' },
        { label: 'Rocketseat' },
      ],
    },
    { type: 'separator' },
    {
      label: 'Sair do Rotion',
      role: 'quit',
    },
  ])

  tray.setContextMenu(menu)
}
