import {Extension} from 'resource:///org/gnome/shell/extensions/extension.js';
import * as Main from 'resource:///org/gnome/shell/ui/main.js';
import Clutter from 'gi://Clutter';

export default class BetterAppGridExtension extends Extension {
    enable() {
        // GNOME 45+ przechodziło zmiany w strukturze Main.overview
        // Pobieramy controls, obsługując zarówno starsze (z _overview) jak i nowsze wersje
        const controls = Main.overview._overview?._controls || Main.overview._controls;
        if (!controls) return;

        // Pobieramy widok siatki aplikacji (różne nazwy w zależności od wersji)
        this._appDisplay = controls.appDisplay || controls._appDisplay;
        if (!this._appDisplay) return;

        // Pobieramy siatkę (grid lub _grid)
        this._grid = this._appDisplay.grid || this._appDisplay._grid;
        if (!this._grid) return;

        // Pobieramy menedżera układu (layoutManager lub layout_manager)
        this._layoutManager = this._grid.layoutManager || this._grid.layout_manager;
        if (!this._layoutManager) return;

        // Przechowujemy domyślne ustawienia wyrównania ostatniego rzędu
        this._oldLastRowAlign = this._layoutManager.last_row_align || this._layoutManager.lastRowAlign;

        // Ustawiamy wyśrodkowanie OSTATNIEGO (niepełnego) rzędu ikon
        // Działa na obu nazwach właściwości (jeśli istnieją)
        if ('last_row_align' in this._layoutManager)
            this._layoutManager.last_row_align = Clutter.ActorAlign.CENTER;
        if ('lastRowAlign' in this._layoutManager)
            this._layoutManager.lastRowAlign = Clutter.ActorAlign.CENTER;

        // Odświeżamy układ
        if (this._layoutManager.layout_changed)
            this._layoutManager.layout_changed();
        else if (this._layoutManager.layoutChanged)
            this._layoutManager.layoutChanged();
    }

    disable() {
        if (this._layoutManager && this._oldLastRowAlign !== undefined) {
            // Przywracamy domyślne wyrównanie
            if ('last_row_align' in this._layoutManager)
                this._layoutManager.last_row_align = this._oldLastRowAlign;
            if ('lastRowAlign' in this._layoutManager)
                this._layoutManager.lastRowAlign = this._oldLastRowAlign;

            // Odświeżamy układ
            if (this._layoutManager.layout_changed)
                this._layoutManager.layout_changed();
            else if (this._layoutManager.layoutChanged)
                this._layoutManager.layoutChanged();
        }

        this._appDisplay = null;
        this._grid = null;
        this._layoutManager = null;
    }
}
