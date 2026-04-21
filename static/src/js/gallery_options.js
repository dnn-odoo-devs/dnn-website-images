/** @odoo-module **/

import { _t } from "@web/core/l10n/translation";
import options from "@web_editor/js/editor/snippets.options";

options.registry.DnnGalleryOptions = options.Class.extend({
    /**
     * Abrir el MediaDialog para selección múltiple de imágenes.
     * Compatible con Odoo 18 y 19.
     */
    selectImages: async function () {
        const self = this;
        const $row = this.$target.find('.dnn_gallery_row');
        
        // Cargar el MediaDialog dinámicamente
        const MediaDialog = this.bindService("dialog").add;
        
        this.call("dialog", "add", this.MediaDialog, {
            multiSelect: true,
            onlyImages: true,
            save: (attachments) => {
                if (attachments.length > 0) {
                    self._renderGallery(attachments);
                }
            },
        });
    },

    /**
     * Renderizar las imágenes en el grid con la estructura de simetría.
     */
    _renderGallery: function (attachments) {
        const $row = this.$target.find('.dnn_gallery_row');
        $row.empty(); // Limpiar placeholders

        // Detectar configuración actual de las opciones
        const imgFit = this.$target.attr('data-img-fit') || 'dnn_fit_contain';
        const titleVis = this.$target.attr('data-title-visibility') || 'dnn_title_always';
        const isGrid = this.$target.hasClass('s_dnn_gallery_grid');

        attachments.forEach(attachment => {
            let html = '';
            if (isGrid) {
                // Variante NAVEGACIÓN (Link + Título)
                html = `
                    <div class="col-lg-3 dnn_gallery_item mb-4">
                        <a href="#">
                            <img src="${attachment.image_src}" class="img-fluid ${imgFit}" alt="${attachment.name}"/>
                            <div class="dnn_gallery_title_overlay ${titleVis}">
                                <span>${attachment.name}</span>
                            </div>
                        </a>
                    </div>`;
            } else {
                // Variante LIGHTBOX
                html = `
                    <div class="col-lg-3 dnn_gallery_item mb-4">
                        <img src="${attachment.image_src}" class="img-fluid ${imgFit}" 
                             data-bs-toggle="modal" data-bs-target="#dnnLightbox" 
                             alt="${attachment.name}"/>
                    </div>`;
            }
            $row.append(html);
        });
    },

    // Métodos para reaccionar a cambios en el panel lateral (Snippet Options)
    onBuilt: function () {
        this._super.apply(this, arguments);
        this.selectImages(); // Abrir selector al arrastrar el snippet
    }
});
