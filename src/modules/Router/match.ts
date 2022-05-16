const routeRegExp = /^(?:(?:\/:?[\w_~.-]+)*|\/)$/;
const pathRegExp = /^(?:(?:\/[\w_~.-]+)*|\/)$/;

export default function match(
  expectPath: string,
  actualPath: string,
  isExact: boolean,
): { params: any; handled: string; rest: string } | null {
  if (!expectPath.match(routeRegExp)) {
    throw Error(`Invalid route: ${expectPath}`);
  }
  if (!actualPath.match(pathRegExp)) {
    throw Error(`Invalid path: ${actualPath}`);
  }

  const expect: string[] = expectPath.split('/').filter((frag) => frag);
  const actual: string[] = actualPath.split('/').filter((frag) => frag);
  const params: any = {};

  if (expect.length > actual.length) {
    return null;
  }

  if (isExact && expect.length !== actual.length) {
    return null;
  }

  const isMatching = expect.every((expectFrag, idx) => {
    const actualFrag = actual[idx];

    if (expectFrag.startsWith(':')) {
      params[expectFrag.slice(1)] = actualFrag;
      return true;
    }

    return expectFrag === actualFrag;
  });

  if (!isMatching) {
    return null;
  }

  const handled = `/${actual.slice(0, expect.length).join('/')}`;
  const rest = `/${actual.slice(expect.length).join('/')}`;

  return { params, handled, rest };
}
