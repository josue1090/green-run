import { notFound } from "@hapi/boom";
import { ResponseObject, ResponseToolkit } from "@hapi/hapi";

import * as Database from "../entities";

import { GetManyRequest, IdParamRequest } from "./interface";

type getOne = (entityName: EntityName) => getOneArrowFunc;
type getOneArrowFunc = (request: IdParamRequest, h: ResponseToolkit) => Promise<ResponseObject>;
type getMany = (entityName: EntityName) => getManyArrowFunc;
type getManyArrowFunc = (request: GetManyRequest, h: ResponseToolkit) => Promise<ResponseObject>;
type remove = (entityName: EntityName) => removeArrowFunc;
type removeArrowFunc = (request: IdParamRequest, h: ResponseToolkit) => Promise<ResponseObject>;
type typeOfDatabase =
  | typeof Database.Account
  | typeof Database.Pet
  | typeof Database.User;
type database =
  | Database.Account
  | Database.Pet
  | Database.User;

export enum EntityName {
  Account = "Account",
  Pet = "Pet",
  User = "User",
}

/**
 * Get one item of a given table, a given id and returns it.
 */
export const getOne: getOne = (entityName: EntityName): getOneArrowFunc => async (
  request: IdParamRequest,
  h: ResponseToolkit,
): Promise<ResponseObject> => {
  const { id } = request.params;
  const entity: typeOfDatabase = Database[entityName];
  const item: database | undefined = await entity.findOne({ id });
  if (item === undefined) {
    return h.response({});
  }

  return h.response(item);
};

/**
 * Get many items of a given table, restricted by some params and return them.
 */
export const getMany: getMany = (entityName: EntityName): getManyArrowFunc  => async (
  request: GetManyRequest,
  h: ResponseToolkit,
): Promise<ResponseObject> => {
  const { _start, _end, _order, _sort } = request.query;
  const entity: typeOfDatabase = Database[entityName];

  const items: database[] = await entity.find({
    order: {
      [_sort]: _order,
    },
    skip: Number(_start),
    take: Number(_end) - Number(_start),
  });
  const count: number = await entity.count();

  return h
    .response(items)
    .header("X-Total-Count", count.toString())
    .header("Access-Control-Expose-Headers", "X-Total-Count");
};

/**
 * Remove an item from a given table with a given id.
 */
export const remove: remove = (entityName: EntityName): removeArrowFunc => async (
  request: IdParamRequest,
  h: ResponseToolkit,
): Promise<ResponseObject> => {
  const { id } = request.params;
  const entity: typeOfDatabase = Database[entityName];
  const item: database | undefined = await entity.findOne({ id });
  if (!(item instanceof entity)) {
    throw notFound(`${entityName} not found.`);
  }
  await item.remove();

  return h.response(item);
};
