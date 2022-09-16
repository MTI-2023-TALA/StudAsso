/*
 * Naming convention for local storage keys
 * First name is which app is using the key
 * Available name of the app: global, association, school, student
 * Second name is the key name
 * Exemple: global.jwt-token
 */
export enum LocalStorageKey {
  JWT_TOKEN = `global.jwt-token`,
  REFRESH_TOKEN = 'global.refresh-token',
  ENABLE_LARGE_NAVBAR = 'global.enable-large-navbar',
  ASSOCIATION_NAME = 'association.association-name',
  // TO BE DELETED AND USE THE JWT INSTEAD
  ASSOCIATION_ID = 'association.association-id',
}
