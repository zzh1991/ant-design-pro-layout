// use localStorage to store the authority info, which might be sent from server in actual project.
const { NODE_ENV } = process.env;

export function getAuthority(str?: string): any {
  // return localStorage.getItem('antd-pro-authority') || ['user', 'user'];
  const authorityString =
    typeof str === 'undefined'
      ? localStorage.getItem('antd-pro-authority')
      : str;
  // authorityString could be user, "admin", ["admin"]
  let authority;
  try {
    authority = JSON.parse(authorityString!);
  } catch (e) {
    authority = authorityString;
  }
  if (typeof authority === 'string') {
    return [authority];
  }
  if (!authority && NODE_ENV !== 'production') {
    return ['admin'];
  }
  return authority;
}

export function setAuthority(authority: string | string[]): void {
  const proAuthority = typeof authority === 'string' ? [authority] : authority;
  return localStorage.setItem(
    'antd-pro-authority',
    JSON.stringify(proAuthority),
  );
}
