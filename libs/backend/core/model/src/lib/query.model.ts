export class QueryPaginationModel {
  offset = 0; // set to 0 in case we call a findAll from a service without passing through controller
  limit = 0; // 0 = all
}
