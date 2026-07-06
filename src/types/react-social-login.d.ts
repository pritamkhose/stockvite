declare module "react-github-login" {
  import React from "react";

  interface GitHubLoginProps {
    clientId?: string;
    onSuccess?: (response: any) => void;
    onFailure?: (response: any) => void;
    buttonText?: string;
    valid?: boolean;
    redirectUri?: string;
    className?: string;
    children?: React.ReactNode;
  }

  const GitHubLogin: React.FC<GitHubLoginProps>;
  export default GitHubLogin;
}

declare module "react-facebook-login" {
  import React from "react";

  interface FacebookLoginProps {
    appId?: string;
    autoLoad?: boolean;
    fields?: string;
    icon?: string;
    callback?: (response: any) => void;
  }

  const FacebookLogin: React.FC<FacebookLoginProps>;
  export default FacebookLogin;
}

declare module "react-google-login" {
  import React from "react";

  interface GoogleLoginProps {
    clientId?: string;
    buttonText?: string;
    onSuccess?: (response: any) => void;
    onFailure?: (response: any) => void;
    cookiePolicy?: string;
    responseType?: string;
  }

  interface GoogleLogoutProps {
    clientId?: string;
    buttonText?: string;
    onClick?: () => void;
    onLogoutSuccess?: () => void;
    onFailure?: () => void;
  }

  const GoogleLogin: React.FC<GoogleLoginProps>;
  const GoogleLogout: React.FC<GoogleLogoutProps>;
  export { GoogleLogin, GoogleLogout };
}
