/**
 * App
 */
const APP = {
    STATUS: {
        ERROR: 'error',
        OPEN: 'open'
    }
};

/**
 * Product
 */
const PRODUCT = {
    MODEL: 'Product',
    STATUS: {
        NO_STOCK: 'NO_STOCK',
        WITH_STOCK: 'WITH_STOCK'
    },
    TYPE: {
        MARMALADE: 'MARMALADE',
        LIQUEUR: 'MARMALADE'
    }
};

/**
 * Routes
 */
const PATHS = {
    ROUTES: './routes'
};

/**
 * Routes
 */
const ROUTES = {
    PRODUCT: {
        ROOT: '/products',
        LIST: '/products/:id'
    },
    STATUS: {
        NO_STOCK: 'NO_STOCK',
        WITH_SOCK: 'WITH_SOCK'
    }
};

module.exports = {
    APP,
    PRODUCT,
    PATHS,
    ROUTES
};
