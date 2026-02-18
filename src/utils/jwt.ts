interface DecodedToken {
  role: string;
  sub?: string;
  client_id?: string;
  clientID?: string;
  iat?: number;
  exp?: number;
  [key: string]: any;
}

function base64UrlDecode(str: string): string {
  let output = str.replace(/-/g, '+').replace(/_/g, '/');
  switch (output.length % 4) {
    case 0:
      break;
    case 2:
      output += '==';
      break;
    case 3:
      output += '=';
      break;
    default:
      throw new Error('Invalid base64url string');
  }

  try {
    return decodeURIComponent(atob(output).split('').map(function(c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
  } catch (err) {
    return atob(output);
  }
}

export function decodeJWToken(token: string): DecodedToken | null {
  try {
    const parts = token.split('.');
    if (parts.length !== 3) {
      throw new Error('Invalid token format');
    }

    const decoded = JSON.parse(base64UrlDecode(parts[1]));
    return decoded as DecodedToken;
  } catch (error) {
    console.error('Failed to decode token:', error);
    return null;
  }
}

export function getClientIdFromToken(token: string): string | null {
  const decoded = decodeJWToken(token);
  return decoded?.client_id || decoded?.clientID || null;
}

export function getRoleFromToken(token: string): string | null {
  const decoded = decodeJWToken(token);
  return decoded?.role || null;
}
