import {Extension} from 'resource:///org/gnome/shell/extensions/extension.js';
import * as Main from 'resource:///org/gnome/shell/ui/main.js';
import Clutter from 'gi://Clutter';

export default class BetterAppGridExtension extends Extension {
    enable() {
        // Znajdujemy główny obiekt AppDisplay (widok siatki aplikacji)
        this._appDisplay = Main.overview._overview._controls.appDisplay || Main.overview._overview._controls._appDisplay;
        if (!this._appDisplay) return;

        // Pobieramy siatkę
        this._grid = this._appDisplay._grid;
        if (!this._grid) return;

        // Pobieramy menedżera układu (IconGridLayout)
        this._layoutManager = this._grid.layout_manager;
        if (!this._layoutManager) return;

        // Przechowujemy domyślne ustawienia wyrównania ostatniego rzędu
        this._oldLastRowAlign = this._layoutManager.last_row_align;

        // Ustawiamy wyśrodkowanie OSTATNIEGO (niepełnego) rzędu ikon
        this._layoutManager.last_row_align = Clutter.ActorAlign.CENTER;

        // Odświeżamy układ, by zmiany weszły w życie
        this._grid.layout_manager.layout_changed();
    }

    disable() {
        if (this._layoutManager && this._oldLastRowAlign !== undefined) {
            // Przywracamy domyślne wyrównanie
            this._layoutManager.last_row_align = this._oldLastRowAlign;
        }

        if (this._grid && this._grid.layout_manager) {
            this._grid.layout_manager.layout_changed();
        }
    }
}
