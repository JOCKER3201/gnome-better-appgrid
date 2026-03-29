UUID = better-appgrid@jocker.com
EXT_DIR = $(HOME)/.local/share/gnome-shell/extensions/$(UUID)
FILES = metadata.json extension.js stylesheet.css

.PHONY: install clean uninstall

install:
	@echo "Instalowanie rozszerzenia $(UUID) do $(EXT_DIR)..."
	@mkdir -p $(EXT_DIR)
	@cp $(FILES) $(EXT_DIR)
	@echo "Instalacja zakończona. Uruchom ponownie GNOME Shell i włącz rozszerzenie."

uninstall:
	@echo "Usuwanie rozszerzenia $(UUID) z $(EXT_DIR)..."
	@rm -rf $(EXT_DIR)
	@echo "Rozszerzenie usunięte."

clean:
	@echo "Brak plików do wyczyszczenia."
