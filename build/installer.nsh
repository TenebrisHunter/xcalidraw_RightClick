; ============================================================
;  installer.nsh — Windows Explorer context menu
;  Fork author: M.A. Klyuchenko (Omsk, OmSTU, KZI, IBa-261)
;  Original: xdagiz — https://github.com/xdagiz/xcalidraw
;  Fork version: 0.1.2 (TenebrisHunter/xcalidraw_RightClick)
; ============================================================

!macro customInstall
  ; Files
  WriteRegStr HKEY_CLASSES_ROOT "*\shell\OpenWithXcalidrawRC" "" "Open with xcalidraw (RightClick)"
  WriteRegStr HKEY_CLASSES_ROOT "*\shell\OpenWithXcalidrawRC\command" "" '"$INSTDIR\xcalidraw.exe" "%1"'
  WriteRegStr HKEY_CLASSES_ROOT "*\shell\OpenWithXcalidrawRC" "Icon" "$INSTDIR\xcalidraw.exe"

  ; Folders
  WriteRegStr HKEY_CLASSES_ROOT "Directory\shell\OpenWithXcalidrawRC" "" "Open with xcalidraw (RightClick)"
  WriteRegStr HKEY_CLASSES_ROOT "Directory\shell\OpenWithXcalidrawRC\command" "" '"$INSTDIR\xcalidraw.exe" "%1"'
  WriteRegStr HKEY_CLASSES_ROOT "Directory\shell\OpenWithXcalidrawRC" "Icon" "$INSTDIR\xcalidraw.exe"

  ; Folder background
  WriteRegStr HKEY_CLASSES_ROOT "Directory\Background\shell\OpenWithXcalidrawRC" "" "Open with xcalidraw (RightClick)"
  WriteRegStr HKEY_CLASSES_ROOT "Directory\Background\shell\OpenWithXcalidrawRC\command" "" '"$INSTDIR\xcalidraw.exe" "%V"'
  WriteRegStr HKEY_CLASSES_ROOT "Directory\Background\shell\OpenWithXcalidrawRC" "Icon" "$INSTDIR\xcalidraw.exe"
!macroend

!macro customUnInstall
  DeleteRegKey HKEY_CLASSES_ROOT "*\shell\OpenWithXcalidrawRC"
  DeleteRegKey HKEY_CLASSES_ROOT "*\shell\Open with xcalidraw"
  DeleteRegKey HKEY_CLASSES_ROOT "Directory\shell\OpenWithXcalidrawRC"
  DeleteRegKey HKEY_CLASSES_ROOT "Directory\shell\Open with xcalidraw"
  DeleteRegKey HKEY_CLASSES_ROOT "Directory\Background\shell\OpenWithXcalidrawRC"
  DeleteRegKey HKEY_CLASSES_ROOT "Directory\Background\shell\Open with xcalidraw"
!macroend