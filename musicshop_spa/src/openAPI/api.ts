/* tslint:disable */
/* eslint-disable */
/**
 * OpenAPIDefinition
 * Music shop REST API
 *
 * The version of the OpenAPI document: 1.0.0
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */


import { Configuration } from './configuration';
import globalAxios, { AxiosPromise, AxiosInstance, AxiosRequestConfig } from 'axios';
// Some imports not used depending on template conditions
// @ts-ignore
import { DUMMY_BASE_URL, assertParamExists, setApiKeyToObject, setBasicAuthToObject, setBearerAuthToObject, setOAuthToObject, setSearchParams, serializeDataIfNeeded, toPathString, createRequestFunction } from './common';
// @ts-ignore
import { BASE_PATH, COLLECTION_FORMATS, RequestArgs, BaseAPI, RequiredError } from './base';

/**
 * 
 * @export
 * @interface AlbumDTO
 */
export interface AlbumDTO {
    /**
     * 
     * @type {string}
     * @memberof AlbumDTO
     */
    'title'?: string;
    /**
     * 
     * @type {number}
     * @memberof AlbumDTO
     */
    'price'?: number;
    /**
     * 
     * @type {number}
     * @memberof AlbumDTO
     */
    'stock'?: number;
    /**
     * 
     * @type {string}
     * @memberof AlbumDTO
     */
    'mediumType'?: AlbumDTOMediumTypeEnum;
    /**
     * 
     * @type {string}
     * @memberof AlbumDTO
     */
    'releaseDate'?: string;
    /**
     * 
     * @type {AlbumId}
     * @memberof AlbumDTO
     */
    'albumId'?: AlbumId;
    /**
     * 
     * @type {string}
     * @memberof AlbumDTO
     */
    'label'?: string;
    /**
     * 
     * @type {Set<SongDTO>}
     * @memberof AlbumDTO
     */
    'songs'?: Set<SongDTO>;
    /**
     * 
     * @type {number}
     * @memberof AlbumDTO
     */
    'quantityToAddToCart'?: number;
}

export const AlbumDTOMediumTypeEnum = {
    Cd: 'CD',
    Digital: 'DIGITAL',
    Vinyl: 'VINYL'
} as const;

export type AlbumDTOMediumTypeEnum = typeof AlbumDTOMediumTypeEnum[keyof typeof AlbumDTOMediumTypeEnum];

/**
 * 
 * @export
 * @interface AlbumId
 */
export interface AlbumId {
    /**
     * 
     * @type {string}
     * @memberof AlbumId
     */
    'albumId'?: string;
}
/**
 * 
 * @export
 * @interface ArtistDTO
 */
export interface ArtistDTO {
    /**
     * 
     * @type {string}
     * @memberof ArtistDTO
     */
    'name'?: string;
}
/**
 * 
 * @export
 * @interface CartLineItemDTO
 */
export interface CartLineItemDTO {
    /**
     * 
     * @type {string}
     * @memberof CartLineItemDTO
     */
    'mediumType'?: CartLineItemDTOMediumTypeEnum;
    /**
     * 
     * @type {string}
     * @memberof CartLineItemDTO
     */
    'name'?: string;
    /**
     * 
     * @type {number}
     * @memberof CartLineItemDTO
     */
    'quantity'?: number;
    /**
     * 
     * @type {number}
     * @memberof CartLineItemDTO
     */
    'price'?: number;
    /**
     * 
     * @type {number}
     * @memberof CartLineItemDTO
     */
    'stock'?: number;
}

export const CartLineItemDTOMediumTypeEnum = {
    Cd: 'CD',
    Digital: 'DIGITAL',
    Vinyl: 'VINYL'
} as const;

export type CartLineItemDTOMediumTypeEnum = typeof CartLineItemDTOMediumTypeEnum[keyof typeof CartLineItemDTOMediumTypeEnum];

/**
 * 
 * @export
 * @interface InvoiceLineItemDTO
 */
export interface InvoiceLineItemDTO {
    /**
     * 
     * @type {string}
     * @memberof InvoiceLineItemDTO
     */
    'mediumType'?: InvoiceLineItemDTOMediumTypeEnum;
    /**
     * 
     * @type {string}
     * @memberof InvoiceLineItemDTO
     */
    'name'?: string;
    /**
     * 
     * @type {number}
     * @memberof InvoiceLineItemDTO
     */
    'quantity'?: number;
    /**
     * 
     * @type {number}
     * @memberof InvoiceLineItemDTO
     */
    'price'?: number;
    /**
     * 
     * @type {number}
     * @memberof InvoiceLineItemDTO
     */
    'returnedQuantity'?: number;
}

export const InvoiceLineItemDTOMediumTypeEnum = {
    Cd: 'CD',
    Digital: 'DIGITAL',
    Vinyl: 'VINYL'
} as const;

export type InvoiceLineItemDTOMediumTypeEnum = typeof InvoiceLineItemDTOMediumTypeEnum[keyof typeof InvoiceLineItemDTOMediumTypeEnum];

/**
 * 
 * @export
 * @interface ShoppingCartDTO
 */
export interface ShoppingCartDTO {
    /**
     * 
     * @type {string}
     * @memberof ShoppingCartDTO
     */
    'ownerId'?: string;
    /**
     * 
     * @type {Array<CartLineItemDTO>}
     * @memberof ShoppingCartDTO
     */
    'cartLineItems'?: Array<CartLineItemDTO>;
}
/**
 * 
 * @export
 * @interface SongDTO
 */
export interface SongDTO {
    /**
     * 
     * @type {string}
     * @memberof SongDTO
     */
    'title'?: string;
    /**
     * 
     * @type {number}
     * @memberof SongDTO
     */
    'price'?: number;
    /**
     * 
     * @type {number}
     * @memberof SongDTO
     */
    'stock'?: number;
    /**
     * 
     * @type {string}
     * @memberof SongDTO
     */
    'mediumType'?: SongDTOMediumTypeEnum;
    /**
     * 
     * @type {string}
     * @memberof SongDTO
     */
    'releaseDate'?: string;
    /**
     * 
     * @type {string}
     * @memberof SongDTO
     */
    'genre'?: string;
    /**
     * 
     * @type {Array<ArtistDTO>}
     * @memberof SongDTO
     */
    'artists'?: Array<ArtistDTO>;
    /**
     * 
     * @type {Set<AlbumDTO>}
     * @memberof SongDTO
     */
    'inAlbum'?: Set<AlbumDTO>;
}

export const SongDTOMediumTypeEnum = {
    Cd: 'CD',
    Digital: 'DIGITAL',
    Vinyl: 'VINYL'
} as const;

export type SongDTOMediumTypeEnum = typeof SongDTOMediumTypeEnum[keyof typeof SongDTOMediumTypeEnum];

/**
 * 
 * @export
 * @interface UserDataDTO
 */
export interface UserDataDTO {
    /**
     * 
     * @type {string}
     * @memberof UserDataDTO
     */
    'emailAddress'?: string;
    /**
     * 
     * @type {string}
     * @memberof UserDataDTO
     */
    'password'?: string;
}

/**
 * DefaultApi - axios parameter creator
 * @export
 */
export const DefaultApiAxiosParamCreator = function (configuration?: Configuration) {
    return {
        /**
         * 
         * @param {string} [authorization] 
         * @param {AlbumDTO} [albumDTO] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        addToCart: async (authorization?: string, albumDTO?: AlbumDTO, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            const localVarPath = `/api/albums/addToCart`;
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'POST', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;

            if (authorization !== undefined && authorization !== null) {
                localVarHeaderParameter['Authorization'] = String(authorization);
            }


    
            localVarHeaderParameter['Content-Type'] = 'application/json';

            setSearchParams(localVarUrlObj, localVarQueryParameter);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};
            localVarRequestOptions.data = serializeDataIfNeeded(albumDTO, localVarRequestOptions, configuration)

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * 
         * @param {string} [authorization] 
         * @param {Array<InvoiceLineItemDTO>} [invoiceLineItemDTO] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        buyProduct: async (authorization?: string, invoiceLineItemDTO?: Array<InvoiceLineItemDTO>, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            const localVarPath = `/api/shoppingCart/buyProducts`;
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'POST', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;

            if (authorization !== undefined && authorization !== null) {
                localVarHeaderParameter['Authorization'] = String(authorization);
            }


    
            localVarHeaderParameter['Content-Type'] = 'application/json';

            setSearchParams(localVarUrlObj, localVarQueryParameter);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};
            localVarRequestOptions.data = serializeDataIfNeeded(invoiceLineItemDTO, localVarRequestOptions, configuration)

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * 
         * @param {string} [authorization] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        clearShoppingCart: async (authorization?: string, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            const localVarPath = `/api/shoppingCart/clear`;
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'GET', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;

            if (authorization !== undefined && authorization !== null) {
                localVarHeaderParameter['Authorization'] = String(authorization);
            }


    
            setSearchParams(localVarUrlObj, localVarQueryParameter);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * 
         * @param {string} [authorization] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        displayShoppingCart: async (authorization?: string, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            const localVarPath = `/api/shoppingCart/display`;
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'GET', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;

            if (authorization !== undefined && authorization !== null) {
                localVarHeaderParameter['Authorization'] = String(authorization);
            }


    
            setSearchParams(localVarUrlObj, localVarQueryParameter);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * 
         * @param {string} albumId 
         * @param {string} [authorization] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        findAlbumByAlbumId: async (albumId: string, authorization?: string, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'albumId' is not null or undefined
            assertParamExists('findAlbumByAlbumId', 'albumId', albumId)
            const localVarPath = `/api/album/{albumId}`
                .replace(`{${"albumId"}}`, encodeURIComponent(String(albumId)));
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'GET', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;

            if (authorization !== undefined && authorization !== null) {
                localVarHeaderParameter['Authorization'] = String(authorization);
            }


    
            setSearchParams(localVarUrlObj, localVarQueryParameter);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * 
         * @param {string} songTitle 
         * @param {string} [authorization] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        findAlbumsBySongTitle: async (songTitle: string, authorization?: string, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'songTitle' is not null or undefined
            assertParamExists('findAlbumsBySongTitle', 'songTitle', songTitle)
            const localVarPath = `/api/albums/{songTitle}`
                .replace(`{${"songTitle"}}`, encodeURIComponent(String(songTitle)));
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'GET', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;

            if (authorization !== undefined && authorization !== null) {
                localVarHeaderParameter['Authorization'] = String(authorization);
            }


    
            setSearchParams(localVarUrlObj, localVarQueryParameter);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * 
         * @param {UserDataDTO} [userDataDTO] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        login: async (userDataDTO?: UserDataDTO, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            const localVarPath = `/api/login`;
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'POST', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;


    
            localVarHeaderParameter['Content-Type'] = 'application/json';

            setSearchParams(localVarUrlObj, localVarQueryParameter);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};
            localVarRequestOptions.data = serializeDataIfNeeded(userDataDTO, localVarRequestOptions, configuration)

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * 
         * @param {UserDataDTO} [userDataDTO] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        loginWeb: async (userDataDTO?: UserDataDTO, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            const localVarPath = `/api/loginWeb`;
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'POST', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;


    
            localVarHeaderParameter['Content-Type'] = 'application/json';

            setSearchParams(localVarUrlObj, localVarQueryParameter);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};
            localVarRequestOptions.data = serializeDataIfNeeded(userDataDTO, localVarRequestOptions, configuration)

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        welcome: async (options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            const localVarPath = `/api`;
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'GET', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;


    
            setSearchParams(localVarUrlObj, localVarQueryParameter);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
    }
};

/**
 * DefaultApi - functional programming interface
 * @export
 */
export const DefaultApiFp = function(configuration?: Configuration) {
    const localVarAxiosParamCreator = DefaultApiAxiosParamCreator(configuration)
    return {
        /**
         * 
         * @param {string} [authorization] 
         * @param {AlbumDTO} [albumDTO] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async addToCart(authorization?: string, albumDTO?: AlbumDTO, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<Array<string>>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.addToCart(authorization, albumDTO, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
        /**
         * 
         * @param {string} [authorization] 
         * @param {Array<InvoiceLineItemDTO>} [invoiceLineItemDTO] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async buyProduct(authorization?: string, invoiceLineItemDTO?: Array<InvoiceLineItemDTO>, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<boolean>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.buyProduct(authorization, invoiceLineItemDTO, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
        /**
         * 
         * @param {string} [authorization] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async clearShoppingCart(authorization?: string, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<boolean>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.clearShoppingCart(authorization, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
        /**
         * 
         * @param {string} [authorization] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async displayShoppingCart(authorization?: string, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<ShoppingCartDTO>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.displayShoppingCart(authorization, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
        /**
         * 
         * @param {string} albumId 
         * @param {string} [authorization] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async findAlbumByAlbumId(albumId: string, authorization?: string, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<AlbumDTO>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.findAlbumByAlbumId(albumId, authorization, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
        /**
         * 
         * @param {string} songTitle 
         * @param {string} [authorization] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async findAlbumsBySongTitle(songTitle: string, authorization?: string, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<Array<AlbumDTO>>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.findAlbumsBySongTitle(songTitle, authorization, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
        /**
         * 
         * @param {UserDataDTO} [userDataDTO] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async login(userDataDTO?: UserDataDTO, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<string>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.login(userDataDTO, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
        /**
         * 
         * @param {UserDataDTO} [userDataDTO] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async loginWeb(userDataDTO?: UserDataDTO, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<string>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.loginWeb(userDataDTO, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
        /**
         * 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async welcome(options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<string>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.welcome(options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
    }
};

/**
 * DefaultApi - factory interface
 * @export
 */
export const DefaultApiFactory = function (configuration?: Configuration, basePath?: string, axios?: AxiosInstance) {
    const localVarFp = DefaultApiFp(configuration)
    return {
        /**
         * 
         * @param {string} [authorization] 
         * @param {AlbumDTO} [albumDTO] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        addToCart(authorization?: string, albumDTO?: AlbumDTO, options?: any): AxiosPromise<Array<string>> {
            return localVarFp.addToCart(authorization, albumDTO, options).then((request) => request(axios, basePath));
        },
        /**
         * 
         * @param {string} [authorization] 
         * @param {Array<InvoiceLineItemDTO>} [invoiceLineItemDTO] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        buyProduct(authorization?: string, invoiceLineItemDTO?: Array<InvoiceLineItemDTO>, options?: any): AxiosPromise<boolean> {
            return localVarFp.buyProduct(authorization, invoiceLineItemDTO, options).then((request) => request(axios, basePath));
        },
        /**
         * 
         * @param {string} [authorization] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        clearShoppingCart(authorization?: string, options?: any): AxiosPromise<boolean> {
            return localVarFp.clearShoppingCart(authorization, options).then((request) => request(axios, basePath));
        },
        /**
         * 
         * @param {string} [authorization] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        displayShoppingCart(authorization?: string, options?: any): AxiosPromise<ShoppingCartDTO> {
            return localVarFp.displayShoppingCart(authorization, options).then((request) => request(axios, basePath));
        },
        /**
         * 
         * @param {string} albumId 
         * @param {string} [authorization] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        findAlbumByAlbumId(albumId: string, authorization?: string, options?: any): AxiosPromise<AlbumDTO> {
            return localVarFp.findAlbumByAlbumId(albumId, authorization, options).then((request) => request(axios, basePath));
        },
        /**
         * 
         * @param {string} songTitle 
         * @param {string} [authorization] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        findAlbumsBySongTitle(songTitle: string, authorization?: string, options?: any): AxiosPromise<Array<AlbumDTO>> {
            return localVarFp.findAlbumsBySongTitle(songTitle, authorization, options).then((request) => request(axios, basePath));
        },
        /**
         * 
         * @param {UserDataDTO} [userDataDTO] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        login(userDataDTO?: UserDataDTO, options?: any): AxiosPromise<string> {
            return localVarFp.login(userDataDTO, options).then((request) => request(axios, basePath));
        },
        /**
         * 
         * @param {UserDataDTO} [userDataDTO] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        loginWeb(userDataDTO?: UserDataDTO, options?: any): AxiosPromise<string> {
            return localVarFp.loginWeb(userDataDTO, options).then((request) => request(axios, basePath));
        },
        /**
         * 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        welcome(options?: any): AxiosPromise<string> {
            return localVarFp.welcome(options).then((request) => request(axios, basePath));
        },
    };
};

/**
 * DefaultApi - object-oriented interface
 * @export
 * @class DefaultApi
 * @extends {BaseAPI}
 */
export class DefaultApi extends BaseAPI {
    /**
     * 
     * @param {string} [authorization] 
     * @param {AlbumDTO} [albumDTO] 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof DefaultApi
     */
    public addToCart(authorization?: string, albumDTO?: AlbumDTO, options?: AxiosRequestConfig) {
        return DefaultApiFp(this.configuration).addToCart(authorization, albumDTO, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * 
     * @param {string} [authorization] 
     * @param {Array<InvoiceLineItemDTO>} [invoiceLineItemDTO] 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof DefaultApi
     */
    public buyProduct(authorization?: string, invoiceLineItemDTO?: Array<InvoiceLineItemDTO>, options?: AxiosRequestConfig) {
        return DefaultApiFp(this.configuration).buyProduct(authorization, invoiceLineItemDTO, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * 
     * @param {string} [authorization] 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof DefaultApi
     */
    public clearShoppingCart(authorization?: string, options?: AxiosRequestConfig) {
        return DefaultApiFp(this.configuration).clearShoppingCart(authorization, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * 
     * @param {string} [authorization] 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof DefaultApi
     */
    public displayShoppingCart(authorization?: string, options?: AxiosRequestConfig) {
        return DefaultApiFp(this.configuration).displayShoppingCart(authorization, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * 
     * @param {string} albumId 
     * @param {string} [authorization] 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof DefaultApi
     */
    public findAlbumByAlbumId(albumId: string, authorization?: string, options?: AxiosRequestConfig) {
        return DefaultApiFp(this.configuration).findAlbumByAlbumId(albumId, authorization, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * 
     * @param {string} songTitle 
     * @param {string} [authorization] 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof DefaultApi
     */
    public findAlbumsBySongTitle(songTitle: string, authorization?: string, options?: AxiosRequestConfig) {
        return DefaultApiFp(this.configuration).findAlbumsBySongTitle(songTitle, authorization, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * 
     * @param {UserDataDTO} [userDataDTO] 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof DefaultApi
     */
    public login(userDataDTO?: UserDataDTO, options?: AxiosRequestConfig) {
        return DefaultApiFp(this.configuration).login(userDataDTO, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * 
     * @param {UserDataDTO} [userDataDTO] 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof DefaultApi
     */
    public loginWeb(userDataDTO?: UserDataDTO, options?: AxiosRequestConfig) {
        return DefaultApiFp(this.configuration).loginWeb(userDataDTO, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof DefaultApi
     */
    public welcome(options?: AxiosRequestConfig) {
        return DefaultApiFp(this.configuration).welcome(options).then((request) => request(this.axios, this.basePath));
    }
}


