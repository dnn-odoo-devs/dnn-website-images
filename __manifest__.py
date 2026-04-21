{
    'name': 'DNN Website Images',
    'version': '18.0.1.0.0.1',
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
        # 'views/snippets/gallery_templates.xml',
    ],
    'assets': {
        'web.assets_frontend': [
            # 'dnn_website_images/static/src/scss/gallery_styles.scss',
            # 'dnn_website_images/static/src/js/gallery_lightbox.js',
        ],
    },
    'installable': True,
    'application': True,
    'license': 'LGPL-3',
}
