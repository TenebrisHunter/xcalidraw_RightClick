!macro customInstall
  ; Пункт для файлов (любой файл)
  WriteRegStr HKEY_CLASSES_ROOT "*\shell\Open with xcalidraw\command" "" '"$INSTDIR\xcalidraw.exe" "%1"'
  WriteRegStr HKEY_CLASSES_ROOT "*\shell\Open with xcalidraw" "Icon" "$INSTDIR\xcalidraw.exe"

  ; Пункт для папок
  WriteRegStr HKEY_CLASSES_ROOT "Directory\shell\Open with xcalidraw\command" "" '"$INSTDIR\xcalidraw.exe" "%1"'
  WriteRegStr HKEY_CLASSES_ROOT "Directory\shell\Open with xcalidraw" "Icon" "$INSTDIR\xcalidraw.exe"

  ; Пункт для фона папки (клик по пустому месту внутри папки)
  WriteRegStr HKEY_CLASSES_ROOT "Directory\Background\shell\Open with xcalidraw\command" "" '"$INSTDIR\xcalidraw.exe" "%V"'
  WriteRegStr HKEY_CLASSES_ROOT "Directory\Background\shell\Open with xcalidraw" "Icon" "$INSTDIR\xcalidraw.exe"
!macroend

!macro customUnInstall
  DeleteRegKey HKEY_CLASSES_ROOT "*\shell\Open with xcalidraw"
  DeleteRegKey HKEY_CLASSES_ROOT "Directory\shell\Open with xcalidraw"
  DeleteRegKey HKEY_CLASSES_ROOT "Directory\Background\shell\Open with xcalidraw"
!macroend
