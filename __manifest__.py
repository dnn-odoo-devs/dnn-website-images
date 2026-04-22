{
    'name': 'DNN Website Images',
    'version': '18.0.1.0.0',
    'dnn_version_iteration': '2',
    'category': 'Website',
    'summary': 'Módulo base para la gestión avanzada de imágenes y galerías DNN.',
    'description': """
Módulo General de Galerías DNN
==============================
Este módulo proporciona snippets de alto impacto visual para el manejo de imágenes:
- Grids responsivos.
- Lightbox integrado.
- Optimización de carga.
    """,
    'author': 'DNN Group / ARIA',
    'depends': ['website'],
    'data': [
        'views/snippets/snippets.xml',
        'views/snippets/gallery_lightbox.xml',
        'views/snippets/gallery_grid_link.xml',
    ],
    'assets': {
        'web.assets_frontend': [
            'dnn_website_images/static/src/scss/gallery_base.scss',
        ],
        'website.assets_wysiwyg': [
            'dnn_website_images/static/src/js/gallery_options.js',
        ],
    },
    'installable': True,
    'application': True,
    'license': 'LGPL-3',
}
