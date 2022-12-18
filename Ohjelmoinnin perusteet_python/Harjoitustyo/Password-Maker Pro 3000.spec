# -*- mode: python ; coding: utf-8 -*-


block_cipher = None


a = Analysis(['Password-Maker Pro 3000.py'],
             pathex=['D:\\JAMK\\Ohjelmoinnin perusteet\\ttc2030\\Harjoitustyo'],
             binaries=[],
             datas=[],
             hiddenimports=[],
             hookspath=[],
             hooksconfig={},
             runtime_hooks=[],
             excludes=[],
             win_no_prefer_redirects=False,
             win_private_assemblies=False,
             cipher=block_cipher,
             noarchive=False)
a.datas += [('icon.ico', 'D:\\JAMK\\Ohjelmoinnin perusteet\\ttc2030\\Harjoitustyo\\icon.ico', 'DATA')]
pyz = PYZ(a.pure, a.zipped_data,
             cipher=block_cipher)

exe = EXE(pyz,
          a.scripts,
          a.binaries,
          a.zipfiles,
          a.datas,  
          [],
          name='Password-Maker Pro 3000',
          debug=False,
          bootloader_ignore_signals=False,
          strip=False,
          upx=True,
          upx_exclude=[],
          runtime_tmpdir=None,
          console=False,
          disable_windowed_traceback=False,
          target_arch=None,
          codesign_identity=None,
          entitlements_file=None,
          icon = 'D:\\JAMK\\Ohjelmoinnin perusteet\\ttc2030\\Harjoitustyo\\icon.ico' )
