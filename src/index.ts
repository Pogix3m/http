/* eslint-disable @typescript-eslint/no-explicit-any */
import RateLimit, { TRateLimit } from "@pogix3m/rate-limit";
import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";
import { v4 } from "uuid";

export type THTTOptions = Partial<{
    errorFormatter: (error: unknown) => never;
    logger: Partial<{
        info: (message: string, data?: unknown) => void;
        error: (message: string, data?: unknown) => void;
    }>;
    rateLimit: TRateLimit;
}>;

export type THTTPConfig<Data = any> = AxiosRequestConfig<Data> & Partial<{ weight: number; requestId: string }>;

export interface IHTTP<Response = unknown>{
    Delete<T extends Response>(url: string, config?: THTTPConfig): Promise<THTTPResponse<T>>;
    Get<T extends Response>(url: string, config?: THTTPConfig): Promise<THTTPResponse<T>>;
    Patch<T extends Response>(url: string, data?: unknown, config?: THTTPConfig): Promise<THTTPResponse<T>>;
    Post<T extends Response>(url: string, data?: unknown, config?: THTTPConfig): Promise<THTTPResponse<T>>;
    Put<T extends Response>(url: string, data?: unknown, config?: THTTPConfig): Promise<THTTPResponse<T>>;
}

export type THTTPResponse<Data = unknown> = {
    status: number;
    statusText: string;
    headers: Record<string, any>;
    data: Data;
};

export class HTTPError extends Error {
    private readonly data?: unknown;

    public get Data(): unknown | undefined {
        return this.data;
    }

    public get Message(): string {
        return this.message;
    }

    public constructor(error: AxiosError, options?: Record<string, unknown>) {
        const code: string = error.response?.status?.toString() || error.code?.toString() || "Unknown Code";
        const message: string = error.response?.statusText || error.message || "Unknown error message";
        super(
            `${ code }: ${ message }`,
        );
        this.data = {
            ...options,
            headers: error.response?.headers,
            data: error.response?.data,
        };
    }

    public static IsHTTPError(error: unknown): error is AxiosError {
        return error
            && typeof error === "object"
            && "isAxiosError" in error
            && (error as any).isAxiosError;
    }
}

export default class HTTP<Response> implements IHTTP<Response>{
    private readonly baseURL: string;
    private readonly defaultConfig: THTTPConfig;
    private readonly errorFormatter?: THTTOptions["errorFormatter"];
    private readonly logger?: THTTOptions["logger"];
    private readonly rateLimit?: RateLimit;

    public constructor(baseURL: string, config: THTTPConfig = {}, options: THTTOptions = {}) {
        const { errorFormatter, logger, rateLimit } = options;
        this.baseURL = baseURL;
        this.defaultConfig = config;
        this.errorFormatter = errorFormatter;
        this.logger = logger;
        if (rateLimit) { this.rateLimit = new RateLimit(rateLimit); }
    }

    private FormatError(errorData: {
        error: unknown;
        method: string;
        url: string;
        config?: THTTPConfig;
        requestId: string;
        requestData?: unknown;
    }): never {
        const { error, method, url, config, requestId, requestData } = errorData;

        if (HTTPError.IsHTTPError(error)) {
            const httpError: HTTPError = new HTTPError(
                error,
                { ...config, baseUrl: this.baseURL, url, requestData, method, requestId },
            );
            this.logger?.error?.(httpError.Message, httpError.Data);
            this.errorFormatter?.(httpError);

            throw httpError;
        }
        this.logger?.error?.((error as Error)?.message, JSON.stringify(error));

        throw error;
    }

    private GetResponse<T>(response: AxiosResponse<T>): THTTPResponse<T> {
        const { status, statusText, data, headers } = response;

        return {
            status,
            statusText,
            headers,
            data,
        };
    }

    public async Delete<T extends Response>(url: string, config?: THTTPConfig): Promise<THTTPResponse<T>> {
        const requestId: string = config?.requestId || v4();
        this.logger?.info?.(
            `Delete '${ this.baseURL }${ url }' request`,
            {
                config,
                requestId,
            },
        );
        await this.rateLimit?.Check(config?.weight);
        const start: number = Date.now();
        const response: THTTPResponse<T> = await axios
            .delete<T>(
                url,
                {
                    ...this.defaultConfig,
                    ...config,
                    baseURL: this.baseURL,
                })
            .then((result: AxiosResponse<T>) => this.GetResponse(result))
            .catch((error: unknown) => this.FormatError({
                error,
                method: "delete",
                url,
                config,
                requestId,
            }));
        const totalTime: number = Date.now() - start;
        this.logger?.info?.(
            `Delete '${ this.baseURL }${ url }' response`,
            {
                requestId,
                response,
                totalTimeMS: totalTime,
            },
        );

        return response;
    }

    public async Get<T extends Response>(url: string, config?: THTTPConfig): Promise<THTTPResponse<T>> {
        const requestId: string = config?.requestId || v4();
        this.logger?.info?.(
            `Get '${ this.baseURL }${ url }' request`,
            {
                config,
                requestId,
            },
        );
        await this.rateLimit?.Check(config?.weight);
        const start: number = Date.now();
        const response: THTTPResponse<T> = await axios
            .get<T>(
                url,
                {
                    ...this.defaultConfig,
                    ...config,
                    baseURL: this.baseURL,
                })
            .then((result: AxiosResponse<T>) => this.GetResponse(result))
            .catch((error: unknown) => this.FormatError({ error, method: "get", url, config, requestId }));
        const totalTime: number = Date.now() - start;
        this.logger?.info?.(
            `Get '${ this.baseURL }${ url }' response`,
            {
                requestId,
                response,
                totalTimeMS: totalTime,
            },
        );

        return response;
    }

    public async Patch<T extends Response>(
        url: string,
        data?: unknown,
        config?: THTTPConfig,
    ): Promise<THTTPResponse<T>> {
        const requestId: string = config?.requestId || v4();
        this.logger?.info?.(
            `Patch '${ this.baseURL }${ url }' request`,
            {
                data,
                config,
                requestId,
            },
        );
        await this.rateLimit?.Check(config?.weight);
        const start: number = Date.now();
        const response: THTTPResponse<T> = await axios
            .patch<T>(
                url,
                data,
                {
                    ...this.defaultConfig,
                    ...config,
                    baseURL: this.baseURL,
                })
            .then((result: AxiosResponse<T>) => this.GetResponse(result))
            .catch((error: unknown) => this.FormatError({
                error,
                method: "patch",
                url,
                config,
                requestId,
                requestData: data,
            }));
        const totalTime: number = Date.now() - start;
        this.logger?.info?.(
            `Patch '${ this.baseURL }${ url }' response`,
            {
                requestId,
                response,
                totalTimeMS: totalTime,
            },
        );

        return response;
    }

    public async Post<T extends Response>(
        url: string,
        data?: unknown,
        config?: THTTPConfig,
    ): Promise<THTTPResponse<T>> {
        const requestId: string = config?.requestId || v4();
        this.logger?.info?.(
            `Post '${ this.baseURL }${ url }' request`,
            {
                data,
                config,
                requestId,
            },
        );
        await this.rateLimit?.Check(config?.weight);
        const start: number = Date.now();
        const response: THTTPResponse<T> = await axios
            .post<T>(
                url,
                data,
                {
                    ...this.defaultConfig,
                    ...config,
                    baseURL: this.baseURL,
                })
            .then((result: AxiosResponse<T>) => this.GetResponse(result))
            .catch((error: unknown) => this.FormatError({
                error,
                method: "post",
                url,
                config,
                requestId,
                requestData: data,
            }));
        const totalTime: number = Date.now() - start;
        this.logger?.info?.(
            `Post '${ this.baseURL }${ url }' response`,
            {
                requestId,
                requestData: data,
                response,
                totalTimeMS: totalTime,
            },
        );

        return response;
    }

    public async Put<T extends Response>(
        url: string,
        data?: unknown,
        config?: THTTPConfig,
    ): Promise<THTTPResponse<T>> {
        const requestId: string = config?.requestId || v4();
        this.logger?.info?.(
            `Put '${ this.baseURL }${ url }' request`,
            {
                data,
                config,
                requestId,
            },
        );
        await this.rateLimit?.Check(config?.weight);
        const start: number = Date.now();
        const response: THTTPResponse<T> = await axios
            .put<T>(
                url,
                data,
                {
                    ...this.defaultConfig,
                    ...config,
                    baseURL: this.baseURL,
                })
            .then((result: AxiosResponse<T>) => this.GetResponse(result))
            .catch((error: unknown) => this.FormatError({
                error,
                method: "patch",
                url,
                config,
                requestId,
                requestData: data,
            }));
        const totalTime: number = Date.now() - start;
        this.logger?.info?.(
            `Put '${ this.baseURL }${ url }' response`,
            {
                requestId,
                response,
                totalTimeMS: totalTime,
            },
        );

        return response;
    }
}
