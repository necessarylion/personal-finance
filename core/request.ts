/**
 * Extends the built-in Bun Request class with additional utility methods
 * This extends the prototype of the existing Request class
 */

import vine, { errors } from '@vinejs/vine';
import type { Infer, SchemaTypes } from '@vinejs/vine/types';
import ValidationException from './exception/validation_exception';
import Exception from './exception/exception';

// Extend the Request prototype to add query method
if (!Request.prototype.query) {
  Request.prototype.query = function (): Record<string, string> {
    const url = new URL(this.url);
    const queryParams: Record<string, string> = {};
    // Parse all query parameters from the URL
    for (const [key, value] of url.searchParams.entries()) {
      queryParams[key] = value;
    }
    return queryParams;
  };
}

// Extend the Request prototype to add all method
if (!Request.prototype.all) {
  Request.prototype.all = function (): Record<string, any> {
    return this._allInputs;
  };
}

// Extend the Request prototype to add jsonBody method
if (!Request.prototype.jsonBody) {
  Request.prototype.jsonBody = async function (): Promise<Record<string, any>> {
    let body: Record<string, any> = {};
    // if (this.method === 'POST') {
      body = (await this.json()) as Record<string, any>;
    // }
    return body;
  };
}

// Extend the Request prototype to add validate method
if (!Request.prototype.validate) {
  Request.prototype.validate = async function <Schema extends SchemaTypes>(
    schema: Schema,
  ): Promise<Record<string, any>> {
    try {
      return await vine.validate({
        schema,
        data: this.all(),
      });
    } catch (error: any) {
      if (error instanceof errors.E_VALIDATION_ERROR) {
        throw new ValidationException(error.message, error.messages);
      } else {
        throw new Exception(error.message);
      }
    }
  };
}

if (!Request.prototype.input) {
  Request.prototype.input = async function (key: string): Promise<any> {
    const queryParams = this.all();
    return queryParams[key];
  };
}

if (!Request.prototype.parseAllInputs) {
  Request.prototype.parseAllInputs = async function (): Promise<void> {
    const queryParams = this.query();
    const body = await this.jsonBody();
    this._allInputs = { ...queryParams, ...body };
  };
}

// Type declaration to extend the Request interface
declare global {
  interface Request {
    _allInputs: Record<string, any>;
    query(): Record<string, string>;
    parseAllInputs(): Promise<void>;
    all(): Record<string, any>;
    input(key: string): any;
    jsonBody(): Promise<Record<string, any>>;
    validate<Schema extends SchemaTypes>(
      schema: Schema,
    ): Promise<Infer<Schema>>;
    params: Record<string, string>;
  }
}
