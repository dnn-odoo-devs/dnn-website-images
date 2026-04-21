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
        const $carouselInner = this.$target.find('.dnn_lightbox_inner');
        $row.empty(); // Limpiar placeholders
        $carouselInner.empty();

        // Detectar configuración actual de las opciones
        const imgFit = this.$target.attr('data-img-fit') || 'dnn_fit_contain';
        const titleVis = this.$target.attr('data-title-visibility') || 'dnn_title_always';
        const isGrid = this.$target.hasClass('s_dnn_gallery_grid');

        attachments.forEach((attachment, index) => {
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
                        <img src="${attachment.image_src}" class="img-fluid ${imgFit} dnn_lightbox_trigger" 
                             data-index="${index}"
                             alt="${attachment.name}"
                             style="cursor: zoom-in;"/>
                    </div>`;
                
                // Inyectar en el Carrusel
                const carouselHtml = `
                    <div class="carousel-item ${index === 0 ? 'active' : ''}">
                        <img src="${attachment.image_src}" class="d-block w-100 h-100" style="object-fit: contain; max-height: 85vh;" alt="${attachment.name}"/>
                    </div>`;
                $carouselInner.append(carouselHtml);
            }
            $row.append(html);
        });

        this._bindLightboxEvents();
    },

    /**
     * Vincular eventos de apertura del modal.
     */
    _bindLightboxEvents: function () {
        const self = this;
        this.$target.find('.dnn_lightbox_trigger').on('click', function (ev) {
            const index = $(ev.currentTarget).data('index');
            const $modal = self.$target.find('#dnnLightbox');
            const $carousel = self.$target.find('#dnnLightboxCarousel');
            
            // Usar la API nativa de Bootstrap 5 para mover el carrusel
            const carousel = bootstrap.Carousel.getOrCreateInstance($carousel[0]);
            carousel.to(index);
            
            const modal = new bootstrap.Modal($modal[0]);
            modal.show();
        });
    },

    // Métodos para reaccionar a cambios en el panel lateral (Snippet Options)
    onBuilt: function () {
        this._super.apply(this, arguments);
        this.selectImages(); // Abrir selector al arrastrar el snippet
    }
});
